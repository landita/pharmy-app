import React from 'react';

//importando tabla de busquedas
const Table = ({HandleSearchPaciente, OcultarTabla, Paciente, Consulta}) => {
    //render
    return (
        <div>
            {/** buscando pacientes */}
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="lbl">buscar paciente</label>
                    <input
                        onChange={HandleSearchPaciente}
                        className="input-form"
                    ></input>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <br />
                    <button className="btn btn-blue btn-blue:hover">Agregar paciente</button>
                </div>
                <div className={`${OcultarTabla ? 'block' : 'hidden'} px-5`}>
                    <table className="table-auto bg-gray-200 rounded">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{Paciente.nombres} {Paciente.apellidos}</td>
                                <td className="border px-4 py-2">{Paciente.telefono}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/** buscando doctor */}
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="lbl">buscar Doctor</label>
                    <input
                        className="input-form"
                    ></input>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <br />
                    <button className="btn btn-blue btn-blue:hover">Agregar doctor</button>
                </div>
                <div className={`px-5`}>
                    <table className="table-auto bg-gray-200 rounded">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">id</th>
                                <th className="px-4 py-2">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{Consulta.id_doctor}</td>
                                <td className="border px-4 py-2">Init py</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table;