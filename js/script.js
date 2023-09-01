import { tailoring } from "./objectTailoringItems.js";
import { leatherworking } from "./objectLeatherworkingItems.js";
import { blacksmithing } from "./objectBlacksmithingItems.js";
import { carpentry } from "./objectCarpentryItems.js";
import { professionLevels } from "./professionLevel.js";

const buttonContainer = document.querySelector(".button-container");
const btnTailoring = document.querySelector("#btnTailoring");
const btnBlacksmithing = document.querySelector("#btnBlacksmithing");
const btnCarpentry = document.querySelector("#btnCarpentry");
const btnLeatherworking = document.querySelector("#btnLeatherworking");

// Adicione o atributo data-category a cada botão para identificar sua categoria.
btnTailoring.setAttribute("data-category", "tailoring");
btnLeatherworking.setAttribute("data-category", "leatherworking");
btnBlacksmithing.setAttribute("data-category", "blacksmithing");
btnCarpentry.setAttribute("data-category", "carpentry");

function getCategoryData(category) {
  switch (category) {
    case "tailoring":
      return tailoring;
    case "leatherworking":
      return leatherworking;
    case "blacksmithing":
      return blacksmithing;
    case "carpentry":
      return carpentry;
    default:
      return [];
  }
}

const categoryButtons = [btnTailoring, btnLeatherworking, btnBlacksmithing, btnCarpentry];
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    const dados = getCategoryData(category);
    resetButtonStyles(categoryButtons, button);
    buttonContainer.innerHTML = "";
    createCategory(dados);

    const itemClicked = document.querySelector(".itemClicked");
    const listClicked = document.getElementsByTagName("A");
    itemClicked.click();
    listClicked[0].click();
  });
});

function resetButtonStyles(buttons, selectedButton) {
  buttons.forEach((button) => {
    button.style.fontSize = "13px";
    button.style.color = "#FFFF";
  });
  selectedButton.style.fontSize = "1.2rem";
  selectedButton.style.color = "#F9DF16";
}

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
    const itemsByCategory = dados.filter((item) => item.category === category);

    if (itemList.style.display === "none" || itemList.innerHTML === "") {
      itemList.style.display = "block";
      itemList.innerHTML = "";

      itemsByCategory.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <a class="item-link" data-id="${item.id}">${item.name}</a>
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

  const uniqueCategories = [...new Set(dados.map((item) => item.category))];
  createCategoryButtons(uniqueCategories);
}

