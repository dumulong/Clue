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
    { category : "suspect", categoryLabel : "Suspects", message: "It was", items: suspectList },
    { category : "weapon", categoryLabel : "Weapons", message: "With the", items: weaponList },
    { category : "room", categoryLabel : "Rooms", message: "In the", items: roomList }
];

// --------------------------------------
// The famous supplant!
// --------------------------------------

String.prototype.supplant = function (o) {
    return this.replace(
        /{([^{}]*)}/g,
        function (a, b) {
            let r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

const messageDiv = document.querySelector ("#message");

function fillTemplate (template, data) {
    return template.supplant(data);
}

function buildBoard () {

    const boardTemplate = document.querySelector ("#board-template").innerHTML;
    const componentTemplate = document.querySelector ("#component-template").innerHTML;
    const itemTemplate = document.querySelector ("#item-template").innerHTML;

    let components = "";
    categoryLst.forEach (category => {
        let items = "";
        category.items.forEach(item => {
            items += fillTemplate (itemTemplate, item);
        })
        const categoryLabel = category.categoryLabel
        components += fillTemplate(componentTemplate, {categoryLabel, items});
    })
    const board = fillTemplate(boardTemplate,{components});
    const content = document.querySelector ("#content");
    content.innerHTML = board;
    addGuessClick();
    applyLocalStorage();
}

function clearAction() {
	var ans = confirm("Are you sure you want to clear the board?");
	if (ans == true) {
        const unknown =  document.querySelector(`[data-guess="guess-unknown"]`);
        const values = document.querySelectorAll(".item-value");
        for (let i = 0; i < values.length; i++) {
            setGuessValue(values[i], unknown);
            localStorage.setItem(values[i].dataset.item, "guess-unknown");
        }
	}
}

function setGuessValue (item, guess) {
    item.innerHTML = guess.innerHTML;
    item.dataset.value = guess.dataset.guess;
    item.classList.remove("guess-unknown", "guess-not", "guess-maybe", "guess-probably", "guess-certain");
    item.classList.add (guess.dataset.guess);
}

function addGuessClick () {
    const guesses = document.querySelectorAll(".guess");
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i].classList.contains("item-value")) { continue; }
        guesses[i].addEventListener("click", pickGuess);
    }
}

function pickGuess (e) {
    const guess = e.target;
    const guessFor = guess.dataset.guessFor
    const item = document.querySelector(`[data-item="${guessFor}"]`);
    setGuessValue(item, guess);
    setMessage(item);
    localStorage.setItem(item.dataset.item, guess.dataset.guess);
}

function applyLocalStorage () {
    const items = [...suspectList, ...weaponList, ...roomList];
    items.forEach (item => {
        const value = localStorage.getItem(item.itemName);
        if (value) {
            const elm = document.querySelector(`[data-item=${item.itemName}]`);
            const guess = document.querySelector(`[data-guess=${value}]`);
            setGuessValue(elm, guess);
        }
    })
}

function toggle () {
    const content = document.querySelector("#content");
    const toggleDisplay = document.querySelector("#toggle-display");
	if (content.style.display == "none") {
        content.style.display = "block";
        toggleDisplay.innerText = "Hide";
	} else {
		content.style.display = "none";
        toggleDisplay.innerText = "Show";
	}
}

function setMessage (item) {
    console.log(item);
    let itemName, itemType, itemValue
    [itemType, itemName] = item.dataset.item.split("_");
    [, itemValue] = item.dataset.value.split("-");
    const value = itemValue[0].toUpperCase() + itemValue.substring(1);
    const category = categoryLst.filter(x => x.category === itemType);
    if (itemType === "suspect") {
        itemName = itemName[0].toUpperCase() + itemName.substring(1);
    }
    messageDiv.innerHTML = `<span class="message-guess">${value}</span> : ${category[0].message} ${itemName}`;
    setTimeout(() => {
        messageDiv.innerHTML ="";
    }, 2000)
}
