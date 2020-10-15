import React, { useState, useEffect } from 'react';
import { useFirebaseApp } from 'reactfire';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import Pagination from "react-js-pagination";
import './pagination.css';

const PacientesComponent = (props) => {

    const db = useFirebaseApp();
    const initFormValues = {
        nombres: '',
        apellidos: '',
        edad: '',
        telefono: '',
        padecimiento: '',
    };
    const [pacientes, setPacientes] = useState([]);
    const [formPaciente, setformPaciente] = useState(initFormValues);
    const [idPaciente, setIdPaciente] = useState('');
    const notify = () => toast('paciente ha sido ingresado');

    useEffect(() => {
        db.firestore().collection('pacientes')
            .onSnapshot(response => {
                const pacientes = response.docs.map(paciente => ({ ...paciente.data(), id: paciente.id }));
                setPacientes(pacientes);
            });
    }, []);

    // paginacion
    const todosPerPage = 6;
    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = activePage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentPacientes = pacientes.slice(indexOfFirstTodo, indexOfLastTodo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformPaciente({ ...formPaciente, [name]: value })
    }

    //enviando datos a la base
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleOnClickUpdatePaciente = (e) => {
        e.preventDefault();
        const id = e.target.parentElement.parentElement.children[0].textContent;
        setIdPaciente(id);
        db.firestore().collection('pacientes').doc(id)
            .onSnapshot(response => setformPaciente({ ...response.data() }));
    };

    const handleOnClickDeletePaciente = (e) => {
        e.preventDefault();
        const id = e.target.parentElement.parentElement.children[0].textContent;
        if (window.confirm('esta seguro de eliminar este paciente?')) db.firestore().collection('pacientes').doc(id).delete();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (idPaciente) {
            db.firestore().collection('pacientes').doc(idPaciente).set(formPaciente);
            setIdPaciente('');
        }
        else db.firestore().collection('pacientes').add(formPaciente);
        setformPaciente(initFormValues);
        notify();
    }

    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4 pt-3">
            <div className="row-span-3">
                <div className="py-1 px-10">
                    <ToastContainer />
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="lbl">Nombres</label>
                                <input
                                    type="text"
                                    className="input-form"
                                    name="nombres"
                                    value={formPaciente.nombres}
                                    onChange={handleChange}
                                    required
                                />
                                <small className="block text-red-600"></small>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="lbl">Apellidos</label>
                                <input
                                    type="text"
                                    className="input-form"
                                    name="apellidos"
                                    value={formPaciente.apellidos}
                                    onChange={handleChange}
                                    required
                                />
                                <small className="block text-red-600"></small>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="lbl">Algun padecimiento o enfermedad?</label>
                                <textarea rows="5" cols="5"
                                    className="input-form"
                                    name="padecimiento"
                                    value={formPaciente.padecimiento}
                                    onChange={handleChange}
                                    required
                                />
                                <small className="block text-red-600"></small>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="lbl">Telefono </label>
                                <input
                                    type="text"
                                    className="input-form"
                                    name="telefono"
                                    value={formPaciente.telefono}
                                    onChange={handleChange}
                                    placeholder="####-####"
                                    required
                                    pattern="^\d{4}-\d{4}$"
                                />
                                <small className="block text-red-600"></small>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="lbl">Edad</label>
                                <input
                                    type="number"
                                    className="input-form"
                                    name="edad"
                                    value={formPaciente.edad}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                                <small className="block text-red-600"></small>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-blue btn-blue:hover">Guardar informacion</button>
                    </form>
                </div>
            </div>
            <div className="row-span-3">
                <div>
                    <table className="table-auto bg-white rounded text-center ">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Nombre</th>
                                <th className="px-4 py-2 border">Telefono</th>
                                <th className="px-4 py-2 border">Consultas</th>
                                <th className="px-4 py-2 border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPacientes.map((response) => (
                                <tr key={response.id}>
                                    <td className="hidden">{response.id}</td>
                                    <td className="border px-4 py-2">{response.nombres} {response.apellidos}</td>
                                    <td className="border px-4 py-2">{response.telefono}</td>
                                    <td className="border px-4 py-2"><button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-900 py-1 px-1 rounded">Registros</button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            id="editar"
                                            className="bg-yellow-300 hover:bg-yellow-800 text-white py-1 px-1 rounded mr-1"
                                            type="button"
                                            onClick={handleOnClickUpdatePaciente}
                                        >Editar</button>
                                        <button
                                            id="eliminar"
                                            className="bg-red-500 hover:bg-red-800 text-white py-1 px-1 rounded"
                                            type="button"
                                            onClick={handleOnClickDeletePaciente}
                                        >Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        pacientes.length !== 0 &&
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={3}
                            totalItemsCount={pacientes.length}
                            pageRangeDisplayed={2}
                            onChange={handlePageChange}
                        />
                    }
                </div>
            </div>
        </div>
    );
};
export default withRouter(PacientesComponent);