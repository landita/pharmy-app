import React from 'react';

//buscando pacientes y doctor
const Buscar = ({ searchPaciente, handleSearchPaciente, ocultarTablaP, paciente, ocultarTablaD, doctor, handleSearchDoctor }) => {
    return (
        <div className="py-3">
            <div>
                <div className="form-group">
                    <label>Buscar paciente</label>
                    <input
                        value={searchPaciente}
                        onChange={handleSearchPaciente}
                        className="form-control"
                    ></input>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                </div>
                <div className={`px-5`} hidden={!ocultarTablaP}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{paciente.nombres} {paciente.apellidos}</td>
                                <td>{paciente.telefono}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/** buscando doctor */}
            <div>
                <div className="form-group">
                    <label>Buscar Doctor</label>
                    <input
                        className="form-control"
                        onChange={handleSearchDoctor}
                    ></input>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                </div>
                <div className={`px-5`} hidden={!ocultarTablaD}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{doctor.nombres} {doctor.apellidos}</td>
                                <td>{doctor.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Buscar;