import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function guardarUsuario(event) {
  event.preventDefault();

  // Obtener valores de los inputs
  const emailInput = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const nombre = document.getElementById("nombre").value;
  const cc = document.getElementById("cc").value;
  const ciudad = document.getElementById("ciudad").value;
  const celular = document.getElementById("celular").value;

  // Validación básica
  if (!emailInput || !password || !nombre || !cc || !ciudad || !celular) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Si el usuario escribe un número, lo convertimos a formato de correo
  const isPhone = /^[0-9]{10,}$/.test(emailInput);
  const emailFormatted = isPhone ? `${emailInput}@hogarfixapp.com` : emailInput;

  try {
    // ✅ Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, emailFormatted, password);
    const user = userCredential.user;

    // ✅ Guardar datos adicionales en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre,
      cc,
      ciudad,
      celular,
      email: emailFormatted
    });

    alert("¡Registro exitoso!");
    document.querySelector("form").reset();
    setTimeout(() => {
      window.location.href = "singin.html";
    }, 1500);

  } catch (error) {
    console.error("Error en registro:", error);
    alert("Error al registrar: " + error.message);
  }
}

document.getElementById("formulario-usuario").addEventListener("submit", guardarUsuario);
