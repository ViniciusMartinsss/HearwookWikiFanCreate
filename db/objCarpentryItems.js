const carpentryItems = [
  {
    id: 0,
    name: "Light Cotton Fabric",
    descript: "Ervas que são usadas em várias poções.",
    category: "Items",
    recipe: {
      materials: [
        {
          item_id: 1,
          quantity: 3
        },
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
    src: "../img/tailoring-icons/light_cotton_fabric.png"
  },
  {
    id: 1,
    name: "Thread",
    descript: "Ervas que são usadas em várias poções.",
    category: "Chest",
    recipe: {
      materials: [
        {
          item_id: 1,
          quantity: 6
        },
      ]
    },
    tier: 1,
    level: 3,
    quantity: 1,
    xp: 504,
    src: "../img/tailoring-icons/thread.png"
  }
]

export { carpentryItems }

