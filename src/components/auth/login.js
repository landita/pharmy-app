import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import * as firebase from 'firebase/app';

const LoginComponent = (props) => {

    //configuracion inicial
    const db = useFirebaseApp();
    const initFormValues = {email:'', password:''};
    const [emailError, passwordError] = '';
    const [formValues, setFormValues] = useState(initFormValues);

    //eventos
    const handleInputOnChange = (event) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]:value});
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

    return(
        <div className="mx-auto max-w-xs">
            <form 
                onSubmit={handleOnSubmit}
                className="mt-40 shadow-md bg-white flex flex-col justify-center items-center"
            >
                <h1 className="mt-10 text-xl text-blue-600">Pharmy-app</h1>
                <div className="mt-10">
                    <label className="block text-gray-800">email</label>
                    <input 
                        type="email"
                        name="email"
                        className="py-1 px-9 rounded border shadow-sm"
                        placeholder="ingrese su email"
                        required
                        onChange={handleInputOnChange}
                    />
                    <small className="block text-red-600">{emailError}</small>
                </div>
                <div className="mt-5">
                    <label className="block text-gray-800">password</label>
                    <input 
                        type="password"
                        name="password"
                        className="py-1 px-9 rounded border shadow-sm"
                        required
                        minLength="6"
                        onChange={handleInputOnChange}
                    />
                    <small className="block text-red-600">{passwordError}</small>
                </div>
                <button type="submit" className="mt-5 bg-blue-600 py-2 px-20 rounded text-white">Iniciar sesion</button>
                <button 
                    type="button" 
                    className="mt-5 mb-10 text-black border border-blue-600 bg-transparent py-2 px-6 rounded text-white" 
                    onClick={handleOnClickGoogleAuth}
                >
                    <img className="inline mr-2" src="https://img.icons8.com/color/452/google-logo.png" height="20px" width="20px"/>
                    Iniciar sesion con google
                </button>
                <Link to="/registro" className="text-blue-500 hover:text-blue-800">Registrarse</Link>
            </form>
        </div>
    );

};
export default withRouter(LoginComponent);