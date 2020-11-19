import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Multiclinica from '../../assets/mecca.jpg';

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    container: {
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 100
    }
});

// Create Document Component
const MyDocument = ({ consulta }) => (
    <Document title="consulta">
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                <Image src={Multiclinica} style={styles.image} />
            </View>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Nombre:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.nombre_paciente}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Recomendaciones:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.recomendaciones}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Receta:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.receta}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Recomendaciones:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.recomendaciones}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Fecha y hora:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.fecha}</Text>
                    <Text>{consulta.hora}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

/**
 <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Recomendaciones:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.recomendaciones}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Receta:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.receta}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Recomendaciones:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.recomendaciones}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text>Fecha y hora:</Text>
                </View>
                <View style={styles.section}>
                    <Text>{consulta.fecha}</Text>
                </View>
            </View>
 */

export default MyDocument;