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

const componentTemplate = document.getElementById ("component-template").innerHTML;
const categoryTemplate = document.getElementById ("category-template").innerHTML;
const itemTemplate = document.getElementById ("item-template").innerHTML;

function fillComponent (template) {
    let component = componentTemplate.supplant(template);
    return component;
}

function fillCategory (template) {
    let category = categoryTemplate.supplant(template);
    return category;
}

function fillItem (template) {
    let item = itemTemplate.supplant(template);
    return item;
}

function buildBoard () {
    let content = "";
    categoryLst.forEach (category => {
        let html = fillCategory(category);
        category.items.forEach(item => {
            html += fillItem (item);
        })
        content += fillComponent({component: html});
    })
    const board = document.getElementById ("board");
    board.innerHTML = content;
}

function clearAction() {
	var ans = confirm("Are you sure you want to clear the board?");
	if (ans == true) {
        const unknown =  document.querySelector(`[data-guess="guess-unknown"]`);
        const values = document.getElementsByClassName("item-value");
        for (let i = 0; i < values.length; i++) {
            values[i].innerHTML = unknown.innerHTML;
            values[i].dataset.guess = "guess-unknown";
            localStorage.setItem(values[i].dataset.item, "guess-unknown");
        }
	}
}

function addGuessClick () {
    const guesses = document.getElementsByClassName("guess");
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i].classList.contains("item-value")) { continue; }
        guesses[i].addEventListener("click", pickGuess);
    }
}

function pickGuess (e) {
    const guessFor = e.target.dataset.guessFor
    const item = document.querySelector(`[data-item="${guessFor}"]`);
    item.innerHTML = e.target.innerHTML;
    localStorage.setItem(item.dataset.item, e.target.dataset.guess);
}

function toggle () {
    const content = document.getElementById("content");
    const toggleDisplay = document.getElementById("toggle-display");
	if (content.style.display == "none") {
        content.style.display = "block";
        toggleDisplay.innerText = "Hide";
	} else {
		content.style.display = "none";
        toggleDisplay.innerText = "Show";
	}
}
