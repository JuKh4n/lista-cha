document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("lista-presentes");
  const database = firebase.database();

  const data = [
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

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="item-nome">${item}</span>
      <input type="text" placeholder="Seu nome">
      <button class="reservar">Reservar</button>
      <button class="editar" style="display: none;">Editar</button>
      <span class="reservado-por"></span>
    `;
    lista.appendChild(li);

    const input = li.querySelector("input");
    const reservarBtn = li.querySelector(".reservar");
    const editarBtn = li.querySelector(".editar");
    const reservadoPor = li.querySelector(".reservado-por");

    const itemRef = database.ref("reservas/" + index);

    itemRef.on("value", (snapshot) => {
      const valor = snapshot.val();
      if (valor) {
        input.value = valor.nome;
        input.disabled = true;
        reservarBtn.style.display = "none";
        editarBtn.style.display = "inline";
        reservadoPor.textContent = `Reservado por: ${valor.nome}`;
      } else {
        input.value = "";
        input.disabled = false;
        reservarBtn.style.display = "inline";
        editarBtn.style.display = "none";
        reservadoPor.textContent = "";
      }
    });

    reservarBtn.addEventListener("click", () => {
      const nome = input.value.trim();
      if (nome !== "") {
        itemRef.set({ nome: nome });
      }
    });

    editarBtn.addEventListener("click", () => {
      input.disabled = false;
      input.focus();
      editarBtn.textContent = "Salvar";
      editarBtn.onclick = () => {
        const nomeEditado = input.value.trim();
        if (nomeEditado !== "") {
          itemRef.set({ nome: nomeEditado });
          input.disabled = true;
          editarBtn.textContent = "Editar";
        }
      };
    });
  });
});
