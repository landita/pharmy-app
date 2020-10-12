import React from 'react';

//funcion que devuelve las cards
const Cards = ({ PacientesInfo }) => {
    return (
        <div>
            <table className="table-auto bg-gray-200 rounded">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Telefono</th>
                        <th className="px-4 py-2">Consultas</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {PacientesInfo.map((datos) => (
                        <tr key={datos.id}>
                            <td className="border px-4 py-2">{datos.nombres} {datos.apellidos}</td>
                            <td className="border px-4 py-2">{datos.telefono}</td>
                            <td className="border px-4 py-2"><button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-1 px-1 rounded">Registros</button>
                            </td>
                            <td className="border px-4 py-2"><button
                                className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-1 px-1 rounded">Editar</button>
                                <button
                                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

//exportando cards
export default Cards;