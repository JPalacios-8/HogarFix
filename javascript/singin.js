function login(event) 
{
    event.preventDefault();
    const userInput = document.getElementById("user").value;
    const passwordIngresado = document.getElementById("password").value;
    const mensajeError = document.getElementById("mensaje-error");
  
    // Obtener datos del usuario registrado
    const datosGuardados = localStorage.getItem("usuarioRegistrado");
  
    if (!datosGuardados) {
      alert("No hay usuarios registrados.");
      return;
    }
  
    const usuario = JSON.parse(datosGuardados);
  
    // Validar email y contraseña
    const usuarioValido = 
    (usuario.email === userInput || usuario.celular === userInput) &&
    usuario.password === passwordIngresado;

  if (usuarioValido) {
    alert("¡Inicio de sesión exitoso!");
    window.location.href = "home.html";
  } else {
    alert("Correo, celular o contraseña incorrectos.");
  }
  }