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
import ConsultasComponent from './templates/consultas/consultasForm';
import LoginComponent from './auth/login';
import RegistrarseComponent from './auth/registrarse';
import PacientesComponent from './templates/pacientes/pagePacientes';

const Navbar = () => {

    const db = useFirebaseApp();
    const user = useUser();
    //cerrando sesion
    const handleOnClickLogout = () => {
        db.auth().signOut();
    }

    //ocultando cuadro de usuario
    const [toggle, setToggle] = useState(false);
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
    useEffect(() => {
        handleScreen();
    })
    //eventos
    const handleOnClickToggleDesktop = () => setToggle(!toggle);

    return (
        <Router>
            <Route path="/login" component={LoginComponent} exact />
            <Route path="/registrarse" component={RegistrarseComponent} exact />
            {
                user ? (
                    <Route
                        path="/"
                        render={() => (
                            <div>
                                <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-6">
                                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                                        <div className="flex-shrink-0">
                                            <p className="text-white text-xl">Pharmy-app</p>
                                        </div>
                                    </div>
                                    <div className="block lg:hidden">
                                        <button onClick={handleScreenMin} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                                        </button>
                                    </div>
                                    <div className={`${menu || menu2 ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
                                        <div className="text-sm lg:flex-grow">
                                            <Link to="/consultas" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                                Consultas
                                            </Link>
                                            <Link to="/pacientes" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                                Pacientes
                                            </Link>
                                            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                                Doctores
                                            </a>
                                        </div>
                                        <div>
                                            <button onClick={handleOnClickToggleDesktop} className="max-w-xs flex items-center text-sm text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
                                                <div className="inline-block text-sm px-4 py-2 leading-none border text-white border-white hover:border-transparent hover:text-teal-500 mt-4 lg:mt-0">
                                                    <p className="text-white">{user.email}</p>
                                                </div>
                                            </button>
                                        </div>
                                        <div>
                                            <div className={`${toggle ? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}>
                                                <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Perfil</a>

                                                    <p
                                                        onClick={handleOnClickLogout}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
                                                    >Cerrar sesion</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                                <header className="bg-white shadow">
                                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                        <h1 className="text-3xl font-bold leading-tight text-gray-900">
                                            Consultas
                                    </h1>
                                    </div>
                                </header>
                                <main>
                                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                                        {
                                            <Switch>
                                                <Route path="/consultas" component={ConsultasComponent} exact />
                                                <Route path="/pacientes" component={PacientesComponent} exact />
                                                <Redirect from="/" to="/consultas" />
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
