import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image, Heading, FlatList, Box } from 'native-base';
import { ACCESS_NODO_TYPE, BLOCK_NODO_TYPE, INTEREST_NODO_TYPE } from '../constants';
import { getAccessNodeById, getBlockNodeById, getInterestingNodeById } from '../services/Nodes';
import { useState } from 'react';
import { useEffect } from 'react';
import SubnodeDetail from '../components/SubnodeDetail';
import Loader from '../components/Loader';

const NodeDetail = ({ node = {} }) => {
    const [showSubnodes, setShowSubnodes] = useState(false);
    const { detail } = node;
    const { subnodes } = detail || {};

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
                <Heading>{detail?.title || "Sin nombre"}</Heading>

                {/* Tipo de nodo */}
                <Text style={styles.type}>Punto de {node?.type?.name} {node?.campus?.name && `campus ${node.campus?.name}`}</Text>

                <View style={styles.container_flex}>
                    <View style={[styles.circle, { backgroundColor: node?.available ? "#2AA646" : "#DC3546" }]} />
                    <Text style={[styles.available, { color: node?.available ? "#2AA646" : "#DC3546" }]}>
                        {node?.available ? "Disponible" : "No disponible"}
                    </Text>
                </View>

                {/* Descripcion */}
                <Text textAlign={"justify"} flexWrap={"wrap"}>{detail?.description || "Sin descripción"}</Text>

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
            </View>
        </>
}

const DetailNodeScreen = ({ route }) => {
    const { nodeId, type } = route.params;
    const [node, setNode] = useState(null);
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
            }

            setNode(data);
            setLoading(false);
        }

        getNode();
    }, [nodeId]);

    return (
        <View style={styles.container}>
            {loading ?
                <Loader /> :
                <NodeDetail node={node} />
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
        marginTop: 8,
        marginBottom: 10,
    },
    name: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
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
