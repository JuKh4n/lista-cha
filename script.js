import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzQSqbRcIyhnDhCo0wPMM3IRFYPJbBrB8",
  authDomain: "lista-cha.firebaseapp.com",
  databaseURL: "https://lista-cha-default-rtdb.firebaseio.com",
  projectId: "lista-cha",
  storageBucket: "lista-cha.appspot.com",
  messagingSenderId: "662121713326",
  appId: "1:662121713326:web:e5a2d5291085dcfb0ae73f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const listaPresentes = [
  "Batedeira", "Liquidificador", "Cafeteira", "Torradeira",
  "Jogo de lençóis", "Jogo de lençóis", "Travesseiros", "Jogo de panela",
  "Fronhas avulsas", "Jogo de jantar", "Jogo de facas", "Jogo de talheres",
  "Varal de chão", "Jogo de toalhas", "Microondas", "Forno eletrônico",
  "Cesto de roupa", "Assadeiras (vidro)", "Edredom", "Cobre leito",
  "Potes herméticos (vidro)", "Jogo de taças", "Petisqueira", "Potes para mantimentos",
  "Galheteiros", "Açucareiro", "Saleiro", "Jogo de sobremesa",
  "Lixeira (cozinha)", "Escorredor de louça", "Ferro de passar roupas", "Chaleira",
  "Jarra elétrica", "Panos de copa", "Porta frios", "Ralador",
  "Porta temperos", "Mixer", "Tigelas", "Tapete bolinha para banheiro",
  "Ventilador", "Tábua de cortes", "Boleira", "Escorredor de macarrão",
  "Manteigueira", "Organizador de salada", "Garrafa térmica", "Forma de alumínio",
  "Jogo americano", "Tábua de passar roupa", "Mop", "Cuia",
  "Descanso de panelas", "Triturador", "Organizador de talheres"
];

const listaContainer = document.getElementById("lista");

function renderizarLista(dadosReservas = {}) {
  listaContainer.innerHTML = "";

  listaPresentes.forEach((item, index) => {
    const reserva = dadosReservas[index] || {};
    const reservado = reserva.nome && reserva.nome.trim() !== "";

    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const nomeItem = document.createElement("span");
    nomeItem.textContent = item;
    nomeItem.className = "item-nome";

    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.placeholder = "Seu nome";
    inputNome.value = reserva.nome || "";
    inputNome.disabled = reservado;

    const botao = document.createElement("button");
    botao.textContent = reservado ? "Editar" : "Reservar";

    botao.addEventListener("click", () => {
      if (reservado) {
        inputNome.disabled = false;
        botao.textContent = "Salvar";
        reservado = false;
      } else if (botao.textContent === "Salvar") {
        const nome = inputNome.value.trim();
        if (nome === "") {
          alert("Por favor, digite seu nome para reservar.");
          return;
        }
        set(ref(database, "reservas/" + index), { nome });
        inputNome.disabled = true;
        botao.textContent = "Editar";
      } else {
        const nome = inputNome.value.trim();
        if (nome === "") {
          alert("Por favor, digite seu nome para reservar.");
          return;
        }
        set(ref(database, "reservas/" + index), { nome });
        inputNome.disabled = true;
        botao.textContent = "Editar";
      }
    });

    itemDiv.appendChild(nomeItem);
    itemDiv.appendChild(inputNome);
    itemDiv.appendChild(botao);
    listaContainer.appendChild(itemDiv);
  });
}

// Escuta o Firebase e atualiza a lista em tempo real
onValue(ref(database, "reservas"), (snapshot) => {
  const data = snapshot.val() || {};
  renderizarLista(data);
});
