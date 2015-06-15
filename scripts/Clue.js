
$(function() {

	//Fill the template
	var template = $("#item-template").html();
	var renderer = Handlebars.compile (template);
	$("#item-list").html(renderer(objList));

	addActionList (); //Add a list of possible icons
	addActionClick (); //add a clicks to the list of possible icons

	addItemClick (); //Toggle the item black/red when clicked...
	
	init ();

});

// --------------------------------------
// Create all the categories
// --------------------------------------
var categoryLst = [];
categoryLst [categoryLst.length] = { category : "suspect", categoryLabel : "Suspects" };
categoryLst [categoryLst.length] = { category : "weapon", categoryLabel : "Weapons" };
categoryLst [categoryLst.length] = { category : "room", categoryLabel : "Rooms" };

// --------------------------------------
// Create items for all the categories
// --------------------------------------

var suspectList = [];
suspectList [suspectList.length] = { itemName : "suspect_mustard", itemLabel : "Col Mustard" };
suspectList [suspectList.length] = { itemName : "suspect_plum", itemLabel : "Prof. Plum" };
suspectList [suspectList.length] = { itemName : "suspect_green", itemLabel : "Mr. Green" };
suspectList [suspectList.length] = { itemName : "suspect_peacock", itemLabel : "Mrs. Peacock" };
suspectList [suspectList.length] = { itemName : "suspect_scarlet", itemLabel : "Miss Scarlet" };
suspectList [suspectList.length] = { itemName : "suspect_white", itemLabel : "Mrs. White" };

var weaponList = [];
weaponList [weaponList.length] = { itemName : "weapon_knife", itemLabel : "Knife" };
weaponList [weaponList.length] = { itemName : "weapon_candlestick", itemLabel : "Candlestick" };
weaponList [weaponList.length] = { itemName : "weapon_pistol", itemLabel : "Pistol" };
weaponList [weaponList.length] = { itemName : "weapon_rope", itemLabel : "Rope" };
weaponList [weaponList.length] = { itemName : "weapon_leadpipe", itemLabel : "Lead Pipe" };
weaponList [weaponList.length] = { itemName : "weapon_wrench", itemLabel : "Wrench" };

var roomList = [];
roomList [roomList.length] = { itemName : "room_hall", itemLabel : "Hall" };
roomList [roomList.length] = { itemName : "room_lounge", itemLabel : "Lounge" };
roomList [roomList.length] = { itemName : "room_dinning", itemLabel : "Dinning Room" };
roomList [roomList.length] = { itemName : "room_kitchen", itemLabel : "Kitchen" };
roomList [roomList.length] = { itemName : "room_ballroom", itemLabel : "Ball Room" };
roomList [roomList.length] = { itemName : "room_conservatory", itemLabel : "Conservatory" };
roomList [roomList.length] = { itemName : "room_billard", itemLabel : "Billard Room" };
roomList [roomList.length] = { itemName : "room_library", itemLabel : "Library" };
roomList [roomList.length] = { itemName : "room_study", itemLabel : "Study" };

// --------------------------------------
// Now, put them all together...
// --------------------------------------
var objList = {};

objList.categoryLst = categoryLst;

categoryLst[0].items = suspectList;
categoryLst[1].items = weaponList;
categoryLst[2].items = roomList;


// --------------------------------------
// Create the action list object
// --------------------------------------
var actionLst = {};
actionLst.unknown = {  actionLabel : "Unknown", actionIcon : "glyphicon-question-sign" };
actionLst.not_it = { actionLabel : "Not He/She/It", actionIcon : "glyphicon-remove" };
actionLst.maybe = { actionLabel : "Maybe", actionIcon : "glyphicon-adjust" };
actionLst.pretty_sure = { actionLabel : "Pretty Sure", actionIcon : "glyphicon-pushpin" };
actionLst.certain = { actionLabel : "Certain", actionIcon : "glyphicon-ok" };



function addActionList () {

	for(var action in actionLst){
		$('.actionLst').each(function() {
			var $icon = $("<span>").addClass("action glyphicon").addClass(actionLst[action].actionIcon);
			$icon.attr ("data-item", $( this ).closest('tr').attr('id'));
			$icon.attr ("data-action", action);
			$icon.attr ("aria-hidden", "true");
			$( this ).append($icon);
		});
	}
}

function addActionClick () {

	$( "span.action" ).click(function() {
		var myItem = $( this ).attr ("data-item");
		var myClass = $( this ).attr ("data-action");
		$( "span", "#" + myItem + " td.value" ).removeClass().addClass("choices glyphicon").addClass(actionLst[myClass].actionIcon);
		setCookie ( myItem, myClass, 1000);
	});
}

function addItemClick () {

	$('.item').click(function() {
		var myItem = $( this).parents ("tr").eq(0).attr('id');
		var rgb = RGBToHex($( this ).css ( "color" )).toLowerCase();
		var myColor = (rgb == '#cc0000' ? "black" : "#cc0000");
		$( this ).css ( "color", myColor );
		setCookie ( myItem + "_color", myColor, 1000);
		
	});
}

function init () {

	$( ".value span" ).each(function() {
		var myItem = $( this).parents ("tr").eq(0).attr('id');
		cookieValue = getCookie (myItem);
		if (cookieValue != ""){
			$( this ).removeClass().addClass("glyphicon").addClass(actionLst[cookieValue].actionIcon)
		} else {
			$( this ).removeClass().addClass("glyphicon").addClass(actionLst["unknown"].actionIcon);
		}
	});

	$('.item').each(function() {
		var myItem = $( this).parents ("tr").eq(0).attr('id');
		cookieValue = getCookie (myItem + "_color" );
		var myColor = (cookieValue != "" ? cookieValue : "black" );
		$( this ).css ( "color", myColor )
	});

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

	if ($( "#content" ).css ("display") == "block") {
		$( "#content" ).css ("display", "none");
		$( "#toggle-display" ).text("Show");
	} else {
		$( "#content" ).css ("display", "block");
		$( "#toggle-display" ).text("Hide");
	}
}

//---------------------------------------------
// Colors
//---------------------------------------------

function RGBToHex(color) {

    if (color.substr(0, 1) === '#') return color;

	try {
		var digits = /(.*?)rgb\((\s*\d+),(\s*\d+),(\s*\d+)\)/.exec(color);

		var red = ("0" + parseInt(digits[2],10).toString(16)).slice(-2);
		var green = ("0" + parseInt(digits[3],10).toString(16)).slice(-2);
		var blue = ("0" + parseInt(digits[4],10).toString(16)).slice(-2);

		return "#" + red + green + blue;
	} catch(err) {
		return "";
	}

};


function hexToRGB(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "<br/>";
    }
    return aString;
}