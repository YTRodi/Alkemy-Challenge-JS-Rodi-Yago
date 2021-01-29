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

            resolve({
                uid: user.id,
                username: user.username,
                token: token
            })
                

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

const getUserById = ( userId ) => {

    return new Promise( async( resolve, reject ) => {
    
        try {
            
            if( !userId )
                reject( { message: `Invalid data: id = ${ userId }` } );

            const userById = await userStore.userById( userId );
            
            if( !userById ) 
                reject( { message: `Couldn't get - id doesn't exists.` } );

            resolve( userById );

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

const updateUser = ( userId, bodyUser ) => {

    return new Promise( async( resolve, reject ) => {
        
        try {

            if ( !userId || !bodyUser )
                reject( { message: `Invalid data: userId or bodyUser is undefined.` } );
            
            
            const [ result ] = await userStore.update( userId, bodyUser );
            
            result !== 0 && result
                ? resolve( 'Updated successfully' )
                : reject( `Couldn't update - id doesn't exists.` )
            

        } catch (error) {

            reject( { message: error } );
            
        }
        
    });

};

const deleteUser = ( userId ) => {

    return new Promise( async( resolve, reject ) => {
    
        try {
            
            if( !userId )
                reject( { message: `Invalid data: id is undefined.` } );

            const result = await userStore.delete( userId );

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