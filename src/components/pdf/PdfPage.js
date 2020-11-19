import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './PdfConsultas';
import { useParams } from 'react-router-dom';
//importando firebase
import 'firebase/firestore';
import { useFirebaseApp } from 'reactfire';

const PdfConsultas = () => {
    //constante de firebase 
    const db = useFirebaseApp();
    //const consulta
    const [consulta, setConsulta] = useState([]);

    const id = useParams().id;
    useEffect(() => {
        db.firestore().collection('consultas').doc(id)
            .onSnapshot(respuesta => {
                setConsulta({...respuesta.data()});
                console.log(respuesta.data());
            }
            );
    }, [])

    return (
        <PDFViewer style={{ width: 100 + "%", height: 800 }}>
            <MyDocument consulta={consulta} />
        </PDFViewer>
    )
}

export default PdfConsultas;

