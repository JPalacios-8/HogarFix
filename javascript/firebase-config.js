// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCQxzseGEIaVchjG8FfNdYWdUfdfFJEn_k",
  authDomain: "hogarfixapp.firebaseapp.com",
  projectId: "hogarfixapp",
  storageBucket: "hogarfixapp.appspot.com",
  messagingSenderId: "1094738031171",
  appId: "1:1094738031171:web:f1f565023e034780bbdaf6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
