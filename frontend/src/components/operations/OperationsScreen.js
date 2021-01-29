// Cuando este autenticado, entrará a este componente
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { operationGetAll } from '../../actions/operations';

import { NavBar } from '../ui/NavBar';
import { Operation } from '../ui/Operation';
import { OperationDashboard } from '../ui/OperationDashboard';

export const OperationsScreen = () => {

    // Tengo que recuperar todas las operaciones que hizo el usuario

    const dispatch = useDispatch();
    const state = useSelector( state => state.operation );
    // console.log(state?.data)

    useEffect(() => {

        dispatch( operationGetAll() );    

    }, [ dispatch ]);

    return (
        <div>
            <NavBar />
            <OperationDashboard />

            <div className="container text-center">
                {/* {

                    state?.data !== 'Empty operations list'
                        ?  
                        state.data.map( op => (

                                
                            <Operation 
                                key={ op.id }
                                concept={ op.concept }
                                amount={ op.amount }
                                date={ op.date }
                                colorType={ 
                                    op.type === 'egreso'
                                        ? 'red'
                                        : 'green'
                                }
                            />
                                
                        ))
                        :
                        (
                            <div className="alert alert-warning" role="alert">
                                Empty operations!
                            </div>
                        )
                   
                } */}
            </div>
            
        </div>
    )
}
