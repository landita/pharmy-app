import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {FirebaseAppProvider} from 'reactfire';
import firebaseConfig from './firebase.config';
import DashboardComponent from './components/dashboard';
//importando bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={<p>cargando datos</p>}>
      <DashboardComponent />
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById('root')
);


