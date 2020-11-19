import React from 'react';
import { Link } from 'react-router-dom';

//tabla de registro de consultas
const Table = ({ currentConsultas, handleUpdateConsulta, handleDeleteConsulta, handleToday, allortoday }) => {
    return (
        <div className="py-3">
            <div className="btn-group btn-group-toggle">
                <button className="btn btn-light active" type="radio" name="options" onClick={handleToday}>Hoy</button>
                <button className="btn btn-light active" type="radio" name="options" onClick={handleToday}>Todos</button>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr className="bg-primary">
                        <th>Nombre paciente</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentConsultas.map((datos) => (
                        <tr key={datos.id}>
                            <td hidden>{datos.id}</td>
                            <th>{datos.nombre_paciente}</th>
                            <th>{datos.fecha}</th>
                            <th>{datos.hora}</th>
                            <th>
                                <button
                                    onClick={handleUpdateConsulta}
                                    className="btn btn-warning">Editar</button>
                                <button
                                    onClick={handleDeleteConsulta}
                                    className="btn btn-danger">Eliminar</button>
                                <Link
                                    to={`/pdf/${datos.id}`}
                                    className="btn btn-info">Pdf</Link>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Mostrando: {allortoday}</p>
        </div>
    )
}

export default Table;