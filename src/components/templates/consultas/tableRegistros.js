import React, { useEffect, useState } from 'react';
//importando firestare
import { useFirebaseApp } from 'reactfire';
import 'firebase/firestore';

//registro de consultas
const TableRegistros = () => {
    const db = useFirebaseApp();
    //estado fecha
    const f = new Date();
    //estado de consultas
    const [consultas, setConsultas] = useState([]);
    //tomando consultas
    const handleToday = async () => {
        db.firestore().collection('consultas').where("fecha", "==", `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`)
            .onSnapshot((consultas) => {
                const data = [];
                consultas.forEach(doc => {
                    data.push({ ...doc.data(), id: doc.id })
                })
                setConsultas(data);
            })
    }
    //tomando id seleccionado
    const handleEdit = (id) => {
        console.log(id);
    }
    useEffect(() => {
        handleToday();
    })
    //render
    return (
        <div className="flex mb-4">
            <div className="py-5">
                <table className="table-auto bg-gray-200 rounded">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nombre paciente</th>
                            <th className="px-4 py-2">Receta</th>
                            <th className="px-4 py-2">Recomendaciones</th>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Hora</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map((datos) => (
                            <tr key={datos.id}>
                                <th className="border px-4 py-2">nombre ejemplo</th>
                                <th className="border px-4 py-2">{datos.receta}</th>
                                <th className="border px-4 py-2">{datos.recomendaciones}</th>
                                <th className="border px-4 py-2">{datos.fecha}</th>
                                <th className="border px-4 py-2">{datos.hora}</th>
                                <th className="border px-4 py-2">
                                    <button
                                       onClick={handleEdit(datos.id)}
                                       className="btn btn-yellow btn-yellow:hover">Editar</button>
                                    <button className="btn btn-red btn-red:hover">Eliminar</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableRegistros;