// Tipos de acciones que voy a tener.
export const types = {

    authChecking: '[auth] Checking login state', // Lo voy a usar para verificar si el user esta autenticado o no.
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login', // Proceso asincrono para hacer el posteo y la autenticación
    authLogin: '[auth] Login', // Cuando ya tengamos la autenticación y queramos llamar algo para establecer la info del user
    authStartRegister: '[auth] Start register',
    authStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

};