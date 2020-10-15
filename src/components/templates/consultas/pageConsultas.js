import React, { useEffect, useState } from 'react';
//importando firebase
import 'firebase/firestore';
import { useFirebaseApp } from 'reactfire';
//importando componentes
import ConsultasForm from './consultasForm';
import Table from './tableBuscar';

//funcion que controla las funciones de consultas
const PageConsultas = () => {
    //detectando tamaño de pantalla
    const [ screen, setScreen ] = useState(false);
    const handleScreen = () => {
        if (window.screen.width < 1024) {
            setScreen(true);
        }
    }
    useEffect(() => { handleScreen(); })
    //tomando fecha actual
    const f = new Date();
    var fechaActual = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()} `;
    //usando firebase
    const db = useFirebaseApp();
    //estado para consultas
    const initConsulta = {
        id_doctor: '1doctor',
        id_paciente: '',
        fecha: '',
        hora: '',
        receta: '',
        recomendaciones: ''
    }
    //estado de consulta
    const [consulta, setConsulta] = useState(initConsulta);
    //buscando pacientes
    const [paciente, setPaciente] = useState([]);
    const [idpaciente, setIdPaciente] = useState('');
    //ocultando tabla
    const [ocultarTabla, setocultarTabla] = useState(false);
    //buscando pacientes
    const handleSearchPaciente = (e) => {
        if (e.target.value == '') {
            setPaciente([]);
            setocultarTabla(false)
            setConsulta({
                ...consulta,
                id_paciente : ''
            })
        }
        else {
            //ejecutando consulta
            db.firestore().collection('pacientes').where("apellidos", "==", e.target.value)
                .get()
                .then(function (resultado) {
                    resultado.forEach(function (doc) {
                        setPaciente({
                            ...doc.data(),
                            id: doc.id
                        })
                        setConsulta({
                            ...consulta,
                            id_paciente : doc.id
                        })
                    })
                })
                .catch(function (error) {
                    console.log("error: ", error)
                });
            //cambiando estado de tabla
            setocultarTabla(true);
        }
    }
    //buscando doctores
    const handleSearchDoctor = (e) => {
        
    }
    //cambiando el estado
    const handleChange = (e) => {
        setConsulta({
            ...consulta,
            [e.target.name]: e.target.value
        })
    }
    //tomando el id del paciente
    const handleSubmit = async (e) => {
        e.preventDefault();
        //guardando los datos en firebase
        if (consulta.id_paciente == '') {
            console.log("no ha seleccionado un paciente")
        } else {
            await db.firestore().collection('consultas').add(consulta);
            //console.log(consulta)
        }
    }

    //render de la pagina
    return (
        <div className={`${screen ? 'flex mb-4 py-3' : 'grid grid-rows-3 grid-flow-col gap-4 pt-3'}`}>
            {/** formulario */}
            <div className={`${screen ? 'w-full' : 'row-span-3'}`}>
                <ConsultasForm
                    HandleSubmit={handleSubmit}
                    HandleChange={handleChange}
                    Consulta={consulta}
                    fechaActual={fechaActual}
                />
            </div>
            {/** table de busqueda */}
            <div className={`${screen ? 'w-full' : 'row-span-3'}`}>
                <Table
                    HandleSearchPaciente={handleSearchPaciente}
                    OcultarTabla={ocultarTabla}
                    Paciente={paciente}
                    Consulta={consulta}
                />
            </div>
        </div>
    )
}

//exportando pagina
export default PageConsultas;