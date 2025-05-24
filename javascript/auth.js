import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

import {
  doc,
  setDoc,
  getDoc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

export async function registrar(correo, contraseña, nombre, rol) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, correo, contraseña);
    const uid = cred.user.uid;

    await setDoc(doc(db, 'usuarios', uid), {
      uid,
      correo,
      nombre,
      rol
    });

    alert('¡Registro exitoso!');
    window.location.href = '../html/singin.html';
  } catch (e) {
    alert('Error al registrar: ' + e.message);
  }
}

export async function login(correo, contraseña) {
  try {
    const cred = await signInWithEmailAndPassword(auth, correo, contraseña);
    const uid = cred.user.uid;

    const userDoc = await getDoc(doc(db, 'usuarios', uid));
    const datos = userDoc.data();

    localStorage.setItem('usuario', JSON.stringify(datos));

    alert('Sesión iniciada');
    window.location.href = '../html/home.html';
  } catch (e) {
    alert('Error al iniciar sesión: ' + e.message);
  }
}
