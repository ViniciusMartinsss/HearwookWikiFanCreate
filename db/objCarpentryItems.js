const carpentryItems = [

  // ! -------------- ITEMS ----------------

  {
    id: 0,
    name: "Wood Bords",
    descript: "",
    category: "Items",
    recipe: {
      materials: [
        {
          item_id: 0,
          quantity: 8
        }
      ]
    },
    tier: 1,
    level: 1,
    quantity: 1,
    xp: 203,
    src: "../img/carpentry-icons/wood_boards.png"
  },
  {
    id: 1,
    name: "Oak Bords",
    descript: "",
    category: "Items",
    recipe: {
      materials: [
        {
          item_id: 14,
          quantity: 4
        }
      ]
    },
    tier: 1,
    level: 1,
    quantity: 1,
    xp: 203,
    src: "../img/carpentry-icons/Oak_Boards.png"
  },
  {
    id: 2,
    name: "Pine Bords",
    descript: "",
    category: "Items",
    recipe: {
      materials: [
        {
          item_id: 15,
          quantity: 4
        }
      ]
    },
    tier: 1,
    level: 1,
    quantity: 1,
    xp: 203,
    src: "../img/carpentry-icons/Pine_Boards.png"
  },

  // ! -------------- LUMBERAXE ----------------

  {
    id: 3,
    name: "Flimsy Axe",
    descript: "",
    category: "Lumberaxe",
    recipe: {
      materials: [
        {
          item_id: 16,
          quantity: 1
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 420,
    src: "../img/carpentry-icons/FlimsyAxe.icon.png"
  },
  {
    id: 4,
    name: "Oak Axe",
    descript: "",
    category: "Lumberaxe",
    recipe: {
      materials: [
        {
          item_id: 17,
          quantity: 2
        },
        {
          item_id: 2,
          quantity: 1
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 420,
    src: "../img/carpentry-icons/OakAxe.icon.png"
  },

  // ! -------------- SHIELD ----------------

  {
    id: 5,
    name: "Oak Buckler",
    descript: "",
    category: "Shield",
    recipe: {
      materials: [
        {
          item_id: 17,
          quantity: 10
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 634,
    src: "../img/carpentry-icons/OakBuckler-icon.png"
  },

  // ! -------------- BOW ----------------

  {
    id: 5,
    name: "Wood Bow",
    descript: "",
    category: "Bow",
    recipe: {
      materials: [
        {
          item_id: 16,
          quantity: 10
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 345,
    src: "../img/carpentry-icons/WoodBow.icon.png"
  },
  {
    id: 6,
    name: "Oak Bow",
    descript: "",
    category: "Bow",
    recipe: {
      materials: [
        {
          item_id: 17,
          quantity: 10
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 864,
    src: "../img/carpentry-icons/OakBow-icon.png"
  },
  {
    id: 7,
    name: "Pine Bow",
    descript: "",
    category: "Bow",
    recipe: {
      materials: [
        {
          item_id: 18,
          quantity: 10
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 1323,
    src: "../img/carpentry-icons/PineBow-icon.png"
  },

  // ! -------------- MACE ----------------

  {
    id: 8,
    name: "Pine Mace",
    descript: "",
    category: "Mace",
    recipe: {
      materials: [
        {
          item_id: 18,
          quantity: 8
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 1323,
    src: "../img/carpentry-icons/PineMace-icon.png"
  },

  // ! -------------- INSTRUMENT ----------------

  {
    id: 9,
    name: "Oak Harp",
    descript: "",
    category: "Instrument",
    recipe: {
      materials: [
        {
          item_id: 17,
          quantity: 10
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 1553,
    src: "../img/carpentry-icons/oak_harp.png"
  },
  {
    id: 10,
    name: "Pine Harp",
    descript: "",
    category: "Instrument",
    recipe: {
      materials: [
        {
          item_id: 18,
          quantity: 10
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 1753,
    src: "../img/carpentry-icons/pine_harp.png"
  },

  // ! -------------- WAND ----------------

  {
    id: 11,
    name: "Wood Wand",
    descript: "",
    category: "Wand",
    recipe: {
      materials: [
        {
          item_id: 16,
          quantity: 8
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 886,
    src: "../img/carpentry-icons/WoodWand-icon.png"
  },
  {
    id: 12,
    name: "Oak Wand",
    descript: "",
    category: "Wand",
    recipe: {
      materials: [
        {
          item_id: 17,
          quantity: 10
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 1886,
    src: "../img/carpentry-icons/OakWand-icon.png"
  },
  {
    id: 13,
    name: "Pine Wand",
    descript: "",
    category: "Wand",
    recipe: {
      materials: [
        {
          item_id: 18,
          quantity: 10
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 2212,
    src: "../img/carpentry-icons/PineWand-icon.png"
  },

  // ! -------------- STAFF ----------------

  {
    id: 14,
    name: "Pine Staff",
    descript: "",
    category: "Staff",
    recipe: {
      materials: [
        {
          item_id: 18,
          quantity: 12
        }
      ]
    },
    tier: 1,
    level: 9,
    quantity: 1,
    xp: 2674,
    src: "../img/carpentry-icons/PineStaff-icon.png"
  },

]

export { carpentryItems }

