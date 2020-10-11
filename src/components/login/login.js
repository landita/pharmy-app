import React, {useState} from 'react';
import '../../assets/dist.css';

const LoginComponent = (props) => {
    const [form, formValues] = useState({
        email:'',
        password:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hola xd');
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email</label>
                    <input type="email"/>
                </div>
                <div>
                    <label>password</label>
                    <input type="password"/>
                </div>
                <button>Iniciar sesion</button>
            </form>
        </div>
    );
};
export default LoginComponent;