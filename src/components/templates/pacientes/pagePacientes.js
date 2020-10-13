import React, { useState, useEffect } from 'react';
//importando componentes
import FormPacientes from './pacientes';
import Cards from './cards';
//importando firebase
import 'firebase/firestore';
import { useFirebaseApp, } from 'reactfire';

//funcion que une el formulario pacientes con las card de registro
const PagePacientes = () => {
    //variable estado de pacientes
    const [registroPacientes, setRegistroPacientes] = useState([]);

    //constante de firebase
    const db = useFirebaseApp();
    //llamando los datos
    const datosPacientes = async () => {
        
        //obteniendo datos de la base
        db.firestore().collection('pacientes').onSnapshot((pacientes) => {
            const data= [];
            pacientes.forEach(pac => {
                data.push({...pac.data(), id: pac.id})
            })
            //cambiando el estado de la variable
            setRegistroPacientes(data);
        });

    }

    useEffect(() => {
        datosPacientes();
    })

    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4 pt-3">
            <div className="row-span-3">
                <FormPacientes />
            </div>
            <div className="row-span-3">
                <Cards 
                    PacientesInfo = {registroPacientes}
                />
            </div>
        </div>
    )
}

//exportando componente
export default PagePacientes;