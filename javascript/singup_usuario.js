
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function guardarUsuario(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const nombre = document.getElementById("nombre").value;
  const cc = document.getElementById("cc").value;
  const ciudad = document.getElementById("ciudad").value;
  const celular = document.getElementById("celular").value;

  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre,
      cc,
      ciudad,
      celular,
      email
    });

    // Mostrar mensaje y redirigir
    document.getElementById("mensaje-exito").textContent = "¡Registrado exitosamente!";
    document.querySelector("form").reset();

    setTimeout(() => {
      window.location.href = "singin.html";
    }, 2000);

  } catch (error) {
    alert("Error al registrar: " + error.message);
  }
}
