
const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCQxzseGEIaVchjG8FfNdYWdUfdfFJEn_k",
  authDomain: "hogarfixapp.firebaseapp.com",
  projectId: "hogarfixapp",
  storageBucket: "hogarfixapp.appspot.com",
  messagingSenderId: "1094738031171",
  appId: "1:1094738031171:web:f1f565023e034780bbdaf6"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

test('Integración: registro, login y verificación en Firestore', async () => {
  const timestamp = Date.now();
  const email = `testuser${timestamp}@hogarfix.com`;
  const password = 'test123456';
  const nombre = 'Usuario Test';
  const rol = 'proveedor';

  // 1. Registrar usuario
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  const uid = cred.user.uid;

  // 2. Guardar en Firestore
  await db.collection('usuarios').doc(uid).set({
    uid,
    correo: email,
    nombre,
    rol
  });

  // 3. Login
  const loginCred = await auth.signInWithEmailAndPassword(email, password);
  expect(loginCred.user.email).toBe(email);

  // 4. Leer Firestore
  const doc = await db.collection('usuarios').doc(uid).get();
  const data = doc.data();

  expect(data).toBeDefined();
  expect(data.nombre).toBe(nombre);
  expect(data.rol).toBe(rol);
}, 20000);
