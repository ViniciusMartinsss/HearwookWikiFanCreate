import { tailoringItems } from "./db/objTailoringItems.js";
import { leatherworkingItems } from "./db/objLeatherworkingItems.js";
import { blacksmithingItems } from "./db/objBlacksmithingItems.js";
import { carpentryItems } from "./db/objCarpentryItems.js";
import { vanillaItems } from "./db/objVanillaItems.js";
import { workLevels } from "./db/obJWorkLevels.js";

const buttonContainer = document.querySelector(".button-container");

function getCategoryData(category) {
  switch (category) {
    case "tailoring":
      return tailoringItems;
    case "leatherworking":
      return leatherworkingItems;
    case "blacksmithing":
      return blacksmithingItems;
    case "carpentry":
      return carpentryItems;
    default:
      return [];
  }
}

const categoryButtons = [
  document.querySelector("#tailoring"),
  document.querySelector("#leatherworking"),
  document.querySelector("#blacksmithing"),
  document.querySelector("#carpentry"),
];

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("id");
    const data = getCategoryData(category);
    resetButtonStyles(categoryButtons, button);
    buttonContainer.innerHTML = "";
    createCategory(data);

    const itemClicked = document.querySelector(".itemClicked");
    const listClicked = document.getElementsByClassName("item-link");
    itemClicked.click();
    listClicked[0].click();
  });
});

function resetButtonStyles(buttons, selectedButton) {
  buttons.forEach((button) => {
    button.style.fontSize = "13px";
    button.style.color = "#FFFF";
  });
  selectedButton.style.fontSize = "16px";
  selectedButton.style.color = "#F9DF16";
}

