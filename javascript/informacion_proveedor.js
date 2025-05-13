function guardarInformacion(event) {
  event.preventDefault();

  const especialidad = document.getElementById('especialidad').value;
  const descripcion = document.getElementById('descripcion').value.trim();

  if (!especialidad || !descripcion) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const proveedorExistente = JSON.parse(localStorage.getItem('proveedor')) || {};
  
  proveedorExistente.especialidad = especialidad;
  proveedorExistente.descripcion = descripcion;

  localStorage.setItem('proveedor', JSON.stringify(proveedorExistente));

  document.getElementById('mensaje-final').textContent = "¡Información guardada con éxito!";
}
