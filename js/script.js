import { tailoring } from './objectTailoringItems.js';
import { leatherworking } from './objectLeatherworkingItems.js';
import { blacksmithing } from './objectBlacksmithingItems.js';
import { carpentry } from './objectCarpentryItems.js';

const buttonContainer = document.querySelector(".button-container");''

const btnTailoring = document.querySelector("#btnTailoring");
const btnBlacksmithing = document.querySelector("#btnBlacksmithing");
const btnCarpentry = document.querySelector("#btnCarpentry");
const btnLeatherworking = document.querySelector("#btnLeatherworking");

btnTailoring.addEventListener("click", () => {
  let dados = tailoring;
  btnTailoring.style.fontSize = "1.2rem";
  btnTailoring.style.color = "#F9DF16";

  btnLeatherworking.style.color = "#FFFF";
  btnLeatherworking.style.fontSize = "1rem";

  btnBlacksmithing.style.color = "#FFFF";
  btnBlacksmithing.style.fontSize = "1rem";

  btnCarpentry.style.color = "#FFFF";
  btnCarpentry.style.fontSize = "1rem";

  buttonContainer.innerHTML = "";
  createCategory(dados);

  const itemClicked = document.querySelector(".itemClicked");
  const listClicked = document.getElementsByTagName("A");
  itemClicked.click();
  listClicked[0].click();
});

btnLeatherworking.addEventListener("click", () => {
  let dados = leatherworking;

  btnLeatherworking.style.color = "#F9DF16";
  btnLeatherworking.style.fontSize = "1.2rem";

  btnTailoring.style.color = "#FFFF";
  btnTailoring.style.fontSize = "1rem";

  btnBlacksmithing.style.color = "#FFFF";
  btnBlacksmithing.style.fontSize = "1rem";

  btnCarpentry.style.color = "#FFFF";
  btnCarpentry.style.fontSize = "1rem";

  buttonContainer.innerHTML = "";
  createCategory(dados);

  const itemClicked = document.querySelector(".itemClicked");
  const listClicked = document.getElementsByTagName("A");
  itemClicked.click();
  listClicked[0].click();
});

btnBlacksmithing.addEventListener("click", () => {
  let dados = blacksmithing;

  btnBlacksmithing.style.fontSize = "1.2rem";
  btnBlacksmithing.style.color = "#F9DF16";

  btnLeatherworking.style.color = "#FFFF";
  btnLeatherworking.style.fontSize = "1rem";

  btnTailoring.style.color = "#FFFF";
  btnTailoring.style.fontSize = "1rem";

  btnCarpentry.style.color = "#FFFF";
  btnCarpentry.style.fontSize = "1rem";

  buttonContainer.innerHTML = "";
  createCategory(dados);

  const itemClicked = document.querySelector(".itemClicked");
  const listClicked = document.getElementsByTagName("A");
  itemClicked.click();
  listClicked[0].click();
});

btnCarpentry.addEventListener("click", () => {
  let dados = carpentry;
  btnCarpentry.style.fontSize = "1.2rem";
  btnCarpentry.style.color = "#F9DF16";

  btnLeatherworking.style.color = "#FFFF";
  btnLeatherworking.style.fontSize = "1rem";

  btnBlacksmithing.style.color = "#FFFF";
  btnBlacksmithing.style.fontSize = "1rem";

  btnTailoring.style.color = "#FFFF";
  btnTailoring.style.fontSize = "1rem";

  buttonContainer.innerHTML = "";
  createCategory(dados);

  const itemClicked = document.querySelector(".itemClicked");
  const listClicked = document.getElementsByTagName("A");
  itemClicked.click();
  listClicked[0].click();
});

