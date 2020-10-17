import React, { useState } from 'react';
import { useUser, useFirebaseApp } from "reactfire";
//alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pantalla de perfil de usuario
const Pefril = () => {
    const db = useFirebaseApp();
    const user = useUser();
    //ocultando boton editar 
    const [hiddenButtonEdit, setHiddenButtonEdit] = useState(false);
    const hiddenButtonEditClick = () => { setHiddenButtonEdit(!hiddenButtonEdit); }
    //estado de contraseña
    //nueva
    const [userFormPassword, setUserFormPassword] = useState('');
    const handleChangeNewPassword = (e) => { setUserFormPassword(e.target.value);}

    //cambiando la contraseña
    const handleChangePassword = (e) => {
        e.preventDefault();
        var usuario = db.auth().currentUser;
        usuario.updatePassword(userFormPassword).then(function(){
            toast.success("Contraseña actualizada");
        }).catch(function(error){
            toast.error(`${error}`)
        });
        //limpiando estado
        setUserFormPassword('');
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
                                    className="input-form"
                                    value={user.email}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <label className="lbl">Contraseña nueva:</label>
                                <input
                                    type="password" 
                                    name="password"
                                    className="input-form" 
                                    value={userFormPassword}
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