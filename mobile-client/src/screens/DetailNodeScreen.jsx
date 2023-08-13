import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { View, Text, Image, Heading, Box, Button, Divider, Flex } from 'native-base';
import { ACCESS_NODO_TYPE, BLOCK_NODO_TYPE, HomeName, INTEREST_NODO_TYPE, NodeCommentsName, ROUTE_NODO_TYPE } from '../constants';
import { getAccessNodeById, getBlockNodeById, getInterestingNodeById, getRouteNodeById } from '../services/Nodes';
import { getAllCommentsFromNode } from '../services/Comment'
import { useState } from 'react';
import { useEffect } from 'react';
import SubnodeDetail from '../components/SubnodeDetail';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNode, setDestination, setOnSearchProcess, setOrigin } from '../store/slices/searchSlice';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NodeDetail = ({ node = {}, comments = [] }) => {
  const { detail } = node || {};
  const { subnodes } = detail || {};
  const { user } = useSelector(state => state.authReducer);
  const navigation = useNavigation();
  const navigate = to => navigation.navigate(to)
  const dispatch = useDispatch();

  const handleGoFrom = () => {
    dispatch(setOnSearchProcess(true))
    dispatch(setOrigin(node))
    dispatch(setCurrentNode(null))
    navigate(HomeName)
  }

  const handleGoTo = () => {
    dispatch(setOnSearchProcess(true))
    dispatch(setDestination(node))
    dispatch(setCurrentNode(null))
    navigate(HomeName)
  }

  const handleNode = async () => {
    if (user) {
      navigation.navigate(ResportOutDatedInformationName, { node });
    } else {
      Toast.show({
        type: "error",
        text1: "Inicie sesión para poder reportar información desactualizada",
        position: "bottom",
      });
    }
  }

  return !node ?
    <Text>Nodo no encontrado</Text> :
    <>
      {/* Imágen*/}
      {detail?.img && (
        <Box overflow={"hidden"} borderTopRadius={"25"} style={styles.image}>
          <Image
            height={"100%"}
            width={"100%"}
            resizeMode="cover"
            source={{ uri: detail?.img }}
            alt={detail?.title}
          />
        </Box>
      )}


      <SafeAreaView marginBottom={3} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View padding={"3"}>
            <Box>
              {/* Disponible */}
              <Text marginLeft={"auto"} fontSize={"xs"}>
                <View style={[styles.circle, { backgroundColor: node?.available ? "#2AA646" : "#DC3546" }]} />{" "}
                <Text style={[styles.available, { color: node?.available ? "#2AA646" : "#DC3546" }]}>
                  {node?.available ? "Disponible" : "No disponible"}
                </Text>
              </Text>
              {/* Título  */}
              <Heading size={"xl"} paddingY={2}>
                {detail?.title || node.name || "Sin nombre"}
              </Heading>
              {/* Tipo de nodo */}
              <Text style={styles.type}>Punto de {node?.type?.name} {node?.campus?.name && `campus ${node.campus?.name}`}</Text>
            </Box>
            <Divider marginY={4} />

            <Box margin={3} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

              <Box
                width={"30%"}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Button margin={"auto"} onPress={handleGoFrom} borderRadius={"50"} width={"50"} height={"50"}>
                  <Ionicons name="ios-return-up-back" size={25} color="black" />
                </Button>
                <Text textAlign={"center"}>Buscar ruta desde aquí</Text>
              </Box>

              <Box
                width={"30%"}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Button margin={"auto"} onPress={handleGoTo} borderRadius={"50"} width={"50"} height={"50"}>
                  <Ionicons name="return-up-forward" size={25} color="black" />
                </Button>
                <Text textAlign={"center"}>Cómo llegar</Text>
              </Box>
            </Box>
            <Divider marginY={4} />

            {/* Información general */}
            <Box>
              <Heading fontWeight={"normal"} size={"md"} paddingY={2}>
                Información general
              </Heading>
              {/* Descripción del nodo */}
              <Text textAlign={"justify"} flexWrap={"wrap"}>
                {detail?.description || "Sin descripción"}
              </Text>
            </Box>
            <Divider marginY={4} />


            {subnodes?.length > 0 &&
              <>
                <Box display={"flex"}>
                  <Heading fontWeight={"normal"} size={"md"} paddingY={2}>
                    Lugares dentro del {detail.title}
                  </Heading>

                  <Flex>
                    {subnodes.map(subnode => <SubnodeDetail
                      subnode={subnode}
                      campus={node?.campus}
                      block={detail?.title}
                      key={subnode._id}
                    />)}
                  </Flex>
                </Box>
                <Divider marginY={4} />
              </>
            }

            <Box>
              <Heading fontWeight={"normal"} size={"md"} paddingY={2}>
                Comentarios
              </Heading>
              {/* Comentarios */}
              <Heading
                underline
                size={"xs"}
                textAlign={"right"}
                color={"gray.600"}
                onPress={() => navigation.navigate(NodeCommentsName, { comments })}
              >
                {comments?.length} comentario{comments.length === 1 ? "" : "s"}
              </Heading>
            </Box>
            <Divider marginY={4} />

            <Button
              colorScheme={"yellow"}
              borderRadius={50}
              onPress={() => handleNode(node._id)}
            >
              <Text underline textAlign={"center"}>
                La información está desactualizada? Reportar
              </Text>
            </Button>

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
}

const DetailNodeScreen = ({ route }) => {
  const { nodeId, type } = route.params;
  const [node, setNode] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNode(null);
    setLoading(true);

    const getNode = async () => {
      let data = null;
      if (type == BLOCK_NODO_TYPE) {
        data = await getBlockNodeById(nodeId)
      } else if (type == ACCESS_NODO_TYPE) {
        data = await getAccessNodeById(nodeId)
      } else if (type == INTEREST_NODO_TYPE) {
        data = await getInterestingNodeById(nodeId)
      } else if (type === ROUTE_NODO_TYPE) {
        data = await getRouteNodeById(nodeId);
        data.name = "Nodo Ruta"
      }

      const commentsData = await getAllCommentsFromNode(data._id)

      setNode(data);
      setComments(commentsData.data);
      setLoading(false);
    }

    getNode();
  }, [nodeId]);

  return (
    <View style={styles.container} flex={1}>
      {loading ?
        <Loader /> :
        <NodeDetail node={node} comments={comments} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
    // height: '100%'
  },
  name: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  available: {
    fontSize: 16,
    marginTop: 15,
    paddingBottom: 15, // Para que el texto quede a la altura del circulo
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    height: '25%',
    margin: 0,
    padding: 0,
    alignSelf: 'center',
  },
  type: {
    fontSize: 14,
    fontWeight: '300',
  },
  campus: {
    marginTop: 10,
  },
  category: {
    fontSize: 16,
    marginTop: 10,
  }
});

export default DetailNodeScreen;