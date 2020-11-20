import React, { useState, useEffect } from 'react';
import { useFirebaseApp } from 'reactfire';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import Pagination from "react-js-pagination";
import './pagination.css';
import Footer from '../../footer';


const PacientesComponent = () => {
    const f = new Date();
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
    const notify = () => toast.success('paciente ha sido ingresado');

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
        if (window.confirm('esta seguro de eliminar este paciente?')) {
            db.firestore().collection('pacientes').doc(id).delete()
            toast.error("Paciente eliminado");
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (idPaciente) {
            db.firestore().collection('pacientes').doc(idPaciente).set(formPaciente);
            setIdPaciente('');
        }
        else {
            db.firestore().collection('pacientes').add(formPaciente)
            setIdPaciente('');
        };
        setformPaciente(initFormValues);
        notify();
    }

    const handleCancel = (e) => {
        setformPaciente(initFormValues);
    }

    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4 p-3 text-dark" style={{ backgroundColor: "#BFCDE3" }}>
                <h1 className="h3 mb-0 text-gray-800">Pacientes</h1>
                <p className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Hora: {f.getHours()}:{f.getMinutes()}</p>
            </div>

            <div className="container row py-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <ToastContainer />
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="col">
                                        <label>Nombres</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombres"
                                            value={formPaciente.nombres}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="lbl">Apellidos</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="apellidos"
                                            value={formPaciente.apellidos}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Algun padecimiento o enfermedad?</label>
                                    <textarea rows="5" cols="5"
                                        className="form-control"
                                        name="padecimiento"
                                        value={formPaciente.padecimiento}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <label>Telefono </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="telefono"
                                            value={formPaciente.telefono}
                                            onChange={handleChange}
                                            placeholder="####-####"
                                            required
                                            pattern="^\d{4}-\d{4}$"
                                        />
                                    </div>
                                    <div className="col">
                                        <label>Edad</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="edad"
                                            value={formPaciente.edad}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary">Guardar informacion</button>
                                <button type="button" className="btn btn-warning" onClick={handleCancel}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div>
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr className="bg-primary">
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPacientes.map((response) => (
                                    <tr key={response.id}>
                                        <td hidden>{response.id}</td>
                                        <td>{response.nombres} {response.apellidos}</td>
                                        <td>{response.telefono}</td>
                                        <td>
                                            <button
                                                id="editar"
                                                className="btn btn-warning"
                                                type="button"
                                                onClick={handleOnClickUpdatePaciente}
                                            >Editar</button>
                                            <button
                                                id="eliminar"
                                                className="btn btn-danger"
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
            <Footer />
        </div>
    );
};
export default withRouter(PacientesComponent);