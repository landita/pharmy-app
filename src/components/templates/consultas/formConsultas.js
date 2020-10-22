import React from 'react';

//formulario de consultas
const Form = ({ handleSubmit, fechaActual, consulta, handleChange }) => {
    return (
        <div>
            {/** formulario para registrar consultas en la base */}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <label>fecha de la cita</label>
                        <input
                            name="fecha"
                            type="date"
                            min={`${fechaActual}`}
                            className="form-control"
                            value={consulta.fecha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label>hora</label>
                        <input
                            name="hora"
                            type="time"
                            min="07:00"
                            className="form-control"
                            value={consulta.hora}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Receta medica</label>
                    <textarea
                        name="receta"
                        rows="3"
                        cols="20"
                        className="form-control"
                        value={consulta.receta}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>recomendaciones</label>
                    <textarea
                        name="recomendaciones"
                        rows="3"
                        className="form-control"
                        value={consulta.recomendaciones}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar registro</button>
            </form>
        </div>
    )
}

export default Form;