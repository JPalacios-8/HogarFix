document.addEventListener("DOMContentLoaded", () => {
  const isPerfil = window.location.pathname.includes("perfil.html");
  const isMiPerfil = window.location.pathname.includes("miPerfil.html");

  if (isPerfil) {
    // Botón para ir a miPerfil.html
    const botonInicio = document.querySelector(".btn-inicio");
    if (botonInicio) {
      botonInicio.addEventListener("click", () => {
        window.location.href = "miPerfil.html";
      });
    }
  }

  if (isMiPerfil) {
    const inputImagen = document.getElementById("input-foto");
    const imgPreview = document.getElementById("img-preview");
    const btnEliminar = document.getElementById("btn-eliminar");

    // Cargar imagen guardada en localStorage
    const imagenGuardada = localStorage.getItem("fotoPerfil");
    if (imagenGuardada && imgPreview) {
      imgPreview.src = imagenGuardada;
    }

    // Escuchar cambios en input de archivo
    if (inputImagen && imgPreview) {
      inputImagen.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            imgPreview.src = event.target.result;
            localStorage.setItem("fotoPerfil", event.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Eliminar imagen
    if (btnEliminar && imgPreview) {
      btnEliminar.addEventListener("click", () => {
        localStorage.removeItem("fotoPerfil");
        imgPreview.src = "perfil-imagen.png"; // Imagen por defecto
        inputImagen.value = ""; // Limpia input
      });
    }
  }
});
