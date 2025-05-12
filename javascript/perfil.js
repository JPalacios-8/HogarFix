// Cargar datos guardados al iniciar
window.onload = function () {
  const campos = ["nombre", "ubicacion", "telefono"];
  campos.forEach((id) => {
    const valorGuardado = localStorage.getItem(id);
    if (valorGuardado) {
      document.getElementById(id).textContent = valorGuardado;
    }
  });
};

function editarCampo(id) {
  const span = document.getElementById(id);
  const valorActual = span.textContent;

  // Crear input con valor actual
  const input = document.createElement("input");
  input.type = "text";
  input.value = valorActual;
  input.id = "input-" + id;

  // Crear botón Guardar
  const btnGuardar = document.createElement("button");
  btnGuardar.textContent = "Guardar";
  btnGuardar.onclick = function () {
    guardarCampo(id);
  };

  // Reemplazar contenido
  const contenedor = span.parentNode;
  contenedor.innerHTML = "";
  contenedor.appendChild(document.createTextNode(id.charAt(0).toUpperCase() + id.slice(1) + ": "));
  contenedor.appendChild(input);
  contenedor.appendChild(btnGuardar);
}

function guardarCampo(id) {
  const input = document.getElementById("input-" + id);
  const nuevoValor = input.value;

  // Guardar en localStorage
  localStorage.setItem(id, nuevoValor);

  // Restaurar vista normal
  const span = document.createElement("span");
  span.id = id;
  span.textContent = nuevoValor;

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.onclick = function () {
    editarCampo(id);
  };

  const contenedor = input.parentNode;
  contenedor.innerHTML = "";
  contenedor.appendChild(document.createTextNode(id.charAt(0).toUpperCase() + id.slice(1) + ": "));
  contenedor.appendChild(span);
  contenedor.appendChild(btnEditar);
}
