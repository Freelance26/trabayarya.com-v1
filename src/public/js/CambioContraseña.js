const btnCambioPass = document.getElementById('btn-cambio-contraseña');
const nuevaContraseña = document.getElementById('new-pass');
const tokenSeguridad = document.getElementById('token');
const msj = document.getElementById('msj-cambio');
const url = 'https://freelance26-api.herokuapp.com';

const enviarNuevaContraseña = (e) => {
    e.preventDefault();
    //if(nuevaContraseña.value !== '' || tokenSeguridad.value !== ''){
        msj.innerHTML = 'Cambiando contraseña...';
        btnCambioPass.style.display = 'none';
        const data ={
            password: nuevaContraseña.value
        }
        const options = {
            method: 'PUT',
            headers: {
               Accept: 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        };
            fetch(`${url}/api/v1/auth/resetpassword/${tokenSeguridad.value}`, options)
            .then(data => {
            return data.json()
                }).then(res => {
                    if(res.success == true){
                        msj.innerHTML = 'Contraseña cambiada exitosamente';
                    }else{
                        nuevaContraseña.value = '';
                        tokenSeguridad.value = '';
                        msj.innerHTML = 'El token ha expirado';
                        btnCambioPass.style.display = 'block';
                    }
            })
   // }else{

       // msj.innerHTML = 'Por favor llene los campos';
    

    
}

//  EventListeners
btnCambioPass.addEventListener('click', enviarNuevaContraseña)