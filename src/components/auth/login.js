import React, {useState} from 'react';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';
import '../../assets/dist.css';

const LoginComponent = (props) => {

    //configuracion inicial
    const db = useFirebaseApp();
    const user = useUser();
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
        await db.auth().signInWithEmailAndPassword(formValues.email, formValues.password);
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
                        className="py-1 px-5 rounded border shadow-sm"
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
                        className="py-1 px-5 rounded border shadow-sm"
                        required
                        minLength="6"
                        onChange={handleInputOnChange}
                    />
                    <small className="block text-red-600">{passwordError}</small>
                </div>
                <button className="mt-5 bg-blue-600 py-2 px-16 rounded text-white">Iniciar sesion</button>
                <p className="text-blue-600 mb-10">registrarse</p>
            </form>
        </div>
    );

};
export default LoginComponent;