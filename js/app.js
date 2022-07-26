'use strict';

console.log('hi friend, how\'s it going? c:');


// GLOBAL VARIABLES:

// variable for how many rounds the user has left before the session ends
const clicksAllowed = 25;
let totalClicks = 0;

// array to store OddProduct objects
// use include function later
let allProducts = [];

// windows into the DOM
let myContainer = document.getElementById('images');
// '+' selects siblings
let myButton = document.querySelector('section + div');
let resultsList = document.querySelector('ul');

// grab image elements
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');

// CONSTRUCTOR:
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



// FUNCTIONS

// this function returns a random number associated with an item in the allProducts[] array
function getRandomProduct()
{
  return Math.floor(Math.random() * allProducts.length);
}

// will display images to the user of odd products
function renderProducts()
{
  // get 3 random nummbers for goat array
  let odd1 = getRandomProduct();
  let odd2 = getRandomProduct();
  let odd3 = getRandomProduct();

  // loop to make sure duplicates of products don't appear in a single round
  // todo: make this condition encompass all three products
  while (odd1 === odd2)
  {
    odd2 = getRandomProduct();
  }
  while (odd3 === odd1 || odd3 === odd2)
  {
    odd3 = getRandomProduct();
  }

  // todo: add code to link img src to odd 1, 2 and 3
  leftImage.src = allProducts[odd1].src;
  leftImage.alt = allProducts[odd1].name;
  // increment timesViewed property
  allProducts[odd1].timesViewed++;

  centerImage.src = allProducts[odd2].src;
  centerImage.alt = allProducts[odd2].name;
  allProducts[odd2].timesViewed++;

  rightImage.src = allProducts[odd3].src;
  rightImage.alt = allProducts[odd3].name;
  allProducts[odd3].timesViewed++;
}


// one event handler function doing multiple things
function handleProductClick(event)
{
  // increment counter for times clicked
  totalClicks++;

  // get the name of the clicked image from the alt tag of the image displayed
  let clickedProduct = event.target.alt;

  for (let i = 0; i < allProducts.length; i++)
  {
    if (clickedProduct === allProducts.name[i].name)
    {
      // if the name of the product clicked is the same as the name of the product in this index of the array
      allProducts.timesClicked++;
      break;
    }
  }

  renderProducts();

  if (totalClicks === clicksAllowed)
  {
    // if times user has clicked an image equals the limit of clicks allowed

    // change myButton's class name to clicks-allowed
    myButton.className = 'clicks-allowed';

    // remove the click event listener from myContainer
    myContainer.removeEventListener('click', handleProductClick);

    // add new event listener to myButton
    myButton.addEventListener('click', handleResultsButtonClick);
  }
}

// button is only 'clickable' if the user finished 25 rounds of choosing products
function handleResultsButtonClick()
{
  if (totalClicks === clicksAllowed)
  {
    renderResults();
  }
}

// make the array to show stats of products chosen by user
function renderResults()
{
  for (let i = 0; i < allProducts.length; i++)
  {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].timesViewed} views and was clicked on ${allProducts[i].timesClicked} times.`;
    resultsList.appendChild(li);
  }
}

// EXECUTABLE CODE

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


// push all instantiated products into array
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


renderProducts();

// add click event listener to the <section> where the images will display
myContainer.addEventListener('click', handleProductClick);
