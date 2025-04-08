import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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

const listaPresentes = [
  "Batedeira", "Liquidificador", "Cafeteira", "Torradeira",
  "Jogo de lençóis", "Jogo de lençóis", "Travesseiros", "Jogo de panela",
  "Fronhas avulsas", "Jogo de jantar", "Jogo de facas", "Jogo de talheres",
  "Varal de chão", "Jogo de toalhas", "Microondas", "Forno eletrônico",
  "Cesto de roupa", "Assadeiras (vidro)", "Edredom", "Cobre leito",
  "Potes herméticos (vidro)", "Jogo de taças", "Petisqueira",
  "Potes para mantimentos", "Galheteiros", "Açucareiro", "Saleiro",
  "Jogo de sobremesa", "Lixeira (cozinha)", "Escorredor de louça",
  "Ferro de passar roupas", "Chaleira", "Jarra elétrica", "Panos de copa",
  "Porta frios", "Ralador", "Porta temperos", "Mixer", "Tigelas",
  "Tapete bolinha para banheiro", "Ventilador", "Tábua de cortes",
  "Boleira", "Escorredor de macarrão", "Manteigueira", "Organizador de salada",
  "Garrafa térmica", "Forma de alumínio", "Jogo americano",
  "Tábua de passar roupa", "Mop", "Cuia", "Descanso de panelas",
  "Triturador", "Organizador de talheres"
];

const giftList = document.getElementById("gift-list");

function renderList(data) {
  giftList.innerHTML = "";
  listaPresentes.forEach((item, index) => {
    const reservadoPor = data && data[index] ? data[index].nome : "";
    const reservado = reservadoPor !== "";

    const itemDiv = document.createElement("div");
    itemDiv.className = "gift-item";

    const name = document.createElement("div");
    name.className = "gift-name";
    name.textContent = item;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Seu nome";
    input.value = reservadoPor;
    input.disabled = reservado;

    const button = document.createElement("button");
    button.textContent = reservado ? "Editar" : "Reservar";

    button.addEventListener("click", () => {
      if (reservado && input.disabled) {
        input.disabled = false;
        button.textContent = "Salvar";
      } else if (!input.value.trim()) {
        alert("Por favor, digite seu nome.");
      } else {
        set(ref(db, "reservas/" + index), { nome: input.value.trim() });
        input.disabled = true;
        button.textContent = "Editar";
      }
    });

    itemDiv.appendChild(name);
    itemDiv.appendChild(input);
    itemDiv.appendChild(button);

    giftList.appendChild(itemDiv);
  });
}

onValue(ref(db, "reservas"), (snapshot) => {
  const data = snapshot.val();
  renderList(data);
});
