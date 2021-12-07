(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation")

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      'submit',
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          RegistrarCliente();
          event.preventDefault()
        }

        form.classList.add('was-validated')
      },
      false
    );
  });
})();

function RegistrarCliente() {
  // alert("Todo super")
  let nombre = document.querySelector("#txtNombre").value;
  let apellidos = document.querySelector("#txtApellidos").value;
  let telefono = document.querySelector("#txtPhone").value;
  let correo = document.querySelector("#txtEmail").value;
  let ciudad = document.querySelector("#txtCity").value;
  let direccion = document.querySelector("#txtAddress").value;


  let url = `localhost:3000/clientes`;
  let datos = {
    nombre: nombre,
    apellidos: apellidos,
    telefono: telefono,
    correo: correo,
    ciudad: ciudad,
    direccion : direccion

  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(mensaje => {
      console.log(mensaje)
    })
 }
