import React from 'react';

//formulario de consultas
const Form = ({ handleSubmit, fechaActual, consulta, handleChange }) => {
    return (
        <div>
            {/** formulario para registrar consultas en la base */}
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">fecha de la cita</label>
                        <input
                            name="fecha"
                            type="date"
                            min={`${fechaActual}`}
                            className="input-form"
                            value={consulta.fecha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="lbl">hora</label>
                        <input
                            name="hora"
                            type="time"
                            min="07:00"
                            className="input-form"
                            value={consulta.hora}
                            onChange={handleChange}
                            required
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
                        value={consulta.receta}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <label className="lbl">recomendaciones</label>
                    <textarea
                        name="recomendaciones"
                        rows="2"
                        className="input-form"
                        value={consulta.recomendaciones}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-blue btn-blue:hover">Guardar registro</button>
            </form>
        </div>
    )
}

export default Form;