import React, { useEffect, useState } from 'react';
//importando firebase
import 'firebase/firestore';
import { useFirebaseApp, useUser } from 'reactfire';
//alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//paginacion
import Pagination from "react-js-pagination";
import './pagination.css';

//funcion que controla las funciones de consultas
const PageConsultas = () => {
    //usando firebase
    const db = useFirebaseApp();
    const user = useUser();
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
    const currentPacientes = consultasRegistros.slice(indexOfFirstTodo, indexOfLastTodo);
    //enviando datos a la base
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    //tomando fecha actual
    var fechaActual = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()} `;
    //estado para consultas
    const initConsulta = {
        id_doctor: 'id doctor',
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
    const [ocultarTabla, setocultarTabla] = useState(false);
    //buscando pacientes
    const [searchPaciente, setSearchPaciente] = useState('');
    const handleSearchPaciente = (e) => {
        setSearchPaciente(e.target.value)
        if (searchPaciente == '') {
            setPaciente([]);
            setocultarTabla(false)
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
            setocultarTabla(true);
        }
    }
    //buscando doctores
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
        setSearchPaciente('');
        setPaciente([]);
        setocultarTabla(false);
    }
    //
    //render de la pagina
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4 pt-3">
            <ToastContainer />
            {/** formulario */}
            <div className="row-span-3">
                {/** buscando pacientes */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">buscar paciente</label>
                        <input
                            value={searchPaciente}
                            onChange={handleSearchPaciente}
                            className="input-form"
                        ></input>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    </div>
                    <div className={`${ocultarTabla ? 'block' : 'hidden'} px-5`}>
                        <table className="table-auto bg-gray-200 rounded">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Nombre</th>
                                    <th className="px-4 py-2">Telefono</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">{paciente.nombres} {paciente.apellidos}</td>
                                    <td className="border px-4 py-2">{paciente.telefono}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/** buscando doctor */}{/*
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">buscar Doctor</label>
                        <input
                            className="input-form"
                        ></input>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    </div>
                    <div className={`px-5`}>
                        <table className="table-auto bg-gray-200 rounded">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">id</th>
                                    <th className="px-4 py-2">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">{consulta.id_doctor}</td>
                                    <td className="border px-4 py-2">Init py</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>*/}
                {/** formulario para registrar consultas en la base */}
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="lbl">fecha de la cita</label>
                            <input
                                name="fecha"
                                type="date"
                                min={`${fechaActual}`}
                                className="input-form"
                                value={consulta.fecha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="lbl">hora</label>
                            <input
                                name="hora"
                                type="time"
                                min="07:00"
                                className="input-form"
                                value={consulta.hora}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="lbl">Receta medica</label>
                        <textarea
                            name="receta"
                            rows="2"
                            cols="20"
                            className="input-form"
                            value={consulta.receta}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="lbl">recomendaciones</label>
                        <textarea
                            name="recomendaciones"
                            rows="2"
                            className="input-form"
                            value={consulta.recomendaciones}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-blue btn-blue:hover">Guardar registro</button>
                </form>
            </div>
            {/** table de registros */}
            <div className="row-span-3">
                <div className="flex mb-4">
                    <div className="py-5">
                        <table className="table-auto bg-gray-200 rounded">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Nombre paciente</th>
                                    <th className="px-4 py-2">Hora</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultasRegistros.map((datos) => (
                                    <tr key={datos.id}>
                                        <td className="hidden">{datos.id}</td>
                                        <th className="border px-4 py-2">{datos.nombre_paciente}</th>
                                        <th className="border px-4 py-2">{datos.hora}</th>
                                        <th className="border px-4 py-2">
                                            <button
                                                onClick={handleUpdateConsulta}
                                                className="btn btn-yellow btn-yellow:hover">Editar</button>
                                            <button
                                                onClick={handleDeleteConsulta}
                                                className="btn btn-red btn-red:hover">Eliminar</button>
                                            <button
                                                
                                                className="btn btn-green btn-green:hover">Pdf</button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
            </div>
        </div>
    )
}

//exportando pagina
export default PageConsultas;