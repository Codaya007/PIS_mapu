const { ROUTE_NODO_TYPE } = require("../constants");
const connectDB = require("../db");
const Adyacency = require("../models/Adyacency");
const Campus = require("../models/Campus");
const Node = require("../models/Node");

async function findShortestRoute(idNodoDestino, idNodoOrigen) {
  try {
    await connectDB();

    // Paso 1: Validar que los nodos de origen y destino estén disponibles y existan
    const destinityNode = await Node.findById(idNodoDestino);
    const nodoOrigen = await Node.findById(idNodoOrigen);

    if (
      !destinityNode ||
      !nodoOrigen ||
      !destinityNode?.available ||
      !nodoOrigen?.available
    ) {
      throw new Error(
        "Los nodos de origen y destino no están disponibles o no existen"
      );
    }
    let additionalMessage = null;

    // Paso 2: Determinamos el campus de origen y campus de destino
    const campusOrigen = await Campus.findById(nodoOrigen.campus._id);
    const campusDestino = await Campus.findById(destinityNode.campus._id);

    // Paso 3: Comparamos si los campus de origen y destino son los mismos
    if (campusOrigen._id !== campusDestino._id) {
      // Paso 3.1: Si los campus origen y destino son diferentes, se cambia el punto de origen a un punto de acceso del campus de destino
      const puntoAcceso = campusDestino.accessPoints[0]; // Obtén el primer punto de acceso del campus de destino
      additionalMessage = `Para seguir la ruta indicada, primero diríjase al punto de acceso: ${puntoAcceso}`;
    }

    // Paso 4: Se buscan los nodos ruta del campus (que hasta este punto es el mismo el campus de origen y campus destino)
    const nodesRutaCampus = await Node.find({
      "campus._id": campusOrigen._id,
      "type.name": ROUTE_NODO_TYPE,
    });

    // Paso 5: Buscar las adyacencias entre los nodos ruta del campus de origen
    const routeNodeIds = nodesRutaCampus.map((node) => node._id); // mapeo para solo tener ids
    const adyacencies = await Adyacency.find({
      $or: [
        { origin: { $in: routeNodeIds }, destination: { $in: routeNodeIds } },
        { origin: { $in: routeNodeIds }, destination: destinityNode._id },
        { origin: destinityNode._id, destination: { $in: routeNodeIds } },
      ],
    });

    // Paso 7: Se cargan todos los nodos rutas encontrados y se los enlaza según las adyacencias encontradas
    const nodes = [...nodesRutaCampus, nodoOrigen, destinityNode];
    // const adyacencies = [...routeAdyacencies, ...destinationAdyacencies];

    // Paso 8: Se aplica el algoritmo de Dijkstra para encontrar la ruta más cercana entre el nodo origen y nodo destino
    const shortestPath = dijkstra(
      nodes,
      adyacencies,
      originNode._id,
      destinationNode._id
    );

    return { additionalMessage, shortestPath };
  } catch (error) {
    console.error("Error al calcular la ruta:", error);
    return "Error al calcular la ruta";
  }
}

// Implementa el algoritmo de Dijkstra para encontrar la ruta más corta
function dijkstra(nodes, adyacencies, originNodeId, destinationNodeId) {
  // Inicializa las estructuras de datos necesarias
  const distances = {};
  const visited = {};
  const previous = {};
  const queue = [];

  // Configura las distancias iniciales y agrega los nodos a la cola
  for (const node of nodes) {
    distances[node._id] = node._id === originNodeId ? 0 : Infinity;
    previous[node._id] = null;
    queue.push(node._id);
  }

  // Implementa el algoritmo de Dijkstra
  while (queue.length > 0) {
    // Encuentra el nodo con la distancia mínima actual
    const currentNodeId = queue.reduce((minNodeId, nodeId) => {
      return distances[nodeId] < distances[minNodeId] ? nodeId : minNodeId;
    }, queue[0]);

    // Marca el nodo actual como visitado
    visited[currentNodeId] = true;
    queue.splice(queue.indexOf(currentNodeId), 1);

    // Si se llegó al nodo de destino, termina el algoritmo
    if (currentNodeId === destinationNodeId) {
      break;
    }

    // Actualiza las distancias de los nodos vecinos
    const currentNeighbors = adyacencies
      .filter(
        (ad) => ad.origin === currentNodeId || ad.destination === currentNodeId
      )
      .map((ad) => (ad.origin === currentNodeId ? ad.destination : ad.origin));

    for (const neighborId of currentNeighbors) {
      if (visited[neighborId]) {
        continue;
      }

      const neighborNode = nodes.find((node) => node._id === neighborId);
      const weight = adyacencies.find(
        (ad) =>
          (ad.origin === currentNodeId && ad.destination === neighborId) ||
          (ad.origin === neighborId && ad.destination === currentNodeId)
      ).weight;
      const alt = distances[currentNodeId] + weight;

      if (alt < distances[neighborId]) {
        distances[neighborId] = alt;
        previous[neighborId] = currentNodeId;
      }
    }
  }

  // Construye la ruta desde el origen hasta el destino
  const path = [];
  let current = destinationNodeId;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  // Devuelve la ruta más corta
  return path;
}

// Ejemplo de uso
const originNodeId = "649ce4fd3900cc8fbae790e5";
const destinationNodeId = "649ce4fd3900cc8fbae790e5";

findShortestRoute(originNodeId, destinationNodeId)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = { dijkstra, findShortestRoute };
