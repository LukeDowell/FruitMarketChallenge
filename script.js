$(document).ready(function(){

	var myUser = new User();

	$("#allthefruits").on("click", ".buy", function(){
		var fruitname = $(this).parent().find(".fruitname").text();
		var fruit = findFruit(fruitname);
		myUser.buyFruit(fruit);
		console.log(myUser);
	});

	fruits.push(new Fruit("Apple"));
	fruits.push(new Fruit("Banana"));
	fruits.push(new Fruit("Orange"));
	fruits.push(new Fruit("Pear"));

	setInterval(function(){
		for(var i = 0; i < fruits.length; i++) {
			var currentPrice = fruits[i].currentPrice;
			fruits[i].currentPrice = randomChange(currentPrice);
		}
	}, 15000);
});

var fruits = []; //Our different kinds of fruit

/**
 * Describes a single user on our site. Holds all their personal
 * information.
 * @constructor
 */
function User(){
	this.inventory = [];
	this.cash = 100.00;
	this.hasFruit = function(fruit){
		for(var i = 0; i < this.inventory.length; i++) {
			if(this.inventory[i].fruit.name === fruit.name) {
				return true; //Yes fruit
			}
		}
		return false; //No fruit
	};
	this.buyFruit = function(fruit){
		if(this.hasFruit(fruit)){
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