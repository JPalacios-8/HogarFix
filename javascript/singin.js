import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function login(event) {
  event.preventDefault();

  const userInput = document.getElementById("user").value.trim();
  const password = document.getElementById("password").value;
  const mensajeError = document.getElementById("mensaje-error");

  try {
    const isPhone = /^[0-9]{10,}$/.test(userInput);
    const emailFormatted = isPhone ? `${userInput}@hogarfixapp.com` : userInput;

    const signInMethods = await fetchSignInMethodsForEmail(auth, emailFormatted);
    if (signInMethods.length === 0) {
      mensajeError.textContent = "Este usuario no existe.";
      return;
    }
    
    const credenciales = await signInWithEmailAndPassword(auth, emailFormatted, password);
    const uid = credenciales.user.uid;

    const docUsuario = await getDoc(doc(db, "usuarios", uid));
    const docProveedor = await getDoc(doc(db, "proveedores", uid));

    if (docUsuario.exists()) {
      alert("¡Inicio de sesión como Usuario exitoso!");
      window.location.href = "home.html";
    } else if (docProveedor.exists()) {
      alert("¡Inicio de sesión como Proveedor exitoso!");
      window.location.href = "informacion_proveedor.html";
    } else {
      mensajeError.textContent = "Tu cuenta no está registrada correctamente.";
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    mensajeError.textContent = "Correo, celular o contraseña incorrectos.";
  }
}

// Conectar el formulario con el login
document.getElementById("form-login").addEventListener("submit", login);

// Funcionalidad de "Olvidé mi contraseña"
document.querySelector(".btn-olvido").addEventListener("click", async () => {
  const email = prompt("Introduce tu correo registrado:");
  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Se ha enviado un enlace de recuperación a tu correo.");
    } catch (error) {
      alert("Error al enviar correo: " + error.message);
    }
  }
});
