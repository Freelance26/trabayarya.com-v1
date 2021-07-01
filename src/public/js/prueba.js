/*var checkbox = document.getElementById('checktest1');
checkbox.addEventListener("change", validaCheckbox, false);
  
function validaCheckbox(){
  var checked = checkbox.checked;
  if(checked){
    alert('checkbox esta seleccionado');
    console.log('checkbox esta seleccionado');
  }
}


$('input[name="mycheckbox"]').on('change', function(e){
    if(this.checked){
        console.log('Checkbox'+ $(e.currentTarget).id() + $(e.currentTarget).val() + 'Seleccionado');
    } else {
        console.log('Checkbox' + $(e.currentTarget).val() + 'Deseleccionado')
    }
});


$('input[name="mycheckbox"]').each(function(){
    console.log( this.value + ' : ' + this.checked);
});

let urlActual = 'http://localhost:4000/lista-trabajos/1'
var checkboxes = document.querySelectorAll("input[type=checkbox][name=category-checkbox]")
let checkboxselect = []

checkboxes.forEach(function(checkbox){
    checkbox.addEventListener('change', function() {
        checkboxselect = Array.from(checkboxes).filter(i => i.checked).map(i => i.value.replace(/\s+/g, '+'))
        for(i = 0; i < checkboxselect.length; i++){
            console.log(checkboxselect[i])            
        }
            const datosUnidos = checkboxselect.join('&&')
            const direccionar = window.location.href+'?valorcheckbox='+datosUnidos
            location.href = urlActual
            console.log(urlActual)
            location.href = direccionar
    })
});
*/
const checkBoxCategorias = document.querySelectorAll("input[type=checkbox][name=category-checkbox]")
let checkboxselect = []

const enviarDatosCheck = () => {
    checkBoxCategorias.forEach(function(checkBoxCategorias){
        checkboxselect = Array.from(checkBoxCategorias).filter(i => i.checked).map(i => i.value.replace(/\s+/g,'+'))
        for(i = 0; i < checkboxselect.length; i++){
            // console.log(checkboxselect[i])
        }
   
    })
}

checkBoxCategorias.addEventListener('change', enviarDatosCheck);