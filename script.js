const url = "https://royaleapi.github.io/cr-api-data/json/cards.json";

let allCards = [];

async function loadCards() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    allCards = data;
    displayCards(allCards);

  } catch (err) {
    console.error(err);
    
  }
}

function displayCards(cards) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  cards.forEach((card,idx) => {
    const div = document.createElement("div");
    div.classList.add("card");

    // image URL format
    const image = `https://royaleapi.github.io/cr-api-assets/cards/${card.key}.png`;

    div.innerHTML = `
      <h1>${idx+1}</h1>
      <h2>${card.name}</h2>
      <img src="${image}" alt="${card.name}">
      <p>Elixir: ${card.elixir}</p>
      <p>${card.rarity}</p>
    `;

    container.appendChild(div);
  });
}
loadCards();
