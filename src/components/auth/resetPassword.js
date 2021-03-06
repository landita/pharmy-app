import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import 'firebase/auth';
import Footer from '../footer';
//alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//rutas
import { Link } from 'react-router-dom';

//recuperando contraseña
const Recuperar = () => {
    const db = useFirebaseApp();

    //estado de correo
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    //enviando correo
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email != '') {
            db.auth().sendPasswordResetEmail(email).then(() => {
                toast.success("Correo enviado, ve y restaura tu contraseña");
                setEmail('');
            }).catch(() => {
                toast.error("Correo no registrado");
            })
        } else {
            toast.error("Ingrese su correo");
        }
    }

    return (
        <div>
            <div className="container h-100">
                <ToastContainer />
                <div className="py-5">
                    <div className="row justify-content-center h-100">
                        <div className="col-sm-8 align-self-center text-center">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-tittle">Pharmy-app</h1>
                                    <hr />
                                    <h5>Recuperar contraseña</h5>
                                    <form
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="form-group">
                                            <label>Ingresa tu correo para restaurar</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="ingrese su email"
                                                required
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                        <div className="form-group text-center">
                                            <button
                                                type="submit"
                                                className="btn btn-primary">Enviar correo</button>
                                        </div>
                                        <p>Regresar al <Link to="/login" className="text-primary">login</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Recuperar;