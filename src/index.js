import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {FirebaseAppProvider} from 'reactfire';
import firebaseConfig from './config/firebase.config';
import RouterLinks from './config/routes';

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense>
      <RouterLinks />
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById('root')
);


