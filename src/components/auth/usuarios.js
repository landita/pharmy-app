import React, { useEffect, useState } from 'react';
//importando firebase
import 'firebase/firestore';
import { useFirebaseApp } from 'reactfire';
//alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer';

const UsuariosComponent = () => {
    const f = new Date();
    const db = useFirebaseApp();
    //usuarios 
    const [usuarios, setUsuario] = useState([]);
    //trayendo los usuarios de la base
    const handleUsers = () => {
        db.firestore().collection('usuarios').onSnapshot((respuesta) => {
            const data = [];
            respuesta.forEach(doc => {
                data.push({ ...doc.data(), id: doc.id })
            })
            setUsuario(data);
        })
    }
    //ejecutando useEffect
    useEffect(() => {
        handleUsers();
    }, [])
    //editando usuario
    const initialFomUsuario = {
        nombres: '',
        apellidos: '',
        email: '',
        rol: ''
    }
    const [formUsuario, setFormUsuario] = useState(initialFomUsuario);
    const [idUsuario, setIdUsuario] = useState('');
    const handleEdit = (e) => {
        e.preventDefault();
        const id = e.target.parentElement.parentElement.children[0].textContent;
        if (id) {
            db.firestore().collection('usuarios').doc(id).onSnapshot(resultado => {
                setFormUsuario({
                    nombres: resultado.data().nombres,
                    apellidos: resultado.data().apellidos,
                    email: resultado.data().email,
                    rol: resultado.data().rol
                })
            })
        }
        setIdUsuario(id);
    }
    const handleCancel = (e) => { e.preventDefault(); setFormUsuario(initialFomUsuario); }
    //editando campos de usuario
    const handleChange = (e) => {
        setFormUsuario({
            ...formUsuario,
            [e.target.name]: e.target.value
        })
    }

    //eliminando usuario
    const handleDelete = (e) => {
        const id = e.target.parentElement.parentElement.children[0].textContent;
        if (window.confirm("Seguro de eliminar este usuario")) {
            db.firestore().collection('usuarios').doc(id).delete();
            toast.warning("Usuario eliminado");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (idUsuario) {
            db.firestore().collection('usuarios').doc(idUsuario).set(formUsuario);
            setIdUsuario('');
            setFormUsuario(initialFomUsuario);
            toast.info("Usuario actualizado");
        } else { toast.error("Seleccione un usuario"); }
    }
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4 p-3 text-dark" style={{ backgroundColor: "#BFCDE3" }}>
                <h1 className="h3 mb-0 text-gray-800">Usuarios</h1>
                <p className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Hora: {f.getHours()}:{f.getMinutes()}</p>
            </div>
            <div className="container">
                {/** form para editar usuario */}
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="col">
                                    <label>Nombres</label>
                                    <input name="nombres" onChange={handleChange} value={formUsuario.nombres} className="form-control" />
                                </div>
                                <div className="col">
                                    <label>Apellidos</label>
                                    <input name="apellidos" onChange={handleChange} value={formUsuario.apellidos} className="form-control" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <label>Correo</label>
                                    <input name="email" onChange={handleChange} value={formUsuario.email} className="form-control" />
                                </div>
                                <div className="col">
                                    <label>Rol</label>
                                    <input name="rol" onChange={handleChange} value={formUsuario.rol} className="form-control" />
                                </div>
                                <div className="col justify-center">
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary">Guardar</button>
                                    <button
                                        onClick={handleCancel}
                                        type="button"
                                        className="btn btn-warning">Cancelar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
                <div className="py-1">
                    <table className="table table-hover">
                        <thead>
                            <tr className="bg-primary">
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map((datos) => (
                                    <tr key={datos.id}>
                                        <td hidden>{datos.id}</td>
                                        <td>{datos.nombres} {datos.apellidos}</td>
                                        <td>{datos.email}</td>
                                        <td>{datos.rol}</td>
                                        <td><button
                                            onClick={handleEdit}
                                            className="btn btn-warning">Editar</button>
                                            <button
                                                onClick={handleDelete}
                                                className="btn btn-danger">Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
};
export default UsuariosComponent;