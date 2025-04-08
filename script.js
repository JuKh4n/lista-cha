// === Firebase Configuração ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
const db = getDatabase(app);
const listaRef = ref(db, 'itens');

// === Lista de Presentes ===
const itens = [
  "Batedeira",
  "Liquidificador",
  "Cafeteira",
  "Torradeira",
  "Jogo de lençóis",
  "Jogo de lençóis 2",
  "Travesseiros",
  "Jogo de panela",
  "Fronhas avulsas",
  "Jogo de jantar",
  "Jogo de facas",
  "Jogo de talheres",
  "Varal de chão",
  "Jogo de toalhas",
  "Microondas",
  "Forno eletrônico",
  "Cesto de roupa",
  "Assadeiras (vidro)",
  "Edredom",
  "Cobre leito",
  "Potes herméticos (vidro)",
  "Jogo de taças",
  "Petisqueira",
  "Potes para mantimentos",
  "Galheteiros",
  "Açucareiro",
  "Saleiro",
  "Jogo de sobremesa",
  "Lixeira (cozinha)",
  "Escorredor de louça",
  "Ferro de passar roupas",
  "Chaleira",
  "Jarra elétrica",
  "Panos de copa",
  "Porta frios",
  "Ralador",
  "Porta temperos",
  "Mixer",
  "Tigelas",
  "Tapete bolinha para banheiro",
  "Ventilador",
  "Tábua de cortes",
  "Boleira",
  "Escorredor de macarrão",
  "Manteigueira",
  "Organizador de salada",
  "Garrafa térmica",
  "Forma de alumínio",
  "Jogo americano",
  "Tábua de passar roupa",
  "Mop",
  "Cuia",
  "Descanso de panelas",
  "Triturador",
  "Organizador de talheres"
];

// === Carregar HTML ===
const listaContainer = document.getElementById("lista");

function renderLista(reservas = {}) {
  listaContainer.innerHTML = "";

  itens.forEach((item) => {
    const nomeReservado = reservas[item] || "";
    const reservado = nomeReservado.trim() !== "";

    const div = document.createElement("div");
    div.className = "item";

    const h3 = document.createElement("h3");
    h3.textContent = item;
    div.appendChild(h3);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = reservado ? "Reservado por: " + nomeReservado : "Digite seu nome";
    input.value = reservado ? nomeReservado : "";
    input.disabled = reservado;
    div.appendChild(input);

    const botao = document.createElement("button");
    botao.textContent = reservado ? "Editar" : "Reservar";

    botao.addEventListener("click", () => {
      if (reservado && botao.textContent === "Editar") {
        input.disabled = false;
        input.focus();
        botao.textContent = "Salvar";
      } else if (botao.textContent === "Salvar" || !reservado) {
        const nome = input.value.trim();
        if (nome === "") {
          alert("Por favor, insira um nome para reservar.");
          return;
        }
        set(ref(db, `itens/${item}`), nome).then(() => {
          input.disabled = true;
          botao.textContent = "Editar";
        });
      }
    });

    div.appendChild(botao);
    listaContainer.appendChild(div);
  });
}

onValue(listaRef, (snapshot) => {
  const data = snapshot.val() || {};
  renderLista(data);
});

