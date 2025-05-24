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

test('Login con credenciales válidas en Firebase', async () => {
  const email = 'proveedor@hogarfix.com';  // Debe existir en tu Firebase Auth
  const password = '123456';               // Contraseña real del usuario

  const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

  expect(userCredential.user).not.toBeNull();
  expect(userCredential.user.email).toBe(email);
}, 10000);
