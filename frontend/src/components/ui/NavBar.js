import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const NavBar = () => {

    const { username } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch( startLogout() );

    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4" style={{padding:'20px'}}>

            <span className="navbar-brand">
                <i className="fas fa-user"></i>
                <span> </span>
                { username }
            </span>
            
            <button 
                className="btn btn-outline-danger"
                onClick={ handleLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Logout</span>
            </button>
            
        </div>
    )
}
