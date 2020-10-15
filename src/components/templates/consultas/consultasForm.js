import React, { useState } from 'react';
import 'firebase/firestore';
import { useFirebaseApp } from 'reactfire';

//formulario para registrar consultas
const ConsultasForm = () => {
    //usando firebase
    const db = useFirebaseApp();
    //estado para consultas
    /*const [consulta, setConsulta] = useState({
        id_doctor: '',
        id_paciente: '',
        fecha: '',
        receta: '',
        recomendaciones: ''
    });*/
    //buscando pacientes
    const [paciente, setPaciente] = useState([]);
    //ocultando tabla
    const [ocultarTabla, setocultarTabla] = useState(false);

    //buscando pacientes
    const handleSearch = (e) => {
        if (e.target.value == '') {
            setPaciente([]);
        }
        else {
            //ejecutando consulta
            db.firestore().collection('pacientes').where("apellidos", "==", e.target.value)
                .get()
                .then(function (resultado) {
                    resultado.forEach(function (doc) {
                        setPaciente({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                })
                .catch(function (error) {
                    console.log("error: ", error)
                });
            //cambiando estado de tabla
            setocultarTabla(true);
        }
    }

    //tomando el id del paciente
    const handlePaciente = () => {
        if (paciente == []) {
            console.log("no encontrado")
        }
        else {
            console.log(paciente);
        }
    }

    //render
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4 pt-3">
            <div className="row-span-3">
                <form className="form-container">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="lbl">fecha de la cita</label>
                        <input
                            className="input-form"
                        />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="lbl">Receta medica</label>
                        <textarea
                            rows="2"
                            cols="20"
                            className="input-form"
                        />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="lbl">recomendaciones</label>
                        <textarea
                            rows="2"
                            className="input-form"
                        />
                    </div>
                    <button className="btn btn-blue btn-blue:hover">Guardar registro</button>
                </form>
            </div>
            <div className="row-span-3 px-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">buscar paciente</label>
                        <input
                            onChange={handleSearch}
                            className="input-form"
                        ></input>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <br />
                        <button onClick={handlePaciente} className="btn btn-blue btn-blue:hover">Agregar paciente</button>
                    </div>
                    <div className={`${ocultarTabla ? 'block' : 'hidden'} px-5`}>
                        <table className="table-auto bg-gray-200 rounded">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">id</th>
                                    <th className="px-4 py-2">Nombre</th>
                                    <th className="px-4 py-2">Telefono</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">{paciente.id}</td>
                                    <td className="border px-4 py-2">{paciente.nombres} {paciente.apellidos}</td>
                                    <td className="border px-4 py-2">{paciente.telefono}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

//exportando formulario
export default ConsultasForm;