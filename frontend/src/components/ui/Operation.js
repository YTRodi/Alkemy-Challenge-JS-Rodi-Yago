import React from 'react'

export const Operation = ( { concept, amount, date, colorType } ) => {

    return (
        <div className="row justify-content-center mt-4" >

            <div className="col-6" style={ { border: '1px solid black' } }>

                <div className="row">

                    <div className="col-sm align-self-center">
                        <p>{ concept }</p>
                    </div>

                    <div className="col-sm align-self-center">
                        <p style={ { color: colorType } }>
                            {
                                colorType === 'red'
                                    ? `-$${amount}`
                                    : `$${amount}`
                            }
                        </p>
                    </div>

                </div>

                <div className="row">

                    <div className="col-sm align-self-center text-center">
                        { date }
                    </div>

                </div>

            </div>

        </div>
    )
}
