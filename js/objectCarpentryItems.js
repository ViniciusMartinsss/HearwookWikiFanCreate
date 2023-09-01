const expImg = "../img/exp.png";
const starImg = "../img/star.png";

const recipe = [
    { 
        id: 0,
        name: "Wood",
        descript: "",
        category: "recipe",
        rarity: 'Gray',
        img: "../img/carpentry/items/wood.png",
        recipe: ['Collect for tree'],
        level: [starImg, 1],
        quantity: 1,
        xp: [expImg, 0],         
    }
]

const carpentry = [
    {
        id: 0,
        name: "Wood Boards",
        descript: "",
        category: "items",
        rarity: 'Gray',
        img: "../img/carpentry/items/wood_boards.png",
        recipe: [recipe[0].img,'Wood', 8],
        level: [starImg, 1],
        quantity: 1,
        xp: [expImg, 203],
    },
    {
        id: 1,
        name: "Oak Boards",
        descript: "",
        category: "items",
        rarity: 'Gray',
        img: "../img/carpentry/items/wood_boards.png",
        recipe: ['Oak Log', 4],
        level: [starImg, 1],
        quantity: 1,
        xp: [expImg, 403],
    },
    {
        id: 2,
        name: "Pine Boards",
        descript: "",
        category: "items",
        rarity: 'Gray',
        img: "../img/carpentry/items/wood_boards.png",
        recipe: ['Oak Log', 4],
        level: [starImg, 1],
        quantity: 1,
        xp: [expImg, 203],
    },
];
  
export { carpentry };

