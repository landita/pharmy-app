import React from 'react';

//formulario para registrar consultas
const ConsultasForm = ({ HandleSubmit, HandleChange, Consulta, fechaActual }) => {
    //render
    return (
        <div>
            <form className="form-container" onSubmit={HandleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">fecha de la cita</label>
                        <input
                            name="fecha"
                            type="date"
                            min={`${fechaActual}`}
                            className="input-form"
                            value={Consulta.fecha.value}
                            onChange={HandleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">hora</label>
                        <input
                            name="hora"
                            type="time"
                            min="07:00"
                            className="input-form"
                            value={Consulta.hora.value}
                            onChange={HandleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <label className="lbl">Receta medica</label>
                    <textarea
                        name="receta"
                        rows="2"
                        cols="20"
                        className="input-form"
                        value={Consulta.receta.value}
                        onChange={HandleChange}
                    />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <label className="lbl">recomendaciones</label>
                    <textarea
                        name="recomendaciones"
                        rows="2"
                        className="input-form"
                        value={Consulta.recomendaciones.value}
                        onChange={HandleChange}
                    />
                </div>
                <button type="submit" className="btn btn-blue btn-blue:hover">Guardar registro</button>
            </form>
        </div>
    )
}

//exportando formulario
export default ConsultasForm;