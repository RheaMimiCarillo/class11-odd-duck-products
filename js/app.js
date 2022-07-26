'use strict';

console.log('hi friend, how\'s it going? c:');
// variable for how many rounds the user has left before the session ends
let roundsRemaining = 25;

// array to store OddProduct objects
// use include function later
let allProducts = [];


// constructor to instantiate products with images and voting statistics
function OddProduct(name, fileExtension = 'jpg')
{
  // name of the product
  this.name = name;

  // src for use in linking to the file in the img folder
  this.src = `../img/${this.name}.${fileExtension}`;

  // total times product has been clicked
  this.timesClicked = 0;

  // total times product has been displayed to user
  this.timesViewed = 0;
}


// hard coded OddProducts
let bag = new OddProduct('bag');
let banana = new OddProduct('banana');
let bathroom = new OddProduct('bathroom');
let boots = new OddProduct('boots');
let breakfast = new OddProduct('breakfast');
let bubblegum = new OddProduct('bubblegum');
let chair = new OddProduct('chair');
let cthulhu = new OddProduct('cthulhu');
let dogDuck = new OddProduct('dog-duck');
let dragon = new OddProduct ('dragon');
let pen = new OddProduct ('pen');
let petSweep = new OddProduct('pet-sweep');
let scissors = new OddProduct('scissors');
let shark = new OddProduct('shark');
let sweep = new OddProduct('sweep', 'png');
let tauntaun = new OddProduct('tauntaun');
let unicorn = new OddProduct('unicorn');
let waterCan = new OddProduct('water-can');
let wineGlass = new OddProduct('wine-glass');


// push all instantiated products into
allProducts.push(
  bag,
  banana,
  bathroom,
  boots,
  breakfast,
  bubblegum,
  chair,
  cthulhu,
  dogDuck,
  dragon,
  pen,
  petSweep,
  scissors,
  shark,
  sweep,
  tauntaun,
  unicorn,
  waterCan,
  wineGlass
);

console.log(`the name of bag in product array is ${allProducts[0].name}`);


// call renderProducts() function that will display 3 random products

// write event listener for the container of my images
// when user clicks on an image in my container, call the handleProductClick() function
// ex.: myContainer.addEventListener('click', handleProductClick());
