import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFullUser } from '../../actions/auth';

export const OperationDashboard = () => {

    const dispatch = useDispatch();
    const { uid } = useSelector( state => state.auth );
    const pepe = useSelector( state => state.operation );
    console.log('pepe')
    console.log(pepe)
    
    useEffect(() => {
        
        dispatch( getFullUser( uid ) )

    }, [dispatch]);


    return (
        <div className="container text-center" style={ { paddingTop: '20px', height: '100%' } }>

            <div className="row justify-content-center">
                <div className="col-5">
                    
                    <div className="row">
                        <p style={ { width: '100%' } }>Dinero Disponible</p>
                    </div>

                    <div className="row">
                        <p style={ { width: '100%' } }>
                            $999.999
                            {/* ACA MANDO EL BALANCE */}
                        </p>
                    </div>

                </div>

                <div className="col-2">

                </div>

                <div className="col-5">

                    <div className="row">
                        <div className="col mt-1">
                            <div className="row">
                                <button className="btn btn-success btn-sm btn-block" style={ { padding: '18px' } }>
                                    NEW OPERATION
                                    {/* ACA DISPARO EL MODAL!!! */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
