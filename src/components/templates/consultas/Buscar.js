import React from 'react';

//buscando pacientes y doctor
const Buscar = ({ searchPaciente, handleSearchPaciente, ocultarTablaP, paciente, ocultarTablaD, doctor, handleSearchDoctor }) => {
    return (
        <div className="p-5">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="lbl">buscar paciente</label>
                    <input
                        value={searchPaciente}
                        onChange={handleSearchPaciente}
                        className="input-form"
                    ></input>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                </div>
                <div className={`${ocultarTablaP ? 'block' : 'hidden'} px-5`}>
                    <table className="table-auto bg-gray-200 rounded">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{paciente.nombres} {paciente.apellidos}</td>
                                <td className="border px-4 py-2">{paciente.telefono}</td>
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
                        onChange={handleSearchDoctor}
                    ></input>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                </div>
                <div className={`${ocultarTablaD ? 'block' : 'hidden'} px-5`}>
                    <table className="table-auto bg-gray-200 rounded">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{doctor.nombres} {doctor.apellidos}</td>
                                <td className="border px-4 py-2">{doctor.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Buscar;