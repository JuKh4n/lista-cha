const itens = [
  "Jogo de pratos",
  "Liquidificador",
  "Toalhas de banho",
  "Jogo de panelas",
  "Conjunto de copos"
];

const lista = document.getElementById("lista-presentes");

function criarItem(nome, index) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${nome}</span>
    <input type="text" placeholder="Seu nome" id="nome-${index}" />
    <button onclick="reservarItem(${index})">Reservar</button>
    <span class="reservado" id="reservado-${index}"></span>
  `;
  lista.appendChild(li);
}

// Inicializar a lista
itens.forEach((item, index) => {
  criarItem(item, index);
});

// Firebase (exemplo simples)
const database = firebase.database();
const reservasRef = database.ref("reservas");

function reservarItem(index) {
  const nome = document.getElementById(`nome-${index}`).value;
  if (nome.trim() === "") {
    alert("Digite seu nome para reservar!");
    return;
  }

  reservasRef.child(index).set(nome);

  document.getElementById(`reservado-${index}`).innerText = `Reservado por: ${nome}`;
}
