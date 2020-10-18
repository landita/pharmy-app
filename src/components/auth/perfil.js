import React, { useState } from 'react';
import { useUser, useFirebaseApp } from "reactfire";
//alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'firebase/firebase';
import * as firebase from 'firebase/app';

//pantalla de perfil de usuario
const Pefril = () => {
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
        <div className="grid grid-rows-3 grid-flow-col gap-4 pt-3">
            <ToastContainer />
            {/* izquierda*/}
            <div className="row-span-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-tittle">Nombre completo</div>
                        <p>id: {user.uid} </p>
                        <p className="text-card">{user.email} </p>
                    </div>
                </div>
            </div>
            {/* derecha */}
            <div className="row-span-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-tittle">Configuracion de la cuenta</div>
                        <form className="form-container" onSubmit={handleChangePassword}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <label className="lbl">Correo:</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-form bg-gray-200"
                                    value={user.email}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <label className="lbl">Contraseña anterior:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`${!hiddenButtonEdit ? 'bg-gray-200' : ''} input-form`}
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
                                    className={`${!hiddenButtonEdit ? 'bg-gray-200' : ''} input-form`}
                                    value={userFormNewPassword}
                                    onChange={handleChangeNewPassword}
                                    readOnly={!hiddenButtonEdit}
                                />
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <button
                                    type="submit"
                                    className={`${hiddenButtonEdit ? 'block' : 'hidden'} btn btn-blue btn-blue:hover`}>Guardar cambios</button>
                                <button
                                    type="button"
                                    onClick={hiddenButtonEditClick}
                                    className={`${hiddenButtonEdit ? 'hidden' : 'block'} btn btn-yellow btn-yellow:hover`}>Editar</button>
                                <button
                                    type="button"
                                    onClick={hiddenButtonEditClick}
                                    className={`${hiddenButtonEdit ? 'block' : 'hidden'} btn btn-yellow btn-yellow:hover`}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pefril;