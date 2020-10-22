import React from 'react';

//tabla de registro de consultas
const Table = ({ currentConsultas, handleUpdateConsulta, handleDeleteConsulta }) => {
    return (
        <div className="p-3">
            <table className="table table-hover">
                <thead>
                    <tr className="bg-primary">
                        <th>Nombre paciente</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentConsultas.map((datos) => (
                        <tr key={datos.id}>
                            <td hidden>{datos.id}</td>
                            <th>{datos.nombre_paciente}</th>
                            <th>{datos.hora}</th>
                            <th>
                                <button
                                    onClick={handleUpdateConsulta}
                                    className="btn btn-warning">Editar</button>
                                <button
                                    onClick={handleDeleteConsulta}
                                    className="btn btn-danger">Eliminar</button>
                                <button

                                    className="btn btn-info">Pdf</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;