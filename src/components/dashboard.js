import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { useFirebaseApp, useUser } from "reactfire";
import 'firebase/auth';
//import de componentes
import ConsultasComponent from './templates/consultas/pageConsultas';
import LoginComponent from './auth/login';
import RegistroComponent from './auth/registry';
import PacientesComponent from './templates/pacientes/pacientes';
import PerfilComponent from './auth/perfil';
import UsuarioComponent from './auth/usuarios';
import InicioComponent from './inicio';
import RecuperarComponent from './auth/resetPassword';
import PdfConsultas from './pdf/PdfPage';

const Navbar = () => {

    const db = useFirebaseApp();
    const user = useUser();
    //cerrando sesion
    const handleOnClickLogout = () => {
        db.auth().signOut();
    }

    //ocultando cuadro de usuario
    const [toggle, setToggle] = useState(true);
    //ocultando menu 
    const [menu, setMenu] = useState(true);
    const [menu2, setMenu2] = useState(false);

    //detectando tamaño de pantalla
    const handleScreen = () => {
        if (window.screen.width < 1024) {
            setMenu(false);
        }
    }
    const handleScreenMin = () => { setMenu2(!menu2); }
    const [rol, setRol] = useState('');
    //obteniendo rol del usuario
    const handleRol = () => {
        var Rol = "";
        if (user) {
            db.firestore().collection('usuarios').where("email", "==", user.email).get()
                .then((resultado) => {
                    resultado.forEach((doc) => {
                        Rol = doc.data().rol;
                    })
                    setRol(Rol);
                })
        }
    }
    useEffect(() => {
        handleScreen();
        handleRol();
    })
    //eventos
    //const handleOnClickToggleDesktop = () => setToggle(!toggle);

    return (
        <Router>
            <Route path="/login" component={LoginComponent} exact />
            <Route path="/registro" component={RegistroComponent} exact />
            <Route path="/recuperarcontraseña" component={RecuperarComponent} exact />
            {
                user ? (
                    <Route
                        path="/"
                        render={() => (
                            <div>
                                {/**navbar de la pagina */}
                                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                                    <Link className="navbar-brand" to="/">pharmy-app</Link>
                                    <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse  navbar-collapse" id="menu">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">
                                                <Link to="/consultas" className="nav-link">
                                                    Consultas
                                               </Link>
                                            </li>
                                            <li className="nav-item active">
                                                <Link to="/pacientes" className="nav-link">
                                                    Pacientes
                                               </Link>
                                            </li>
                                            {rol == "admin" ?
                                                <li className="nav-item active">
                                                    <Link to="/usuarios" className="nav-link">
                                                        Usuarios
                                               </Link>
                                                </li>
                                                : (<Redirect to="/inicio" exact />)}
                                        </ul>
                                        <div className="dropdown">
                                            <button className="btn btn-light"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                >
                                                <div>{user.email}</div>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link to="/perfil" className="dropdown-item">Perfil</Link>
                                                <p
                                                    onClick={handleOnClickLogout}
                                                    className="dropdown-item" role="menuitem"
                                                >Cerrar sesion</p>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                                {/**fin navbar */}
                                <main>
                                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                                        {
                                            <Switch>
                                                <Route path="/inicio" component={InicioComponent} exact />
                                                <Route path="/consultas" component={ConsultasComponent} exact />
                                                <Route path="/pacientes" component={PacientesComponent} exact />
                                                <Route path="/perfil" component={PerfilComponent} exact />
                                                <Route path="/usuarios" component={UsuarioComponent} exact />
                                                <Route path="/pdf/:id" component={PdfConsultas} exact />
                                                <Redirect from="/" to="/inicio" />
                                            </Switch>
                                        }
                                    </div>
                                </main>
                            </div>
                        )}
                    />
                )
                    : (<Redirect to="/login" exact />)
            }
        </Router>
    )
}

export default Navbar;