function createCategory(data) {
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
    const itemList = document.querySelector(`.item-list[data-category="${category}"]`);
    const itemsByCategory = data.filter((item) => item.category === category);

    if (itemList.style.display === "none" || itemList.innerHTML === "") {
      itemList.style.display = "block";
      itemList.innerHTML = "";

      itemsByCategory.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <img src="${item.src}" alt="${item.name}">
            <a class="item-link" data-id="${item.id}">${item.name}</a>
        `;
        itemList.appendChild(itemElement);
      });

      const itemLinks = itemList.querySelectorAll(".item-link");
      itemLinks.forEach((itemLink) => {
        itemLink.addEventListener("click", (event) => showDetails(event, itemsByCategory));
      });

      function showDetails(event, items) {
        event.preventDefault();
        const clickedItemId = event.target.getAttribute("data-id");
        const clickedItemObject = items.find((item) => item.id == clickedItemId);

        createCalculator(clickedItemObject);
      }
    } else {
      itemList.style.display = "none";
      itemList.innerHTML = "";
    }
  };

  const uniqueCategories = [...new Set(data.map((item) => item.category))];
  createCategoryButtons(uniqueCategories);
}

const createCalculator = (objectItem) => {
  const containerCalculator = document.querySelector(".content-calculator-body");

  containerCalculator.innerHTML = "";

  const materials = objectItem.recipe.materials.map((material) => {
    const materialItem = vanillaItems.find((vi) => vi.id === material.item_id);
    if (materialItem) {
      // Retorna o nome e a quantidade do material
      return `
        <div class="itemRecipe">
          <img src="${materialItem.src}"></img>
          <span>${materialItem.name}</span>
          <span class="qtd" id="itemDefaultRecipe" data-original-quantity="${material.quantity}">${material.quantity}</span>
        </div>
      `;
    } else {
      return `Material não encontrado x${material.quantity}`;
    }
  });

  const contentCalculatorBody = document.querySelector(".content-calculator-body");
  contentCalculatorBody.innerHTML = `
    <div class="separate-div">
      <div class="progress">
        <span id="level"></span>
        <div class="progress-bar">
          <div id="progressText"> 0 / 0 XP</div>
        </div>
        <span id="lastlevel"></span>
      </div>
      <div class="cardItemHeader">
          <div><img src="${objectItem.src}"></div>
          <div id="itemName">${objectItem.name}</div>
      </div>
      <!--<div id="itemDesc">Descrição: ${objectItem.descript}</div> -->
      <div class="cardItemBody">
        <div class="content-recipe">
          <h2>Requirements</h2>
          ${materials.map((material) => `<div>${material}</div>`).join("")}
        </div>
        <div class="content-receive">
          <h2>Receives</h2>
          <div class="itemReceive">
            <div>
              <img src="${objectItem.src}"></img>
              <span>${objectItem.name}</span>
              <span class="qtd" id="itemDefaultQuantidade">${objectItem.quantity}</span>
            </div>
            <div>
              <img src="./img/exp.png" width="16px" height="16px"></img>
              <span>XP</span>
              <span class="qtd" id="itemDefaultXp">${objectItem.xp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-action-buttons">
      <div class="content-level-buttons">
        <div>
          <label for="yourLevel">Your Level: </label>
          <select id="yourLevel"> </select>
        </div>
        <div>
          <label for="targetLevel">Target Level: </label>
          <select id="targetLevel"> </select>
        </div>
      </div>
    </div>
  `;
  
  const yourLevel = document.getElementById("yourLevel");
  const targetLevel = document.getElementById("targetLevel");

  // Preencher as opções do seletor de nível
  workLevels.forEach((_, index) => {
    const optionYourLevel = document.createElement("option");
    optionYourLevel.value = index;
    optionYourLevel.textContent = `Level ${index}`;
    yourLevel.appendChild(optionYourLevel);

    const optionTargetLevel = document.createElement("option");
    optionTargetLevel.value = index;
    optionTargetLevel.textContent = `Level ${index}`;
    targetLevel.appendChild(optionTargetLevel);
  });

  yourLevel.addEventListener("change", () => {
    const yourLevelValue = parseInt(yourLevel.value);
    const targetLevelValue = parseInt(targetLevel.value);
    calculateRequirements(yourLevelValue, targetLevelValue, objectItem);
    // Atualizar #level com o valor de yourLevel
    const levelSpan = document.querySelector("#level");
    levelSpan.textContent = `${yourLevelValue}`;
  });
  
  targetLevel.addEventListener("change", () => {
    const yourLevelValue = parseInt(yourLevel.value);
    const targetLevelValue = parseInt(targetLevel.value);
    calculateRequirements(yourLevelValue, targetLevelValue, objectItem);
    // Atualizar #lastlevel com o valor de targetLevel
    const lastLevelSpan = document.querySelector("#lastlevel");
    lastLevelSpan.textContent = `${targetLevelValue}`;
  });
  
  function calculateRequirements(yourLevel, targetLevel, objectItem) {
    // XP necessário para atingir "yourLevel" e "targetLevel"
    const xpRequiredForTargetLevel = workLevels[targetLevel];
    let totalXPRequired = 0;
  
    // Calcular a soma de XP de yourLevel até targetLevel
    for (let i = yourLevel; i < targetLevel; i++) {
      totalXPRequired += workLevels[i];
    }
  
    // Atualizar #level com o valor de yourLevel
    const levelSpan = document.querySelector("#level");
    levelSpan.textContent = `${yourLevel}`;
  
    // Atualizar #lastlevel com o valor de targetLevel
    const lastLevelSpan = document.querySelector("#lastlevel");
    lastLevelSpan.textContent = `${targetLevel}`;
  
    // Atualizar quantidades de materiais
    const materialQuantities = document.querySelectorAll(".qtd");
    materialQuantities.forEach((materialQuantity) => {
      if (materialQuantity.getAttribute("id") === "itemDefaultRecipe") {
        const originalQuantity = parseInt(materialQuantity.getAttribute("data-original-quantity"));
        const updatedQuantity = originalQuantity * (totalXPRequired / objectItem.xp);
        materialQuantity.textContent = updatedQuantity.toFixed();
      }
    });
  
    // Atualizar a quantidade do item
    const itemQuantity = document.querySelector("#itemDefaultQuantidade");
    const originalItemQuantity = objectItem.quantity;
    const updatedItemQuantity = originalItemQuantity * (totalXPRequired / objectItem.xp);
    itemQuantity.textContent = updatedItemQuantity.toFixed();
  
    // Atualizar a barra de progresso e o texto de progresso
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.getElementById("progressText");
  
    if (yourLevel < workLevels.length) {
      // Calcula a porcentagem de progresso dentro do nível atual
      let progressPercentage = (totalXPRequired / xpRequiredForTargetLevel) * 100;
  
      // Limita o valor máximo da porcentagem a 100%
      progressPercentage = Math.min(progressPercentage, 100);
  
      progressBar.style.width = `${progressPercentage}%`;
      progressText.textContent = `${totalXPRequired.toLocaleString("pt-BR")} XP`;
    } else {
      // Se atingir o nível máximo, a barra de progresso deve estar cheia
      progressBar.style.width = "100%";
      progressText.textContent = `${totalXPRequired.toLocaleString("pt-BR")} XP (Max Level)`;
    }
    const xpInfo = document.querySelector("#itemDefaultXp");
    xpInfo.textContent = `${totalXPRequired.toLocaleString("pt-BR")}`;
  }
  
};
