import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div className="mx-auto max-w-xs">
            <ToastContainer />
            <form
                onSubmit={handleOnSubmit}
                className="mt-40 shadow-md bg-white flex flex-col justify-center items-center"
            >
                <h1 className="mt-10 text-xl text-blue-600">Pharmy-app</h1>
                <div className="mt-10">
                    <label className="block text-gray-800">Nombres:</label>
                    <input
                        type="text"
                        name="nombres"
                        className="py-1 px-9 rounded border shadow-sm"
                        placeholder="nombres"
                        required
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="mt-10">
                    <label className="block text-gray-800">Apellidos:</label>
                    <input
                        type="text"
                        name="apellidos"
                        className="py-1 px-9 rounded border shadow-sm"
                        placeholder="apellido"
                        required
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="mt-10">
                    <label className="block text-gray-800">Correo</label>
                    <input
                        type="email"
                        name="email"
                        className="py-1 px-9 rounded border shadow-sm"
                        placeholder="ingrese su email"
                        required
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="mt-5">
                    <label className="block text-gray-800">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className="py-1 px-9 rounded border shadow-sm"
                        required
                        minLength="6"
                        onChange={handleChangeForm}
                    />
                </div>
                <button type="submit" className="mt-5 bg-blue-600 py-2 px-20 rounded text-white">Crear cuenta</button>
                <Link to="/login" className="text-blue-500 hover:text-blue-800">Regresar al login</Link>
            </form>
        </div>
    )
}

export default withRouter(Registro);