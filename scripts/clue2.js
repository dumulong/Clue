// --------------------------------------
// Create items for all the categories
// --------------------------------------

const suspectList = [
    { itemName : "suspect_mustard", itemLabel : "Col Mustard" },
    { itemName : "suspect_plum", itemLabel : "Prof. Plum" },
    { itemName : "suspect_green", itemLabel : "Mr. Green" },
    { itemName : "suspect_peacock", itemLabel : "Mrs. Peacock" },
    { itemName : "suspect_scarlet", itemLabel : "Miss Scarlet" },
    { itemName : "suspect_white", itemLabel : "Mrs. White" }
];

const weaponList = [
    { itemName : "weapon_knife", itemLabel : "Knife" },
    { itemName : "weapon_candlestick", itemLabel : "Candlestick" },
    { itemName : "weapon_pistol", itemLabel : "Pistol" },
    { itemName : "weapon_rope", itemLabel : "Rope" },
    { itemName : "weapon_leadpipe", itemLabel : "Lead Pipe" },
    { itemName : "weapon_wrench", itemLabel : "Wrench" }
];

const roomList = [
    { itemName : "room_hall", itemLabel : "Hall" },
    { itemName : "room_lounge", itemLabel : "Lounge" },
    { itemName : "room_dinning", itemLabel : "Dinning Room" },
    { itemName : "room_kitchen", itemLabel : "Kitchen" },
    { itemName : "room_ballroom", itemLabel : "Ball Room" },
    { itemName : "room_conservatory", itemLabel : "Conservatory" },
    { itemName : "room_billard", itemLabel : "Billard Room" },
    { itemName : "room_library", itemLabel : "Library" },
    { itemName : "room_study", itemLabel : "Study" }
];

// --------------------------------------
// Create all the categories
// --------------------------------------
const categoryLst = [
    { category : "suspect", categoryLabel : "Suspects", items: suspectList },
    { category : "weapon", categoryLabel : "Weapons", items: weaponList },
    { category : "room", categoryLabel : "Rooms", items: roomList }
];


String.prototype.supplant = function (o) {
    return this.replace(
        /{([^{}]*)}/g,
        function (a, b) {
            let r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};


const categoryTemplate = document.getElementById ("category-template").innerHTML;
const itemTemplate = document.getElementById ("item-template").innerHTML;

function fillCategory (template) {
    let category = categoryTemplate.supplant(template);
    return category;
}

function fillItem (template) {
    let item = itemTemplate.supplant(template);
    return item;
}

function buildBoard () {
    let html = "";
    categoryLst.forEach (category => {
        html += fillCategory(category);
        category.items.forEach(item => {
            html += fillItem (item);
        })
    })
    const board = document.getElementById ("board");
    board.innerHTML = html;
}