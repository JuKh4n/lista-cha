const itens = [
  "Batedeira",
  "Liquidificador",
  "Cafeteira",
  "Torradeira",
  "Jogo de lençóis",
  "Jogo de lençóis",
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

itens.forEach((item, index) => {
  criarItem(item, index);
});

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
