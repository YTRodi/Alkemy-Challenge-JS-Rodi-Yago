const checkBalanceAmount = ( user, operation )  => {

    const { dataValues } = user;
    let modifiedUser = {};

    if ( operation.amount >= 1 ) {

        switch ( operation.type ) {
                    
            case 'ingreso':

                modifiedUser = {
                    ...dataValues,
                    balance: dataValues.balance + operation.amount
                }

                break;

            case 'egreso':

                modifiedUser = {
                    ...dataValues,
                    balance: // Logic: when the amount is greater than the balance...
                        ( operation.amount > dataValues.balance )
                            ? null
                            : dataValues.balance - operation.amount
                }

                break;
        
        }
        

        if ( !modifiedUser.balance )
            return 'Not enough funds';
    

        return modifiedUser;

    } else {

        return null;

    }

};


module.exports = {
    checkBalanceAmount
}