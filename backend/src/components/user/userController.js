const userStore = require( './userStore' );
const bcryptjs = require( 'bcryptjs' );
const { createToken } = require( '../../auth/jwt' );


const loginUser = ( { email, password } ) => {
    
    return new Promise( async( resolve, reject ) => {
        
        try {
        
            const user = await userStore.login( email );
            
            if ( !user )
                reject( { message: 'Error in email and/or password' } );
        
            // #1 Unencrypted value
            // #2 Encrypted value
            const equals = bcryptjs.compareSync( password, user.password );

            if ( !equals ) 
                reject( { message: 'Error in email and/or password' } );
            
            const token = createToken( user );
            resolve( { token } )
                

        } catch ( error ) {
            
            reject( { message: 'Unexpected error', error } );
            
        }     

    });

};

const getAllUsers = () => {

    return new Promise( async( resolve, reject ) => {
       
        try {
            
            const getAllUsers = await userStore.list();

            if( getAllUsers.length === 0 )
                resolve( 'Empty users' );
            
            resolve( getAllUsers );

        } catch (error) {
            
            reject( { message: 'Unexpected error', error } );

        }
        
    });
    
};

const getUserById = ( idUser ) => {

    return new Promise( async( resolve, reject ) => {
    
        try {
            
            if( !idUser )
                reject( { message: `Invalid data: id = ${ idUser }` } );

            const userById = await userStore.userById( idUser );
            
            if( !userById ) 
                reject( { message: `Couldn't get - id doesn't exists.` } );

// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
// VERIFICAR: NO HACE FALTA DESESTRUCTURAR, PUEDO ENVIAR EL userById de una.
            console.log(userById.username)
            const { dataValues } = userById;
            resolve( dataValues );

        } catch ( error ) {
            
            reject( { message: error } );
            
        }
        
    });   
    
};

const addUser = ( bodyUser ) => {

    return new Promise( async( resolve, reject ) => {
        
        try {

            if( !bodyUser )
                reject( { message: `Invalid data: bodyUser is undefined.` } );
        

            bodyUser = {
                ...bodyUser,
                balance: 0,
                // #1 Que cosa voy a encriptar
                // #2 Veces que se va a aplicar el agoritmo de encriptación
                password: bcryptjs.hashSync( bodyUser.password, 10 )
            }

            console.log(bodyUser)

            const newUser = await userStore.add( bodyUser );

            !newUser
                ? reject( { message: `Couldn't create.` } )
                : resolve( newUser )

        } catch (error) {
            
            reject( { message: error } );

        }
        
    });

};

const updateUser = ( idUser, bodyUser ) => {

    return new Promise( async( resolve, reject ) => {
        
        try {

            if ( !idUser && !bodyUser )
                reject( { message: `Invalid data: idUser or bodyUser is undefined.` } );
            
            
            const [ result ] = await userStore.update( idUser, bodyUser );

            result !== 0 && result
                ? resolve( 'updated successfully' )
                : reject( `Couldn't update - id doesn't exists.` )
            

        } catch (error) {

            reject( { message: error } );
            
        }
        
    });

};

const deleteUser = ( idUser ) => {

    return new Promise( async( resolve, reject ) => {
    
        try {
            
            if( !idUser )
                reject( { message: `Invalid data: id is undefined.` } );

            const result = await userStore.delete( idUser );

            result !== 0 && result
                ? resolve( 'deleted successfully' )
                : reject( `Couldn't delete - id doesn't exists.` )


        } catch (error) {
         
            reject( { message: error } );
            
        }

    });
    
};

module.exports = {
    loginUser,
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser: deleteUser
}