'use strict';

console.log('hi friend, how\'s it going? c:');


// GLOBAL VARIABLES:

// variable for how many rounds the user has left before the session ends
const clicksAllowed = 25;
let totalClicks = 0;

// array to store OddProduct objects
// use include function later
let allProducts = [];

// array to store the index of products
let indexArray = [];

// windows into the DOM
let myContainer = document.getElementById('images');
// '+' selects siblings
let myButton = document.getElementById('resultsButton');
let resultsList = document.querySelector('ul');

// grab image elements
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');

// todo: put images into an array
let imageArray = [
  leftImage,
  centerImage,
  rightImage
];

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

// will display images of odd products to the user
function renderProducts()
{
  // fill the indexArray with 6 random numbers
  while (indexArray.length < 6)
  {
    // get a random number
    let randNum = getRandomProduct();

    // if the number isn't in the array, yet
    if(!indexArray.includes(randNum))
    {
      // push it into the array
      indexArray.push(randNum);
    }

    // push the unique number into the array
  }

  for(let i = 0; i < imageArray.length; i++)
  {
    let oddDuckNum = indexArray.shift(i);
    changeSrc(i, oddDuckNum);
  }

  // change src, alt, and timesViewed property of the product at i
  function changeSrc(i, oddDuckNum)
  {
    imageArray[i].src = allProducts[oddDuckNum].src;
    imageArray[i].alt = allProducts[oddDuckNum].name;
    allProducts[oddDuckNum].timesViewed++;
  }
}

// one event handler function doing multiple things
function handleProductClick(event)
{
  if (!event.target.alt)
  {
    alert('Please pick a product!');
  // increment counter each time the user votes
  }
  else
  {
    totalClicks++;

    // get the alt tag of the clicked image
    let clickedProduct = event.target.alt;
    console.log('clicked product: ' + clickedProduct);

    // traverse through allProducts[]
    for (let i = 0; i < allProducts.length; i++)
    {
    // if the name of the product clicked is the same as the .name of the product in this index of the array
      if (clickedProduct === allProducts[i].name)
      {
        console.log(`${clickedProduct} clicked. incrementing ${allProducts[i].name} times clicked from ${allProducts[i].timesClicked} to ${allProducts[i].timesClicked + 1}`);
        // increment that product's timesClicked property
        allProducts[i].timesClicked++;

        // break, because we don't have to check the rest of the array
        break;
      }
    }

    if (totalClicks === clicksAllowed)
    {
      // if times user has clicked an image equals the limit of clicks allowed
      // remove the click event listener from myContainer
      myContainer.removeEventListener('click', handleProductClick);
      alert('Thanks for completing the survey');

      // add new event listener to myButton
      myButton.addEventListener('click', handleResultsButtonClick);
    }
  }
  // display 3 new products
  renderProducts();
}

// button is only 'clickable' if the user finished 25 rounds of choosing products
function handleResultsButtonClick()
{
  console.log('in handle results');
  renderResults();
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

renderProducts();

// add click event listener to the <section> where the images will display
myContainer.addEventListener('click', handleProductClick);
