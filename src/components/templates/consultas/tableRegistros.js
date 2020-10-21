import React from 'react';

//tabla de registro de consultas
const Table = ({ currentConsultas, handleUpdateConsulta, handleDeleteConsulta }) => {
    return (
        <div>
            <table className="table-auto bg-white rounded text-center">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Nombre paciente</th>
                        <th className="px-4 py-2 border">Hora</th>
                        <th className="px-4 py-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentConsultas.map((datos) => (
                        <tr key={datos.id}>
                            <td className="hidden">{datos.id}</td>
                            <th className="border px-4 py-2">{datos.nombre_paciente}</th>
                            <th className="border px-4 py-2">{datos.hora}</th>
                            <th className="border px-4 py-2">
                                <button
                                    onClick={handleUpdateConsulta}
                                    className="btn btn-yellow btn-yellow:hover">Editar</button>
                                <button
                                    onClick={handleDeleteConsulta}
                                    className="btn btn-red btn-red:hover">Eliminar</button>
                                <button

                                    className="btn btn-green btn-green:hover">Pdf</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;