import React, { useEffect, useState } from 'react';
import { useUser, useFirebaseApp } from "reactfire";
//alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'firebase/firebase';
import * as firebase from 'firebase/app';
//footer
import Footer from '../footer';

//pantalla de perfil de usuario
const Pefril = () => {
    const f = new Date();
    const db = useFirebaseApp();
    const user = useUser();
    const auth = firebase;
    //ocultando boton editar 
    const [hiddenButtonEdit, setHiddenButtonEdit] = useState(false);
    const hiddenButtonEditClick = () => { setHiddenButtonEdit(!hiddenButtonEdit); }
    //estado de contraseña
    //nueva contraseña
    const [userFormNewPassword, setUserFormNewPassword] = useState('');
    const handleChangeNewPassword = (e) => { setUserFormNewPassword(e.target.value); }
    //vieja contraseña
    const [userFormCurrentPassword, setuserFormCurrentPassword] = useState('');
    const handleChangeCurrentPassword = (e) => { setuserFormCurrentPassword(e.target.value) }

    //buscando datos de doctor
    const [infoDoctor, setInfoDoctor] = useState([]);
    const handleDatos = () => {
        db.firestore().collection('usuarios').where("email", "==", user.email).get()
            .then((datos) => {
                datos.forEach((doc) => {
                    setInfoDoctor({ ...doc.data() });
                })
            })
    }
    useEffect(() => { handleDatos(); }, []);
    //reautenticando al usuario
    const reauthenticate = (currentPassword) => {
        var usuario = db.auth().currentUser;
        var cred = auth.auth.EmailAuthProvider.credential(
            usuario.email, currentPassword);

        return usuario.reauthenticateWithCredential(cred);
    }

    //cambiando la contraseña
    const handleChangePassword = (e) => {
        e.preventDefault();
        var usuario = db.auth().currentUser;
        //validando la reautenticacion
        reauthenticate(userFormCurrentPassword).then(() => {
            //cambiando la contraseña
            usuario.updatePassword(userFormNewPassword).then(function () {
                toast.success("Contraseña actualizada");
            }).catch(function (error) {
                toast.error(`${error}`)
            });
            //limpiando estados
            setUserFormNewPassword('');
            setuserFormCurrentPassword('');
            setHiddenButtonEdit(!hiddenButtonEdit)
        }).catch((error) => {
            console.log(error);
        })
    }
    //render
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4 p-3 text-dark" style={{ backgroundColor: "#BFCDE3" }}>
                <h1 className="h3 mb-0 text-gray-800">Cuenta de usuario</h1>
                <p className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Hora: {f.getHours()}:{f.getMinutes()}</p>
            </div>
            <div className="container py-5 row">
                <ToastContainer />
                {/* izquierda*/}
                <div className="col">
                    <div className="card shadow py-2">
                        <div className="card-body">
                            <div className="card-tittle">{infoDoctor.nombres} {infoDoctor.apellidos}</div>
                            <p>id: {user.uid} </p>
                            <p className="text-primary">{user.email} </p>
                            <p>rol: {infoDoctor.rol}</p>
                        </div>
                    </div>
                </div>
                {/* derecha */}
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-tittle">Configuracion de la cuenta</div>
                            <form className="form-container" onSubmit={handleChangePassword}>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <label className="lbl">Correo:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={user.email}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <label className="lbl">Contraseña anterior:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={userFormCurrentPassword}
                                        onChange={handleChangeCurrentPassword}
                                        readOnly={!hiddenButtonEdit}
                                    />
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <label className="lbl">Contraseña nueva:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={userFormNewPassword}
                                        onChange={handleChangeNewPassword}
                                        readOnly={!hiddenButtonEdit}
                                    />
                                </div>
                                <div>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        hidden={!hiddenButtonEdit}
                                    >Guardar cambios</button>
                                    <br />
                                    <button
                                        type="button"
                                        onClick={hiddenButtonEditClick}
                                        className="btn btn-warning"
                                        hidden={hiddenButtonEdit}
                                    >Editar</button>
                                    <br />
                                    <button
                                        type="button"
                                        onClick={hiddenButtonEditClick}
                                        className="btn btn-warning"
                                        hidden={!hiddenButtonEdit}
                                    >Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Pefril;