import React from 'react';

//pantalla de perfil de usuario
const Pefril = () => {
    //render
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4 pt-3">
            {/* izquierda*/}
            <div className="row-span-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-tittle">Nombre completo</div>
                        <p className="text-card">Correo electronico</p>
                    </div>
                </div>
            </div>
            {/* derecha */}
            <div className="row-span-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-tittle">Configuracion de la cuenta</div>
                        <form className="form-container">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <label className="lbl">Correo:</label>
                                <input className="input-form" />
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <label className="lbl">Contraseña:</label>
                                <input type="password" className="input-form" />
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <button className="btn btn-blue btn-blue:hover">Guardar cambios</button>
                                <button className="btn btn-yellow btn-yellow:hover">Editar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pefril;