// Example starter JavaScript for disabling form submissions if there are invalid fields
( function ()
{
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll( '.needs-validation' )

    // Loop over them and prevent submission
    Array.prototype.slice.call( forms )
        .forEach( function ( form )
        {
            form.addEventListener( 'submit', function ( event )
            {
                if ( !form.checkValidity() ) {
                    event.preventDefault()
                    event.stopPropagation()
                }else{
                    RegistrarPersona();
                    event.preventDefault()
                }

                form.classList.add( 'was-validated' )
            }, false )
        } )
} )()


function RegistrarPersona(){
    let nombre = document.querySelector("#txtnombre").value;
    let apellidos = document.querySelector("#txtApellidos").value;
    let documento = document.querySelector("#txtdocumento").value;
    let telefono = document.querySelector("#txttelefono").value;
    let correo = document.querySelector("#txtcorreo").value;
    let ciudad = document.querySelector("#txtciudad").value;
    let direccion = document.querySelector("#txtdireccion").value;

    let url = `http://localhost:3000/clientes`;

    let datos = {
        nombre : nombre,
        apellidos: apellidos,
        documento: documento,
        telefono: telefono,
        correo: correo,
        ciudad: ciudad,
        direccion: direccion
    };

    fetch(url,{
        method: 'POST',
        body:JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    } ).then(res=>res.json())
    .then(mensaje=>{
        console.log(mensaje)
    })

    // alert("Todo full");
}
