
const helpers = {};

helpers.randomNumber = ( ) => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomNumber = 0;
    for(let i = 0; i< 6; i++){
       randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber;
}

helpers.eliminarUser = ( ) => {
    document.addEventListener('DOMContentLoaded', () => {

    })

    const usersListado = document.querySelector(".panel-user")
}

module.exports = helpers;