function createCategory(dados) {
  const createCategoryButtons = (categories) => {
    const buttonContainer = document.querySelector(".button-container");

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.classList.add(`itemClicked`);
      button.textContent = category;
      button.addEventListener("click", () => toggleCategory(category));
      buttonContainer.appendChild(button);

      const itemList = document.createElement("div");
      itemList.classList.add("item-list");
      itemList.setAttribute("data-category", category);
      buttonContainer.appendChild(itemList);
    });
  };

  const toggleCategory = (category) => {
    const itemList = document.querySelector(
      `.item-list[data-category="${category}"]`
    );
    const itemsByCategory = dados.filter((item) => item.categoria === category);

    if (itemList.style.display === "none" || itemList.innerHTML === "") {
      itemList.style.display = "block";
      itemList.innerHTML = "";

      itemsByCategory.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
                    <img src="${item.img}" alt="${item.nome}">
                    <a class="item-link" data-id="${item.id}">${item.nome}</a>
                `;
        itemList.appendChild(itemElement);
      });

      const itemLinks = itemList.querySelectorAll(".item-link");
      itemLinks.forEach((itemLink) => {
        itemLink.addEventListener("click", (event) =>
          showDetails(event, itemsByCategory)
        );
      });

      function showDetails(event, items) {
        event.preventDefault();
        const clickedItemId = event.target.getAttribute("data-id");
        const clickedItemObject = items.find(
          (item) => item.id == clickedItemId
        );

        createCalculaotor(clickedItemObject);
      }
    } else {
      itemList.style.display = "none";
      itemList.innerHTML = "";
    }
  };

  const uniqueCategories = [...new Set(dados.map((item) => item.categoria))];
  createCategoryButtons(uniqueCategories);
}

const createCalculaotor = (objectItem) => {
  const containerCalculator = document.querySelector(".containerCalculator");

  containerCalculator.innerHTML = "";

  const itemHeaderContainer = document.createElement("div");
  itemHeaderContainer.classList.add("containerTitle");

  itemHeaderContainer.innerHTML = `
    <div class="separate">    
      <div class="cardItemHeader">
          <img class="imgItem" src="${objectItem.img}">
          <p id="itemName">${objectItem.nome}</p>   
      </div>
      <p id="itemDesc">Descrição: ${objectItem.descricao}</p>     
        <div class="cardItemBody">
            <h1>Requirements:</h1>
            <p id="itemRecipe">- ${objectItem.receita[0]}: <span id="itemDefaultRecipe">${objectItem.receita[1]}</span></p>
            <p id="itemNivel">- Craft Level: <span id="itemDefault">${objectItem.nivel}</span></p>    
        </div>
        <div class="cardItemBody">
            <h1>Receive:</h1>
            <p>- ${objectItem.nome}: <span id="itemDefaultQuantidade">${objectItem.quantidade}</span></p>
            <p>- XP: <span id="itemXp" data-id="${objectItem.xp}">${objectItem.xp}</span></p>    
        </div>
    </div>
    <div class="buttonRangeContainer">  
        <div class="aninButton">
          <span class="front" id="subtrai">-</span>
        </div>

        <input type="number" class="numberInput" value="1" maxlength="3" min="1" max="300">
        
        <div class="aninButton">
            <span class="front" id="adiciona">+</span>
        </div>
    </div>
    `;
  containerCalculator.appendChild(itemHeaderContainer);

  const numberInput = document.querySelector(".numberInput");
  const addButton = document.getElementById("adiciona");
  const subtractButton = document.getElementById("subtrai");

  addButton.addEventListener("click", () => {
    numberInput.value = Math.min(parseInt(numberInput.value) + 1, 300);
    updatePage();
  });

  subtractButton.addEventListener("click", () => {
    numberInput.value = Math.max(parseInt(numberInput.value) - 1, 1);
    updatePage();
  });

  numberInput.addEventListener("input", () => {
    numberInput.value = Math.max(Math.min(parseInt(numberInput.value), 300), 1);
    updatePage();
  });

  function updatePage() {
    const multiplier = parseInt(numberInput.value);

    const itemDefaultRecipe = document.getElementById("itemDefaultRecipe");
    itemDefaultRecipe.textContent = objectItem.receita[1] * multiplier;

    const itemDefaultQuantidade = document.getElementById(
      "itemDefaultQuantidade"
    );

    itemDefaultQuantidade.textContent = objectItem.quantidade * multiplier;

    const itemXp = document.getElementById("itemXp");
    itemXp.textContent = (objectItem.xp * multiplier).toLocaleString("pt-BR");
  }
};
