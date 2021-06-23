//  Registro
const nombreRegistro = document.getElementById('rd-navbar-register-name');
const correoRegistro = document.getElementById('rd-navbar-register-email');
const passRegisgtro = document.getElementById('rd-navbar-register-password');
const passConfRegistro = document.getElementById('rd-navbar-register-password-confirm');
const btnRegistro = document.getElementById('btn-registro');
const btnMenuRegistro = document.getElementById('btn-menu-registrarse');

const btnMenuInicioSesion = document.getElementById('btn-menu-iniciar-sesion');
const btnMenuCerrarSesion = document.getElementById('btn-menu-cerrar-sesion');
const msjErrorRegistro = document.getElementById('mensaje-error-registro');

//  Modal
const modal = document.querySelector('.nuevoModal');
const btnRecuperarPass = document.getElementById('btn-recuperar-contraseña');
const correoRecuperarPass = document.getElementById('correo-recuperar-contraseña');
const instruccionesModal = document.getElementById('instrucciones-contraseña-modal');

//  Inicio Sesion
const correoInicioSesion = document.getElementById('rd-navbar-login-email');
const passwordInicioSesion = document.getElementById('rd-navbar-login-password');
const btnInicioSesion = document.getElementById('btn-inicio-sesion');
const msjErrorLogin = document.getElementById('mensaje-error-login');
const linkOlvideContraseña = document.querySelector('.link-olvide-contraseña');



const url = 'https://freelance26-api.herokuapp.com';

state = {

}

if(sessionStorage.sesion == 'true'){
    btnMenuCerrarSesion.style.display = 'block';
    btnMenuInicioSesion.style.display = 'none';
    btnMenuRegistro.style.display = 'none';
}

const registrarUsuario = (e) => {
    e.preventDefault();
    if(passRegisgtro.value != passConfRegistro.value){
        return msjErrorRegistro.style.display = 'block';
    }
    const data ={
        nombre: nombreRegistro.value,
        email: correoRegistro.value,
        password: passRegisgtro.value
    }
    const options = {
        method: 'POST',
        headers: {
           Accept: 'application/json',
            'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    };
        fetch(`${url}/api/v1/auth/registro`, options)
        .then(data => {
        return data.json()
            }).then(res => {
                if(res.success == true){
                    sessionStorage.setItem('token', res.token);
                    sessionStorage.setItem('sesion', true);
                    location.reload();
                }else{
                    msjErrorRegistro.innerHTML = 'Este correo esta registrado';
                    msjErrorRegistro.style = 'display: block; color: red';
                    passRegisgtro.value = '';
                    passConfRegistro.value = '';

                }
        })
}

const iniciarSesion = (e) => {
    e.preventDefault();
    const data ={
        email: correoInicioSesion.value,
        password: passwordInicioSesion.value
    }
    const options = {
        method: 'POST',
        headers: {
           Accept: 'application/json',
            'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    };
        fetch(`${url}/api/v1/auth/login`, options)
        .then(data => {
        return data.json()
            }).then(res => {
                if(res.success == true){
                    sessionStorage.setItem('token', res.token);
                    sessionStorage.setItem('sesion', true);
                    location.reload();
                }else{
                    msjErrorLogin.innerHTML = 'Credenciales invalidas';
                    msjErrorLogin.style = 'display: block; color: red';
                    passwordInicioSesion.value = '';

                }
        })
}

const cerrarSesion = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    location.reload();
}

const abrirModal = () => {
        modal.style.display = 'block';          
}

const cerrarModal = (e) =>{
    if(e.target.matches('span') || e.target.matches('div.nuevoModal')){
        modal.style.display = 'none';
    }
}

const validarCorreo = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const recuperarPass = () => {
    if(validarCorreo(correoRecuperarPass.value)){
        btnRecuperarPass.style.display = 'none';
        instruccionesModal.innerHTML = 'Enviando Correo...';

        const data ={
            email: correoRecuperarPass.value
        }
        const options = {
            method: 'POST',
            headers: {
               Accept: 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        };
            fetch(`${url}/api/v1/auth/forgotpassword`, options)
            .then(data => {
            return data.json()
                }).then(res => {
                    if(res.success == true){
                        instruccionesModal.innerHTML = 'Correo enviado, sigas las instrucciones indicadas en el mismo';
                        correoRecuperarPass.value = '';
                        console.log(res)
                    }else{
                        console.log('!' + res)
    
                    }
            })
    }else{
        instruccionesModal.innerHTML = 'Correo inválido';
    }
}




//  Event Listeners
btnRegistro.addEventListener('click', registrarUsuario);
btnInicioSesion.addEventListener('click', iniciarSesion);
btnMenuCerrarSesion.addEventListener('click', cerrarSesion);
modal.addEventListener('click', cerrarModal);
linkOlvideContraseña.addEventListener('click', abrirModal);
btnRecuperarPass.addEventListener('click', recuperarPass)