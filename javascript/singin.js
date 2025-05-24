import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function login(event) {
  event.preventDefault();

  const email = document.getElementById("user").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const mensajeError = document.getElementById("mensaje-error");

  try {
    
    const credenciales = await signInWithEmailAndPassword(auth, email, password);
    const uid = credenciales.user.uid;

    const docUsuario = await getDoc(doc(db, "usuarios", uid));
    const docProveedor = await getDoc(doc(db, "proveedores", uid));

    if (docUsuario.exists()) {
      mostrarToast("Inicio de sesión como Usuario...");
      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    } else if (docProveedor.exists()) {
      mostrarToast("Inicio de sesión como Proveedor...");
      setTimeout(() => {
        window.location.href = "informacion_proveedor.html";
      }, 2000);
    } else {
      mensajeError.textContent = "Tu cuenta no está registrada correctamente en Firestore.";
    }

  } catch (error) {
    console.error("Error login:", error.message);
    mensajeError.textContent = "Correo o contraseña incorrectos o usuario no existe.";
  }
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("mensaje-toast");
  toast.textContent = mensaje;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 1000);
}

document.getElementById("form-login").addEventListener("submit", login);



// Conectar el formulario con el login
document.getElementById("form-login").addEventListener("submit", login);


const btnOlvido = document.querySelector(".btn-olvido");
const contenedorRecuperacion = document.querySelector(".recuperar-contrasena-container");
const inputEmailRecuperar = document.getElementById("email-recuperar");
const btnEnviarRecuperacion = document.getElementById("btn-enviar-recuperacion");
const btnCancelarRecuperacion = document.getElementById("btn-cancelar-recuperacion");
const mensajeRecuperacion = document.getElementById("mensaje-recuperacion");

// Mostrar formulario recuperación
btnOlvido.addEventListener("click", () => {
  contenedorRecuperacion.style.display = "block";
  mensajeRecuperacion.textContent = "";
  inputEmailRecuperar.value = "";
});

// Cancelar recuperación
btnCancelarRecuperacion.addEventListener("click", () => {
  contenedorRecuperacion.style.display = "none";
  mensajeRecuperacion.textContent = "";
});

// Enviar correo recuperación
btnEnviarRecuperacion.addEventListener("click", async () => {
  const email = inputEmailRecuperar.value.trim().toLowerCase();

  if (!email) {
    mensajeRecuperacion.textContent = "Por favor, ingresa un correo válido.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    mensajeRecuperacion.style.color = "green";
    mensajeRecuperacion.textContent = "¡Enlace de recuperación enviado! Revisa tu correo.";
  } catch (error) {
    mensajeRecuperacion.style.color = "red";
    mensajeRecuperacion.textContent = "Error: " + error.message;
  }
});


document.getElementById("form-login").addEventListener("submit", login);
