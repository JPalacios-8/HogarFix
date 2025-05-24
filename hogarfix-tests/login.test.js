
const firebase = require('firebase/compat/app');
require('firebase/compat/auth');

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

test('Login con credenciales válidas en Firebase', async () => {
  const email = 'proveedor@hogarfix.com';
  const password = '123456';

  const userCredential = await auth.signInWithEmailAndPassword(email, password);

  expect(userCredential.user).not.toBeNull();
  expect(userCredential.user.email).toBe(email);
}, 10000);

test('Login con contraseña incorrecta debe fallar', async () => {
  const email = 'proveedor@hogarfix.com';
  const password = 'incorrecta123';

  try {
    await auth.signInWithEmailAndPassword(email, password);
    throw new Error('El login no falló como se esperaba');
  } catch (error) {
    expect(error.code.startsWith('auth/')).toBe(true);
  }
}, 10000);

test('Registro con correo ya usado debe fallar', async () => {
  const email = 'proveedor@hogarfix.com';
  const password = 'nuevacontra123';

  try {
    await auth.createUserWithEmailAndPassword(email, password);
    throw new Error('El registro no falló como se esperaba');
  } catch (error) {
    expect(error.code).toBe('auth/email-already-in-use');
  }
}, 10000);
