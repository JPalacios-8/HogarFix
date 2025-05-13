function guardarProveedor(event) {
    event.preventDefault();
    const proveedor = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      nombre: document.getElementById("nombre").value,
      cc: document.getElementById("cc").value,
      ciudad: document.getElementById("ciudad").value,
      celular: document.getElementById("celular").value,
    };
  
   
    localStorage.setItem("proveedorRegistrado", JSON.stringify(proveedor));
  
  const mensaje = document.getElementById("mensaje-exito");
  mensaje.textContent = "¡Registrado exitosamente!";

  document.querySelector("form").reset();

  setTimeout(() => {
    window.location.href = "informacion_proveedor.html";
  }, 2000);
  
  }