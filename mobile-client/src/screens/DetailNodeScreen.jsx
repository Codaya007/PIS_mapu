import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { ReportLostPointName } from '../constants';

const DetailNodeScreen = ({ route }) => {
    const { node } = route.params;
      const navigation = useNavigation();

    
    return (
        <View style={styles.container}>
            <Button title='Reportar punto por falta de información' marginTop={30}  onPress={() => navigation.navigate(ReportLostPointName,  node)}>Hola Mundo</Button>

            {/* Imágen*/}
                {node?.nodes.detail.img && (
                <Image source={{ uri: node?.nodes.detail.img }} style={styles.image} resizeMode="cover" />
            )}


            <Text style={styles.name}>{node?.nodes.detail.title}</Text>

            {/* Tipo de nodo */}
            <Text style={styles.type}>Punto de {node?.nodes.type.name}</Text>

            <View style={styles.container_flex}>
                <View style={[styles.circle, { backgroundColor: node?.nodes.available ? "#2AA646" : "#DC3546" }]} />
                <Text style={[styles.available, { color: node?.nodes.available ? "#2AA646" : "#DC3546"}]}>
                    {node?.nodes.available ? "Disponible" : "No disponible"}
                </Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Descripcion */}
            <Text style={styles.description}>{node?.nodes.detail.description || "Sin descripción"}</Text>

            {/* Campus */}
            {node?.nodes.campus && (
                <View style={styles.campus}>
                    <Text style={styles.textMoreDetail}>
                        <Text style={styles.boldText}>Campus:</Text> {node?.nodes.campus.symbol} - {node?.nodes.campus.name}
                    </Text>
                </View>
            )}

            {/* Categoria */}
            {node?.nodes.category && (
                <View style={styles.categoryContainer}>
                    {node?.nodes.category.icon && (
                        <Image
                            source={{ uri: node?.nodes.category.icon }}
                            style={styles.icon}
                            resizeMode="cover"
                        />
                    )}

                    <Text style={styles.textMoreDetail}>
                        <Text style={styles.boldText}>Categoria:</Text> {node?.nodes.category.name}
                    </Text>
                </View>
            )}
  
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        marginBottom: 10,
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
        color: '#AAAAAA',
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
        marginTop: 25,
        alignSelf: 'center'
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    type: {
        fontSize: 13,
        fontWeight: '200',
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
