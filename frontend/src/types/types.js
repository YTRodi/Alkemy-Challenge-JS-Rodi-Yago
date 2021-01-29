// Tipos de acciones que voy a tener.
export const types = {

    authCheckingFinish: '[auth] Finish checking login state', // Para cuando termine de verificar el token, hay que cambiar el state de 'checking' a false
    authStartLogin: '[auth] Start login', // Proceso asincrono para hacer el posteo y la autenticación
    authLogin: '[auth] Login', // Cuando ya tengamos la autenticación y queramos llamar algo para establecer la info del user
    authStartRegister: '[auth] Start register',
    authStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

};