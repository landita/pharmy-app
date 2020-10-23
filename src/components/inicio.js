import React, { useEffect, useState } from 'react';
import { useFirebaseApp, useUser } from "reactfire";
import 'firebase/auth';
import Footer from './footer';
import Multiclinica from '../assets/mecca.jpg';

//pantalla de inicio 
const Inicio = () => {
    //usando firebase
    const db = useFirebaseApp();
    const user = useUser();
    const f = new Date();
    //trayendo datos del usuario
    const [datos , setDatos] = useState({
        nombres: '',
        apellidos: ''
    });
    const handleInfo = () => {
        db.firestore().collection('usuarios').where("email", "==", user.email).get()
            .then((datos) => {
                datos.forEach((doc) => {
                    setDatos({ nombres: doc.data().nombres, apellidos: doc.data().apellidos });
                })
            })
    }
    useEffect(()=>{
        handleInfo();
    }, [])
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4 p-3 text-dark" style={{ backgroundColor: "#BFCDE3" }}>
                <h1 className="h3 mb-0 text-gray-800">Inicio</h1>
                <p className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Hora: {f.getHours()}:{f.getMinutes()}</p>
            </div>
            <div className="container">
                <div className="row py-3">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Bienvenido:</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{datos.nombres} {datos.apellidos}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/**primer card */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Fecha</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{f.getDate()} / {f.getMonth() + 1} / {f.getFullYear()}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/** fin card */}
                </div>
                {/** imagen de muestra */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">MECCA</h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src={Multiclinica} alt="" />
                        </div>
                        <p>Sistema para control de pacientes, citas y usuarios de la Multiclinica</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Inicio;