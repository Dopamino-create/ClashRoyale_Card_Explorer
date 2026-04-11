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

  cards.forEach((card, idx) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const image = `https://royaleapi.github.io/cr-api-assets/cards/${card.key}.png`;

    div.innerHTML = 
    `
      <h1>${idx + 1}</h1>
      <h2>${card.name}</h2>
      <img src="${image}" alt="${card.name}">
      <p>Elixir: ${card.elixir}</p>
      <p>Rarity: ${card.rarity}</p>
      <p>Type: ${card.type}</p>
    `;

    container.appendChild(div);
  });
}



//  Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});


//  Sorting 
const sortOption = document.getElementById("sortOption");
sortOption.addEventListener("change", (e) => {
  const sortBy = e.target.value;


  let sortedCards = [...allCards];

  if (sortBy === "name-asc") {
    sortedCards.sort((a, b) => a.name.localeCompare(b.name));

  } else if (sortBy === "name-desc") {
    sortedCards.sort((a, b) => b.name.localeCompare(a.name));

  } else if (sortBy === "elixir-asc") {
    sortedCards.sort((a, b) => a.elixir - b.elixir);

  } else if (sortBy === "elixir-desc") {
    sortedCards.sort((a, b) => b.elixir - a.elixir);

  } else {
    sortedCards = allCards;
  }

  displayCards(sortedCards);
});

loadCards();