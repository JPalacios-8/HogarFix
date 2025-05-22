import { auth, db } from "../firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const mensaje = document.getElementById("mensaje-exito");

window.guardarProveedor = async function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const cc = document.getElementById("cc").value;
  const ciudad = document.getElementById("ciudad").value;
  const email = document.getElementById("email").value;
  const celular = document.getElementById("celular").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "proveedores", uid), {
      nombre,
      cc,
      ciudad,
      email,
      celular
    });

    mensaje.textContent = "¡Proveedor registrado exitosamente!";
    document.querySelector("form").reset();

    setTimeout(() => {
      window.location.href = "singin.html";
    }, 2000);
  } catch (error) {
    console.error("Error en el registro:", error);
    mensaje.textContent = "Error: " + error.message;
  }
};
