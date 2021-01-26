const userStore = require( './userStore' );

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
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser: deleteUser
}