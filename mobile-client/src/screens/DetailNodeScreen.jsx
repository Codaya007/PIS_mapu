import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Row, Text, Image, Heading, FlatList, Box, Button, Divider } from 'native-base';
import { ACCESS_NODO_TYPE, BLOCK_NODO_TYPE, HomeName, INTEREST_NODO_TYPE, ROUTE_NODO_TYPE } from '../constants';
import { getAccessNodeById, getBlockNodeById, getInterestingNodeById, getRouteNodeById } from '../services/Nodes';
import { getAllCommentsFromNode } from '../services/Comment'
import { useState } from 'react';
import { useEffect } from 'react';
import SubnodeDetail from '../components/SubnodeDetail';
import CommentItem from '../components/CommentItem';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { setCurrentNode, setDestination, setOnSearchProcess, setOrigin } from '../store/slices/searchSlice';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    CommentName,
} from "../constants";

const NodeDetail = ({ node = {}, comments = [] }) => {
    const [showSubnodes, setShowSubnodes] = useState(false);
    const { detail } = node || {};
    const { subnodes } = detail || {};
    const navigation = useNavigation();
    const navigate = to => navigation.navigate(to)
    const dispatch = useDispatch();

    const navigateToCommentDetail = () => {
        console.log("el node", node);
        // navigation.navigate(CommentName, { node: node?._id })
        navigation.navigate(CommentName, { node })
    }

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

    return !node ?
        <Text>Nodo no encontrado</Text> :
        <>
            {/* Imágen*/}
            {detail?.img && (
                <Box overflow={"hidden"} borderTopRadius={"27"} style={styles.image}>
                    <Image
                        height={"100%"}
                        width={"100%"}
                        resizeMode="cover"
                        source={{ uri: detail?.img }}
                        alt={detail?.title}
                    />
                </Box>
            )}

            <View padding={"6"} flex={1} >
                <Heading>{detail?.title || node.name || "Sin nombre"}</Heading>

                {/* Tipo de nodo */}
                <Text style={styles.type}>Punto de {node?.type?.name} {node?.campus?.name && `campus ${node.campus?.name}`}</Text>

                <View style={styles.container_flex}>
                    <View style={[styles.circle, { backgroundColor: node?.available ? "#2AA646" : "#DC3546" }]} />
                    <Text style={[styles.available, { color: node?.available ? "#2AA646" : "#DC3546" }]}>
                        {node?.available ? "Disponible" : "No disponible"}
                    </Text>
                </View>


                <View margin={3} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

                    <Box width={"25%"}>
                        <Button onPress={handleGoFrom} borderRadius={"50"} width={"20"}>
                            <Ionicons name="ios-return-up-back" size={20} color="black" />
                        </Button>
                        <Text textAlign={"center"}>Ir desde</Text>
                    </Box>

                    <Box width={"25%"}>
                        <Button onPress={handleGoTo} borderRadius={"50"} width={"20"}>
                            <Ionicons name="return-up-forward" size={20} color="black" />
                        </Button>
                        <Text textAlign={"center"}>Ir hasta</Text>
                    </Box>
                </View>

                {/* Descripcion */}
                <Text textAlign={"justify"} flexWrap={"wrap"}>{detail?.description || "Sin descripción"}</Text>

                {/* <View
                    mt={3}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    onPress={navigateToCommentDetail}
                >
                    <Text style={styles.title}>Comentarios</Text>
                    <AntDesign name="right" size={19} color="black" />
                </View> */}

                {subnodes?.length > 0 &&
                    <>
                        <Heading size="sm" textAlign={"right"} onPress={() => setShowSubnodes(!showSubnodes)}>
                            {showSubnodes ? "Ver menos" : "Ver más"}
                        </Heading>
                        {showSubnodes &&
                            <>
                                {/* Divider */}
                                <View style={styles.divider} />
                                <Heading paddingY={3} size="sm">Lugares dentro del {detail.title}</Heading>

                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={subnodes}
                                    renderItem={({ item: subnode }) =>
                                        <SubnodeDetail
                                            subnode={subnode}
                                            campus={node?.campus}
                                            block={detail?.title}
                                        />
                                    }
                                />
                            </>
                        }
                    </>
                }

                {/* {comments.lenght > 0 && */}
                {/* // <> */}
                <View style={styles.divider} />
                <View marginTop={3} >
                    <Text style={styles.title}>Comentarios</Text>
                    {comments?.length > 0 &&
                        <>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={comments}
                                renderItem={({ item: comment }) =>
                                    <CommentItem comment={comment} user={"sdfasfdsadf"} />
                                }
                            />
                        </>
                    }
                    <Button mt={2} borderRadius={50} bgColor="indigo.500" onPress={() => navigateToCommentDetail()}>Crear Comentario</Button>
                </View>
                {/* // </> */}
                {/* } */}
                {/* {comments.lenght == 0 &&
                    <>
                        <View style={styles.divider} />
                        <View marginTop={3} >
                            <Text style={styles.title}>No hay comentarios</Text>
                        </View>
                    </>
                } */}

                {/* <Divider style={styles.divider} /> */}

            </View>
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
            // console.log("dattaaaaaa", data)
            const commentsData = await getAllCommentsFromNode(data._id)
            // console.log("xddddd", commentsData.data)
            setNode(data);
            setComments(commentsData.data);
            setLoading(false);
        }

        getNode();
    }, [nodeId]);

    return (
        <View style={styles.container}>
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
        height: '100%'
    },
    container_flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        marginTop: 20,
        marginBottom: 10,
    },
    name: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
    },
    buttonComment: {
        marginTop: 2,
        flex: 1,  // Establece el flex para que el botón se expanda 
        backgroundColor: 'transparent',  // Establece el fondo transparente
        justifyContent: 'space-between', // Alinea el contenido en la dirección principal (vertical)
        flexDirection: 'row', // Alinea el contenido en una fila horizontal
        alignItems: 'center', // Alinea el contenido verticalmente en el centro
    },
    title: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: 5,
        marginBottom: 15,
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
        height: '27%',
        margin: 0,
        padding: 0,
        alignSelf: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    type: {
        fontSize: 14,
        fontWeight: '300',
    },
    campus: {
        marginTop: 10,
    },
    boldText: {
        fontSize: 16,
        fontWeight: '600',
    },
    category: {
        fontSize: 16,
        marginTop: 10,
    },
    textMoreDetail: {
        fontSize: 16,
        fontWeight: '300'
    }
});

export default DetailNodeScreen;
