
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const listaRef = ref(database, 'presentes');

const itens = [
  "Jogo de pratos",
  "Liquidificador",
  "Toalhas de banho",
  "Jogo de panelas",
  "Conjunto de copos"
];

const listaDiv = document.getElementById('lista');

function renderLista(reservas = {}) {
  listaDiv.innerHTML = "";
  itens.forEach((item, index) => {
    const nomeSalvo = reservas[index] || "";
    const itemDiv = document.createElement('div');
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <strong>${item}</strong><br>
      <input type="text" id="nome-${index}" placeholder="Seu nome" ${nomeSalvo ? 'disabled' : ''} value="${nomeSalvo}">
      <button onclick="reservarItem(${index})" ${nomeSalvo ? 'disabled' : ''}>Quero esse</button>
      <span class="reservado">${nomeSalvo ? `Reservado por ${nomeSalvo}` : ''}</span>
    `;
    listaDiv.appendChild(itemDiv);
  });
}

window.reservarItem = function(index) {
  const nomeInput = document.getElementById(`nome-${index}`);
  const nome = nomeInput.value.trim();
  if (!nome) {
    alert("Por favor, digite seu nome!");
    return;
  }
  set(ref(database, `presentes/${index}`), nome);
};

onValue(listaRef, (snapshot) => {
  const data = snapshot.val() || {};
  renderLista(data);
});
