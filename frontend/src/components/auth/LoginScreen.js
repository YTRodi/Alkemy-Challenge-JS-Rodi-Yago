// Componente que va a tener tanto el registro y el login
import React from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/userForm';
import Swal from "sweetalert2";

// Actions
import { startLogin, startRegister } from '../../actions/auth';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    // LOGIN
    const [ formLoginValues, handleLoginInputChange ] = useForm({

        lEmail: 'maggie@gmail.com',
        lPassword: 'muerdomucho'

    });
    
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({

        rUserName: '', // 4 letras como minimo
        rEmail: '',
        rPassword1: '',
        rPassword2: ''

    });
    
    const { lEmail, lPassword } = formLoginValues;
    const { rUserName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleLogin = async( e ) => {

        e.preventDefault();
        
        // Ejecuto la acción de Login
        dispatch( startLogin( lEmail, lPassword ) )

    }

    const handleRegister = async( e ) => {

        e.preventDefault();

        if ( rPassword1 !== rPassword2 )
            return Swal.fire( 'Error', 'Passwords must be the same', 'error' );

        console.log({rUserName, rEmail, rPassword1, rPassword2});
        // Ejecuto la acción de Register
        dispatch( startRegister( rUserName, rEmail, rPassword1 ) )

    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin } >
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                name="rUserName"
                                value={ rUserName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat the password" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
