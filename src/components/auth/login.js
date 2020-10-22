import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import * as firebase from 'firebase/app';

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
        }).catch(error => console.log(error));
    };
    const handleOnClickGoogleAuth = async (event) => {
        event.preventDefault();

        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await db.auth().signInWithPopup(googleProvider).then(response => {
            props.history.push('/consultas');
        }).catch(error => console.log(error));
    };

    return (
        <div className="mx-auto">
            <div className="card text-center" style={{ width: 30 + "rem", height: 30 + "rem" }}>
                <div className="py-3">
                    <form
                        onSubmit={handleOnSubmit}
                    >
                        <h1>Pharmy-app</h1>
                        <div className="mt-10">
                            <label>email</label>
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
                        <div className="mt-5">
                            <label>password</label>
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
                        <br />
                        <button type="submit" className="btn btn-primary">Iniciar sesion</button>
                        <br />
                        <br />
                        <button
                            type="button"
                            className="btn btn-ligth"
                            onClick={handleOnClickGoogleAuth}
                        >
                            <img className="inline mr-2" src="https://img.icons8.com/color/452/google-logo.png" height="20px" width="20px" />
                    Iniciar sesion con google
                </button>
                        <br />
                        <br />
                        <Link to="/registro" className="btn btn-primary">Registrarse</Link>
                    </form>
                </div>
            </div>
        </div>
    );

};
export default withRouter(LoginComponent);