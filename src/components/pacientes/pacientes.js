import React, { useState } from 'react';
//importando firebase
import 'firebase/firestore';
//importando estilos
import '../../assets/dist.css';
import { useFirebaseApp } from 'reactfire';

//funcion de formulario pacientes
const Pacientes = () => {
    const db = useFirebaseApp();
    //manejando el estado
    //datos del paciente
    const [formPaciente, setformPaciente] = useState(
        {
            nombres: '',
            apellidos: '',
            edad: '',
            telefono: '',
            padecimiento: '',
        }
    );

    //detectando cambios en los campos
    const handleChange = (e) => {
        setformPaciente({
            ...formPaciente,
            [e.target.name]: e.target.value,
        })
    }

    //enviando datos a la base
    const handleSubmit = async (e) => {
        e.preventDefault();
        //realizando llenado en la base de datos
        await db.firestore().collection('pacientes').add(formPaciente);
        //limpiando los campos despues de guardar un registro
        setformPaciente({
            nombres: '',
            apellidos: '',
            edad: '',
            telefono: '',
            padecimiento: '',
        })
    }

    //render de la funcion
    return(
        <div className="py-10 px-10">
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">Nombres</label>
                        <input
                            type="text"
                            className="input-form"
                            name="nombres"
                            value={formPaciente.nombres.value}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">Apellidos</label>
                        <input
                            type="text"
                            className="input-form"
                            name="apellidos"
                            value={formPaciente.apellidos.value}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="lbl">Algun padecimiento o enfermedad?</label>
                        <textarea rows="5" cols="5"
                            className="input-form"
                            name="padecimiento"
                            value={formPaciente.padecimiento.value}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">Telefono (########)</label>
                        <input
                            type="text"
                            className="input-form"
                            name="telefono"
                            value={formPaciente.telefono.value}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="lbl">Edad</label>
                        <input 
                            type="number"
                            className="input-form"
                            name="edad"
                            value={formPaciente.edad.value}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-blue btn-blue:hover">Guardar informacion</button>
            </form>
        </div>
    )
}

//exportando formulario
export default Pacientes;
