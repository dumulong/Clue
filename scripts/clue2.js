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
		$( ".value span" ).each(function() {
			$( this ).removeClass().addClass("glyphicon").addClass(actionLst["unknown"].actionIcon);
			var myItem = $( this).parents ("tr").eq(0).attr('id');
			setCookie ( myItem, "", 1000 );
		});
		$('.item').each(function() {
			$( this ).css ( "color", "black" );
			var myItem = $( this).parents ("tr").eq(0).attr('id');
			setCookie ( myItem + "_color", "", 1000);
		});

	}
}

function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
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
