import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import Footer from '../footer';
//alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//importando imagen
import GoogleIcon from '../../assets/googlelogo.png';

const LoginComponent = (props) => {

    //configuracion inicial
    const db = useFirebaseApp();
    const initFormValues = { email: '', password: '' };
    const [emailError, passwordError] = '';
    const [formValues, setFormValues] = useState(initFormValues);

    //eventos
    const handleInputOnChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        await db.auth().signInWithEmailAndPassword(formValues.email, formValues.password).then(reponse => {
            props.history.push('/consultas');
        }).catch(() => {
            toast.error("Credenciales incorrectas");
        });
    };
    const handleOnClickGoogleAuth = async (event) => {
        event.preventDefault();

        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await db.auth().signInWithPopup(googleProvider).then(response => {
            props.history.push('/consultas');
        }).catch(error => console.log(error));
    };

    return (
        <div>
            <ToastContainer />
            <div className="container h-100">
                <div className="py-5">
                    <div className="row justify-content-center h-100">
                        <div className="col-sm-8 align-self-center text-center">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-tittle">Pharmy-app</h1>
                                    <hr />
                                    <h5>Login</h5>
                                    <form
                                        onSubmit={handleOnSubmit}
                                    >
                                        <div className="form-group">
                                            <label>Correo</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="ingrese su email"
                                                required
                                                onChange={handleInputOnChange}
                                            />
                                            <small className="block text-red-600">{emailError}</small>
                                        </div>
                                        <div className="form-group">
                                            <label>Contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                required
                                                minLength="6"
                                                onChange={handleInputOnChange}
                                            />
                                            <small className="block text-red-600">{passwordError}</small>
                                        </div>
                                        <div className="form-group text-center">
                                            <button type="submit" className="btn btn-primary">Iniciar sesion</button>
                                        </div>
                                        <div className="form-group text-center">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={handleOnClickGoogleAuth}
                                            >
                                                <img className="inline mr-2" src={GoogleIcon} height="20px" width="20px" />
                            Iniciar sesion con google
                            </button>
                                        </div>
                                        <div className="form-group text-center">
                                            <p>No tienes cuenta? <Link to="/registro" className="text-primary">Registrate</Link></p>
                                        </div>
                                        <div className="form-group text-center">
                                            <p>Olvidaste tu contraseña? <Link to="/recuperarcontraseña" className="text-primary">Restaurar</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

};
export default withRouter(LoginComponent);