import React, { useEffect, useState } from 'react';
//importando firebase
import 'firebase/firestore';
import { useFirebaseApp } from 'reactfire';
//alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//paginacion
import Pagination from "react-js-pagination";
import './pagination.css';

import FormConsultas from './formConsultas'
import TableRegistrosConsultas from './tableRegistros';
import Buscar from './Buscar'

//funcion que controla las funciones de consultas
const PageConsultas = () => {
    //usando firebase
    const db = useFirebaseApp();
    //const user = useUser();
    const f = new Date();
    //estado de consultas
    const [consultasRegistros, setConsultasRegistros] = useState([]);
    //tomando consultas
    const handleToday = async () => {
        db.firestore().collection('consultas').where("fecha", "==", `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`)
            .onSnapshot((consultas) => {
                const data = [];
                consultas.forEach(doc => {
                    data.push({ ...doc.data(), id: doc.id })
                })
                setConsultasRegistros(data);
            })
    }
    useEffect(() => { handleToday(); }, [])
    // paginacion
    const todosPerPage = 6;
    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = activePage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentConsultas = consultasRegistros.slice(indexOfFirstTodo, indexOfLastTodo);
    //enviando datos a la base
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    //tomando fecha actual
    var fechaActual = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()} `;
    //estado para consultas
    const initConsulta = {
        email_doctor: '',
        id_paciente: '',
        nombre_paciente: '',
        fecha: '',
        hora: '',
        receta: '',
        recomendaciones: ''
    }
    //estado de consulta
    const [consulta, setConsulta] = useState(initConsulta);
    //buscando pacientes
    const [paciente, setPaciente] = useState([]);
    //ocultando tabla
    const [ocultarTablaP, setocultarTablaP] = useState(false);
    //buscando pacientes
    const [searchPaciente, setSearchPaciente] = useState('');
    const handleSearchPaciente = (e) => {
        setSearchPaciente(e.target.value)
        if (searchPaciente == '') {
            setPaciente([]);
            setocultarTablaP(false)
            setConsulta({
                ...consulta,
                id_paciente: '',
                nombre_paciente: ''
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
                            id_paciente: doc.id,
                            nombre_paciente: doc.data().nombres + doc.data().apellidos
                        })

                    })
                })
                .catch(function (error) {
                    console.log("error: ", error)
                });
            //cambiando estado de tabla
            setocultarTablaP(true);
        }
    }
    //buscando doctores
    const [searchDoctor, setSearchDoctor ] = useState('');
    const [doctor, setDoctor] = useState([]);
    const [ocultarTablaD, setocultarTablaD] = useState(false);
    const handleSearchDoctor = (e) => {
        setSearchDoctor(e.target.value);
        if(searchDoctor==''){
            setDoctor([]);
            setConsulta({...consulta, email_doctor: ''})
            setocultarTablaD(false);
        }else{
            db.firestore().collection('usuarios').where("apellidos", "==", e.target.value).get()
            .then((resultado) => {
                resultado.forEach((doc) => {
                    setDoctor({...doc.data()})
                    setConsulta({...consulta, email_doctor: doc.data().email})
                })
            }).catch((error)=>{console.log(error)});
            setocultarTablaD(true);
        }
    }
    //cambiando el estado
    const handleChange = (e) => {
        setConsulta({
            ...consulta,
            [e.target.name]: e.target.value
        })
    }
    //tomando id de consulta para editar
    const [idConsulta, setIdConsulta] = useState('');
    const handleUpdateConsulta = (e) => {
        e.preventDefault();
        const id = e.target.parentElement.parentElement.children[0].textContent;
        setIdConsulta(id);
        //llamando datos de la base
        db.firestore().collection('consultas').doc(id)
            .onSnapshot(respuesta => setConsulta({ ...respuesta.data() }));
    }
    //tomando id de consulta para eliminar
    const handleDeleteConsulta = (e) => {
        e.preventDefault();
        const id = e.target.parentElement.parentElement.children[0].textContent;
        //eliminando de la base de datos
        if (window.confirm("esta seguro de eliminar esta consulta?")) {
            db.firestore().collection('consultas').doc(id).delete();
            toast.warning("Consulta eliminada");
        }
    }
    //tomando el id del paciente y registrando una consulta
    const handleSubmit = (e) => {
        e.preventDefault();
        //guardando los datos en firebase
        if (consulta.id_paciente == '') {
            toast.error("No se ha buscado paciente");
        } else {
            if (idConsulta) {
                db.firestore().collection('consultas').doc(idConsulta).set(consulta);
                setIdConsulta('');
                setConsulta(initConsulta)
                toast.info("Consulta actualizada");
            } else {
                db.firestore().collection('consultas').add(consulta);
                setConsulta(initConsulta)
                toast.success("Consultas Registrada");
            }
        }
        setConsulta(initConsulta);
        setSearchPaciente('');
        setPaciente([]);
        setocultarTablaP(false);
        setocultarTablaD(false);
        setDoctor([]);
        setSearchDoctor('');
    }
    //
    //render de la pagina
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4 pt-3">
            {/** formulario */}
            <div className="row-span-3">
                <div className="py-1 px-10">
                    <ToastContainer />
                    {/** buscando pacientes */}
                    <Buscar
                        searchPaciente={searchPaciente}
                        handleSearchPaciente={handleSearchPaciente}
                        handleSearchDoctor={handleSearchDoctor}
                        ocultarTablaP={ocultarTablaP}
                        ocultarTablaD={ocultarTablaD}
                        paciente={paciente}
                        doctor= {doctor}
                    />
                    {/** formulario para registrar consultas en la base */}
                    <FormConsultas
                        handleSubmit={handleSubmit}
                        fechaActual={fechaActual}
                        consulta={consulta}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            {/** table de registros */}
            <div className="row-span-3">
                <TableRegistrosConsultas
                    currentConsultas={currentConsultas}
                    handleUpdateConsulta={handleUpdateConsulta}
                    handleDeleteConsulta={handleDeleteConsulta}
                />
                {
                    consultasRegistros.length !== 0 &&
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={consultasRegistros.length}
                        pageRangeDisplayed={2}
                        onChange={handlePageChange}
                    />
                }
            </div>
        </div>
    )
}

//exportando pagina
export default PageConsultas;