import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
} from "firebase/database";

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
  "Batedeira", "Liquidificador", "Cafeteira", "Torradeira", "Jogo de lençóis",
  "Jogo de lençóis", "Travesseiros", "Jogo de panela", "Fronhas avulsas", "Jogo de jantar",
  "Jogo de facas", "Jogo de talheres", "Varal de chão", "Jogo de toalhas", "Microondas",
  "Forno eletrônico", "Cesto de roupa", "Assadeiras (vidro)", "Edredom", "Cobre leito",
  "Potes herméticos (vidro)", "Jogo de taças", "Petisqueira", "Potes para mantimentos", "Galheteiros",
  "Açucareiro", "Saleiro", "Jogo de sobremesa", "Lixeira (cozinha)", "Escorredor de louça",
  "Ferro de passar roupas", "Chaleira", "Jarra elétrica", "Panos de copa", "Porta frios",
  "Ralador", "Porta temperos", "Mixer", "Tigelas", "Tapete bolinha para banheiro",
  "Ventilador", "Tábua de cortes", "Boleira", "Escorredor de macarrão", "Manteigueira",
  "Organizador de salada", "Garrafa térmica", "Forma de alumínio", "Jogo americano", "Tábua de passar roupa",
  "Mop", "Cuia", "Descanso de panelas", "Triturador", "Organizador de talheres"
];

const listaContainer = document.getElementById("lista");

function criarItem(nomeItem, reservadoPor = "") {
  const li = document.createElement("li");
  li.className = reservadoPor ? "reservado" : "";

  const span = document.createElement("span");
  span.textContent = `${nomeItem} ${reservadoPor ? ` - Reservado por: ${reservadoPor}` : ""}`;
  li.appendChild(span);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Seu nome";
  input.value = reservadoPor;
  input.disabled = !!reservadoPor;
  li.appendChild(input);

  const botao = document.createElement("button");
  botao.textContent = reservadoPor ? "Editar" : "Reservar";
  li.appendChild(botao);

  botao.addEventListener("click", () => {
    const nomeDigitado = input.value.trim();
    const itemRef = ref(db, `reservas/${nomeItem}`);

    if (botao.textContent === "Reservar") {
      if (!nomeDigitado) return alert("Por favor, digite seu nome.");
      set(itemRef, nomeDigitado);
    } else if (botao.textContent === "Editar") {
      input.disabled = false;
      botao.textContent = "Salvar";
    } else if (botao.textContent === "Salvar") {
      if (!nomeDigitado) return alert("Por favor, digite seu nome.");
      update(itemRef, nomeDigitado).then(() => {
        input.disabled = true;
        botao.textContent = "Editar";
      });
    }
  });

  listaContainer.appendChild(li);
}

function carregarLista(reservas) {
  listaContainer.innerHTML = "";
  listaPresentes.forEach((item, index) => {
    // Se houver item repetido, adiciona número ao final
    const chaveItem = listaPresentes.indexOf(item) !== index ? `${item} ${index + 1}` : item;
    criarItem(item, reservas?.[chaveItem] || "");
  });
}

const reservasRef = ref(db, "reservas");
onValue(reservasRef, (snapshot) => {
  const data = snapshot.val();
  carregarLista(data);
});
