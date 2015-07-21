$(document).ready(function(){

	fruits.push(new Fruit("Apple"));
	fruits.push(new Fruit("Banana"));
	fruits.push(new Fruit("Orange"));
	fruits.push(new Fruit("Pear"));
	updateUI();
	$("body").on("click", ".buy", function(){
		var fruitname = $(this).prev().prev().text();
		var fruit = findFruit(fruitname);
		myUser.buyFruit(fruit);
		updateUI();
	});

	setInterval(function(){
		//Scramble our prices
		for(var i = 0; i < fruits.length; i++) {
			var currentPrice = fruits[i].currentPrice;
			fruits[i].currentPrice = randomChange(currentPrice);
		}

		//Update our ui
		updateUI();
	}, 3000);
});

var myUser = new User(); //Our lonely user
var fruits = []; //Our different kinds of fruit

/**
 * Describes a single user on our site. Holds all their personal
 * information.
 * @constructor
 */
function User(){
	this.inventory = [];
	this.cash = 100.00;
	this.getInventoryItem = function(fruit){
		for(var i = 0; i < this.inventory.length; i++) {
			if(this.inventory[i].fruit.name === fruit.name) {
				return this.inventory[i];
			}
		}
		return null; //No fruit
	};
	this.buyFruit = function(fruit){
		if(this.getInventoryItem(fruit) != null){
			//we have fruit
			for(var i = 0; i < this.inventory.length; i++) {
				var currentItem = this.inventory[i];
				if(currentItem.fruit.name === fruit.name) { //We have found existing fruit
					currentItem.history.push(fruit.currentPrice);
					this.cash -= fruit.currentPrice;
				}
			}
		} else{
			var item = new Inventoryitem(fruit);
			item.history.push(fruit.currentPrice);
			this.inventory.push(item);
			this.cash -= fruit.currentPrice;
		}
	}
	this.getAvgPrice = function(fruit) {
		var item = this.getInventoryItem(fruit);
		if(item != null) {
			var totalPrice = 0;
			item.history.map(function(item) {
				totalPrice += item;
			});
			return totalPrice / item.history.length;
		}
		return 0;
	}
}

/**
 * Describes a set of fruits in our user's inventory. Contains information
 * about the price history, quantity, and type of fruit.
 * @param fruit
 * @constructor
 */
function Inventoryitem(fruit){
	this.history = [];
	this.fruit = fruit;
	//this.quantity = 1;
}

/**
 * Simple wrapper class to describe a fruit
 * @param name
 * @constructor
 */
function Fruit(name) {
	this.name = name;
	this.currentPrice = randomNumber(0.5, 9.99);
}

/**
 * Gives a random number
 * @param min
 * 		Inclusive
 * @param max
 * 		Exclusive
 * @returns {number}
 */
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

/**
 * Find a fruit with a given name in our global fruits array
 * @param fruitname
 * @returns {*}
 */
function findFruit(fruitname){
	for(var i = 0; i < fruits.length; i++) {
		if(fruits[i].name == fruitname)
			return fruits[i];
	}
	return null;
}

/**
 * Modifies the price of our fruit.
 * @param price
 * @returns {*}
 */
function randomChange(price){
	number = randomNumber(0,1);
	if (number === 0){
		price += 0.50;
		if(price > 9.99){
			price -= 1;
		}
	} else {
		price -= 0.50;
		if(price < 0.50){
			price += 1;
		}
	}
	console.log(price);
	return price;
}

/**
 * Pushes our values out to the DOM
 */
function updateUI() {
	//Get our fruits
	var apple = findFruit("Apple");
	var orange = findFruit("Orange");
	var banana = findFruit("Banana");
	var pear = findFruit("Pear");

	//Update apple related stuff
	var appleItem = myUser.getInventoryItem(apple);
	if(appleItem != null) {
		$("#avgApplePrice").text(myUser.getAvgPrice(apple));
		$("#appleBadge").text(appleItem.history.length);
	}
	$("#applePrice").text(apple.currentPrice);

	var orangeItem = myUser.getInventoryItem(orange);
	if(orangeItem != null) {
		$("#avgOrangePrice").text(myUser.getAvgPrice(orange));
		$("#orangeBadge").text(orangeItem.history.length);
	}
	$("#orangePrice").text(orange.currentPrice);

	var bananaItem = myUser.getInventoryItem(banana);
	if(bananaItem != null) {
		$("#avgBananaPrice").text(myUser.getAvgPrice(banana));
		$("#bananaBadge").text(bananaItem.history.length);
	}
	$("#bananaPrice").text(apple.currentPrice);

	var pearItem = myUser.getInventoryItem(pear);
	if(pearItem != null) {
		$("#avgPearPrice").text(myUser.getAvgPrice(pear));
		$("#pearBadge").text(pearItem.history.length);
	}
	$("#pearPrice").text(pear.currentPrice);

}
