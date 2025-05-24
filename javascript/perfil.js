import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const nombreElem = document.getElementById("nombre");
  const ubicacionElem = document.getElementById("ubicacion");
  const telefonoElem = document.getElementById("telefono");
  const emailElem = document.getElementById("email");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Colocar email directamente
      emailElem.textContent = user.email || "No disponible";

      // Obtener datos desde Firestore
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        nombreElem.textContent = data.nombre || "No disponible";
        ubicacionElem.textContent = data.ubicacion || "No disponible";
        telefonoElem.textContent = data.telefono || "No disponible";
      } else {
        nombreElem.textContent = "No registrado";
        ubicacionElem.textContent = "No registrado";
        telefonoElem.textContent = "No registrado";
      }
    } else {
      // No hay usuario logueado
      nombreElem.textContent = "No autenticado";
      ubicacionElem.textContent = "No autenticado";
      telefonoElem.textContent = "No autenticado";
      emailElem.textContent = "No autenticado";
    }
  });

  // Tu código actual para la foto (puedes mantenerlo igual)
  const inputImagen = document.getElementById("input-foto");
  const imgPreview = document.getElementById("img-preview");
  const btnEliminar = document.getElementById("btn-eliminar");

  const imagenGuardada = localStorage.getItem("fotoPerfil");
  if (imagenGuardada && imgPreview) {
    imgPreview.src = imagenGuardada;
  }

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

  if (btnEliminar && imgPreview) {
    btnEliminar.addEventListener("click", () => {
      localStorage.removeItem("fotoPerfil");
      imgPreview.src = "../imagenes/perfil-imagen.png"; // Imagen por defecto
      inputImagen.value = ""; // Limpia input
    });
  }
});
