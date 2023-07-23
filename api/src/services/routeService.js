const BadRequestError = require("../errors/BadRequestError");
const accessNodeService = require("./accessNodeService");
const nodeService = require("./nodeService");
const adyacencyService = require("./adyacencyService");
const routeNodeService = require("./routeNodeService");
const dijkstra = require("dijkstrajs");

async function findShortestRoute(type, origin, destination, nomenclature) {
  if (type === "byNomenclature") {
    // Busco el nodo de destino por nomenclatura, para ello, busco el nodo tipo bloque que esté en ese campus y bloque
  }

  // Paso 1: Validar que los nodos de origen y destino estén disponibles y existan
  let destinityNode = await nodeService.getNodeById(destination);
  let originNode = await nodeService.getNodeById(origin);

  if (
    !destinityNode ||
    !originNode ||
    !destinityNode?.available ||
    !originNode?.available
  ) {
    throw new Error(
      "Los nodos de origen y destino no están disponibles o no existen"
    );
  }

  let additionalMessage = null;
  let additionalNode = null;

  // Paso 2: Determinamos el campus de origen y campus de destino
  const campusOrigen = originNode.campus;
  const campusDestino = destinityNode.campus;

  // Paso 3: Comparamos si los campus de origen y destino son los mismos
  if (campusOrigen._id?.toString() !== campusDestino._id?.toString()) {
    // Paso 3.1: Si los campus origen y destino son diferentes, se cambia el punto de origen a un punto de acceso del campus de destino
    const accessPoints = await accessNodeService.getAccessNodes({
      campus: campusDestino._id,
    });
    // Obtenemos el primer punto de acceso del campus de destino
    const puntoAcceso = accessPoints[0];

    // Si no hay ningún punto de acceso para ese campus, enviamos un error genérico
    if (!puntoAcceso)
      throw new ValidationError(
        `El punto de origen y destino deben estar en el mismo campus, primero diríjase al campus '${campusDestino.name}'`
      );

    originNode = puntoAcceso;
    additionalMessage = `Para seguir la ruta indicada, primero diríjase al punto de acceso del campus '${campusDestino.name}': ${puntoAcceso.detail?.title} (${puntoAcceso.detail?.description}) y luego siga la ruta indicada`;
    additionalNode = puntoAcceso;
  }

  // Paso 4: Buscamos todos los nodos ruta del campus
  const routeCampusNodes = await routeNodeService.getRouteNodes({
    campus: campusDestino._id,
  });

  // Paso 5: Buscar las adyacencias entre los nodos ruta del campus de origen
  //5.1 Mapeo para solo tener ids y poder filtrar las adyacencias
  const routeCampusNodesId = routeCampusNodes.map((node) => node._id);
  // Añado los nodos de origen y destino
  routeCampusNodesId.push(originNode._id);
  routeCampusNodesId.push(destinityNode._id);

  const adyacencies = await adyacencyService.getAllAdyacencies({
    origin: { $in: routeCampusNodesId },
    destination: { $in: routeCampusNodesId },
  });

  // Paso 6: Se aplica el algoritmo de Dijkstra para encontrar la ruta más cercana entre el nodo origen y nodo destino
  const shortestRoute = dijkstraNodes(
    originNode._id,
    destinityNode._id,
    adyacencies
  );

  return { additionalMessage, shortestRoute, additionalNode };
}

// Función para encontrar la ruta más corta entre dos nodos
const dijkstraNodes = (originNodeId, destinationNodeId, adyacencies = []) => {
  try {
    // Construye un objeto de grafo para usar con Dijkstra
    const graph = {};

    adyacencies.forEach((adyacency) => {
      const { origin, destination, weight } = adyacency;
      graph[origin] = graph[origin] || {};
      graph[origin][destination] = weight;
    });

    // Encuentra la ruta más corta utilizando Dijkstra
    const shortestPath = dijkstra.find_path(
      graph,
      originNodeId,
      destinationNodeId
    );

    return shortestPath;
  } catch (error) {
    console.log(error.message);
    console.log(error.name);

    throw new BadRequestError(
      "No se ha podido encontrar una ruta entre el punto de origen y destino dado"
    );
  }
};

module.exports = { dijkstra: dijkstraNodes, findShortestRoute };