const createCalculaotor = (objectItem) => {
  const containerCalculator = document.querySelector(".containerCalculator");

  containerCalculator.innerHTML = "";

  const itemHeaderContainer = document.createElement("div");
  itemHeaderContainer.classList.add("containerTitle");

  itemHeaderContainer.innerHTML = `
    <div class="separate">
      <div class="progress">
        <span id="level"></span> 
        <div class="progress-bar"><div id="progressText"></div> </div>
      </div>  
      <div class="cardItemHeader">
          <img class="imgItem" src="${objectItem.img}">
          <p id="itemName">${objectItem.name}</p>   
      </div>
      <!--<p id="itemDesc">Descrição: ${objectItem.descript}</p> -->    
      <div class="cardItemBody">
          <h1>Requirements:</h1>
          <p id="itemRecipe"><img id="imgRecipe" src="${objectItem.recipe[0]}">- ${objectItem.recipe[1]} <span id="itemDefaultRecipe">${objectItem.recipe[2]}</span></p>
          <p id="itemNivel"><img id="imgRecipe" src="${objectItem.level[0]}">- Level <span id="itemDefault">${objectItem.level[1]}</span></p>    
      </div>
      <div class="cardItemBody">
          <h1>Receive:</h1>
          <p><img src="${objectItem.img}">- ${objectItem.name} <span id="itemDefaultQuantidade">${objectItem.quantity}</span></p>
          <p><img id="imgRecipe"src="${objectItem.xp[0]}">- Xp <span id="itemXp" data-id="${objectItem.xp[1]}">${objectItem.xp[1]}</span></p>    
      </div>
    </div>
    <div class="buttonRangeContainer">
      <div>
          <label for="selectLevel">Select Level: </label>
          <select id="selectLevel">
              
          </select>
      </div>   
        <div class="aninButton">
          <span class="front" id="subtrai">-</span>
        </div>

        <input type="number" class="numberInput" value="1" maxlength="3" min="1" max="999" required>
        
        <div class="aninButton">
            <span class="front" id="adiciona">+</span>
        </div>
    </div>
    `;
  containerCalculator.appendChild(itemHeaderContainer);

  const selectLevel = document.getElementById("selectLevel");
  const progressText = document.getElementById("progressText");
  const levelSpan = document.getElementById("level");
  const progressBar = document.querySelector(".progress-bar")

  const numberInput = document.querySelector(".numberInput");
  const addButton = document.getElementById("adiciona");
  const subtractButton = document.getElementById("subtrai");

  addButton.addEventListener("click", () => {
    numberInput.value = Math.min(parseInt(numberInput.value) + 1, 999);
    updatePage();
  });

  subtractButton.addEventListener("click", () => {
    numberInput.value = Math.max(parseInt(numberInput.value) - 1, 1);
    updatePage();
  });

  numberInput.addEventListener("input", () => {
    numberInput.value = Math.max(Math.min(parseInt(numberInput.value), 999),1);
    let inputValue = parseInt(numberInput.value);

    // Verifique se o valor é menor que 1 e ajuste-o para 1
    if (isNaN(inputValue) || inputValue < 1) {
      inputValue = 1;
    }
    // Defina o valor corrigido no input
    numberInput.value = inputValue;
  
    updatePage();
  });

  // Preencher as opções do seletor de nível
  professionLevels.forEach((_, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `Level ${index}`;
    selectLevel.appendChild(option);
  });

  // Manipular a seleção de nível
  selectLevel.addEventListener("change", (event) => {
    const selectedLevel = parseInt(event.target.value);
    levelSpan.textContent = selectedLevel;
    numberInput.value = 1; // Reinicia o input para o valor mínimo
    updateProgressBar(objectItem.xp[1], selectedLevel);
  });

  function updateProgressBar(currentXP, selectedLevel) {
    const nextLevelXP = professionLevels[selectedLevel];
    const progressPercentage = (currentXP / nextLevelXP) * 100; // Limita o preenchimento a 100%

    progressBar.style.width = `${progressPercentage}%`; // Atualiza a largura da barra de progresso
    progressText.textContent = `${currentXP} / ${nextLevelXP.toLocaleString("pt-BR")}`;
  }

  function updatePage() {
    const multiplier = parseInt(numberInput.value);
  
    const itemDefaultRecipe = document.getElementById("itemDefaultRecipe");
    itemDefaultRecipe.textContent = objectItem.recipe[2] * multiplier;
  
    const itemDefaultQuantidade = document.getElementById("itemDefaultQuantidade");
    itemDefaultQuantidade.textContent = objectItem.quantity * multiplier;
  
    const itemXp = document.getElementById("itemXp");
    itemXp.textContent = (objectItem.xp[1] * multiplier).toLocaleString("pt-BR");
  
    let totalXP = objectItem.xp[1] * multiplier;
    let selectedLevel = parseInt(levelSpan.textContent);
  
    // Subtrai o XP necessário para atingir o próximo nível
    while (
      selectedLevel <= professionLevels.length && totalXP >= professionLevels[selectedLevel]) {
      selectedLevel++; // Aumenta o nível
      
      totalXP = objectItem.xp[1];
    }
  
    // Atualiza o nível e a barra de progresso
    levelSpan.textContent = selectedLevel;
    updateProgressBar(totalXP, selectedLevel);
  }
  
  // Inicialização padrão com o primeiro nível
  levelSpan.textContent = 0;
  updateProgressBar(objectItem.xp[1], 0);
};
