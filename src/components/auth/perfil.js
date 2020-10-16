import React, { useState } from 'react';
import { useUser } from "reactfire";

//pantalla de perfil de usuario
const Pefril = () => {
    const user = useUser();
    //ocultando boton editar 
    const [hiddenButtonEdit, setHiddenButtonEdit] = useState(false);
    const hiddenButtonEditClick = () => { setHiddenButtonEdit(!hiddenButtonEdit); }
    //estado de usuario y contraseña
    const initUserForm = {
        email: '',
        password: ''
    }
    const [userForm, setUserForm] = useState(initUserForm);
    const handleChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }
    //cambiando la contraseña
    const handleSubmit = () => {

    }
    //render
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4 pt-3">
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
                        <form className="form-container" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <label className="lbl">Correo:</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-form"
                                    value={userForm.email}
                                    onChange={handleChange}
                                    readOnly={!hiddenButtonEdit}
                                />
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <label className="lbl">Contraseña:</label>
                                <input
                                    type="password" 
                                    name="password"
                                    className="input-form" 
                                    value={userForm.password}
                                    onChange={handleChange}
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