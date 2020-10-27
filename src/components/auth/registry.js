import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer';


const Registro = () => {
    //firebase 
    const db = useFirebaseApp();
    const [contador, setContador] = useState(0);
    //estado de registro
    const initialForm = {
        nombres: '',
        apellidos: '',
        email: '',
        password: '',
        rol: ''
    }
    const [formRegistro, setFormRegistro] = useState(initialForm);
    //cambiando estado
    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormRegistro({ ...formRegistro, [name]: value });
    }
    const handleDoctor = () => {
        var i = 0;
        db.firestore().collection('usuarios').onSnapshot((usuarios) => {
            usuarios.forEach(() => {
                i = i + 1;
                setContador(i);
            })
        })
    }
    useEffect(() => {
        handleDoctor();
    }, [])
    //enviando datos
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (contador == 0) {
            formRegistro.rol = "admin";
        } else {
            formRegistro.rol = "doctor";
        }
        //guardando usuarios en la coleccion
        db.firestore().collection('usuarios').add(formRegistro);
        setFormRegistro(initialForm);
        //creando cuenta en firebase
        db.auth().createUserWithEmailAndPassword(formRegistro.email, formRegistro.password)
            .then(() => {
                toast.success("Cuenta creada ve al login e inicia sesion");
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div>
            <div className="container align-self-center">
                <ToastContainer />
                <div className="w-50 px-5 py-5">
                    <div className="card text-center">
                        <div className="card-body">
                            <h1 className="card-title">Pharmy-app</h1>
                            <hr />
                            <h5>Registro</h5>
                            <form
                                onSubmit={handleOnSubmit}
                                className="mt-40 shadow-md bg-white flex flex-col justify-center items-center"
                            >
                                <div className="form-group">
                                    <label>Nombres:</label>
                                    <input
                                        type="text"
                                        name="nombres"
                                        className="form-control"
                                        placeholder="nombres"
                                        required
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellidos:</label>
                                    <input
                                        type="text"
                                        name="apellidos"
                                        className="form-control"
                                        placeholder="apellido"
                                        required
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Correo</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="ingrese su email"
                                        required
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        required
                                        minLength="6"
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary">Crear cuenta</button>
                                </div>
                                <p>Tienes cuenta? <Link to="/login" className="text-primary">Regresa al login</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default withRouter(Registro);