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
// it's a "queue"
let indexArray = [];

// windows into the DOM
let myContainer = document.getElementById('images');

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
function OddProduct(name, fileExtension = 'jpg') {
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
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// will display images to the user of odd products
function renderProducts() {
  // fill the indexArray with 6 random numbers in a queue
  while (indexArray.length < 6) {
    // get a random number
    let randNum = getRandomProduct();

    // if the number isn't in the array, yet
    if (!indexArray.includes(randNum)) {
      // push random number into the array
      indexArray.push(randNum);
    }
  }

  // let odd1 = indexArray.shift();
  // let odd2 = indexArray.shift();
  // let odd3 = indexArray.shift();

  // leftImage.src = allProducts[odd1].src;
  // leftImage.alt = allProducts[odd1].name;
  // allProducts[odd1].timesViewed++;

  // centerImage.src = allProducts[odd2].src;
  // centerImage.alt = allProducts[odd2].name;
  // allProducts[odd2].timesViewed++;

  // rightImage.src = allProducts[odd3].src;
  // rightImage.alt = allProducts[odd3].name;
  // allProducts[odd3].timesViewed++;


  // loop through the array with our 3 image elements, change alt, src, and times viewed for each
  for (let i = 0; i < imageArray.length; i++) {
    let oddDuckNum = indexArray.shift(i);
    changeSrc(i, oddDuckNum);
  }

  // change src, alt, and timesViewed property of the product at idx
  function changeSrc(idx, oddDuckNum) {
    imageArray[idx].src = allProducts[oddDuckNum].src;
    imageArray[idx].alt = allProducts[oddDuckNum].name;
    console.log('incrementing allProducts[]');
    allProducts[oddDuckNum].timesViewed++;
  }

}
// one event handler function doing multiple things
function handleProductClick(event) {
  if (!event.target.alt) {
    alert('Please pick a product!');
    // increment counter each time the user votes
  }
  else {
    totalClicks++;

    // get the alt tag of the clicked image
    let clickedProduct = event.target.alt;
    console.log('clicked product: ' + clickedProduct);

    // traverse through allProducts[]
    for (let i = 0; i < allProducts.length; i++) {
      // if the name of the product clicked is the same as the .name of the product in this index of the array
      if (clickedProduct === allProducts[i].name) {
        console.log(`${clickedProduct} clicked. incrementing ${allProducts[i].name} times clicked from ${allProducts[i].timesClicked} to ${allProducts[i].timesClicked + 1}`);
        // increment that product's timesClicked property
        allProducts[i].timesClicked++;

        // break, because we don't have to check the rest of the array
        break;
      }
    }

    // display 3 new products to the user
    renderProducts();

    // if the user votes as many times as clicksAllowed
    if (totalClicks === clicksAllowed) {
      // remove the click event listener from myContainer
      myContainer.removeEventListener('click', handleProductClick);
      alert('Thanks for completing the survey');
      // render the chart
      renderChart();
    }
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
let dragon = new OddProduct('dragon');
let pen = new OddProduct('pen');
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

// event listener for the container of my images
// when user clicks on an image in my container, call the handleProductClick() function
renderProducts();

// add click event listener to the <section> where the images will display
myContainer.addEventListener('click', handleProductClick);


// CHART.JS

// got help with random colors: https://stackoverflow.com/a/25709983
function getRandomColor() {
  let letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderChart() {
  // make 3 arrays for survey data
  let productNames = [];
  let productViews = [];
  let productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    // push these values into the above arrays
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].timesViewed);
    productClicks.push(allProducts[i].timesClicked);
  }

  const data =
  {
    // x axis has the names of each product
    labels: productNames,

    // an array of objects
    // each object will be it's own thing on the chart
    datasets:
      [
        {// first set of bars
          // the name for this metric
          label: 'Views',
          // the numbers
          data: productViews,
          // the color of the background in the chart
          backgroundColor: getRandomColor(),
          // the color of the borders of each bar
          // the border of each bar will refresh with a new color upon hover
          borderColor: getRandomColor,
          // how wide the border is
          borderWidth: 1,
        },
        {// second set of bars
          label: 'Likes',
          data: productClicks,
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor,
          borderWidth: 1,
        }
      ]
  };


  // config object with options for the chart
  const config =
  {
    type: 'bar',
    data: data,
    options:
    {
      scales:
      {
        y:
        {
          beginAtZero: true
        }
      }
    },
  };

  // new Chart object with parameters
  // eslint-disable-next-line no-unused-vars, no-undef
  const myChart = new Chart(document.getElementById('myChart'), config);

}


/* Dropdown stuff and storing local data*/

// GLOBAL VARIABLES
// drink array
let drinkOrder = [];

// get dom elements of form and ul
let coffeeForm = document.querySelector('form');
let resultsList = document.querySelector('ul');

// CONSTRUCTORS

// make a new drink
function Drink(name, drinkType, milk, size)
{
  this.name = name;
  this.drinkType = drinkType;
  this.milk = milk;
  this.size = size;
}

// create a prototype function on our constructor to add LI with drink info

// prototype syntax:
// ObjectName.prototype.nameOfFunction = function()
// {
//   code goes here
// }
Drink.prototype.renderADrink = function()
{
  // code to make li elements to <ul>
}

// GLOBAL FUNCTIONS

// helper function to make new drinks
function makeADrink(name, drinkType, milk, size)
{
  // instantiate a new drink
  let drinkObj = new Drink(name, drinkType, milk, size);

  // push drink to array
  drinkOrder.push(drinkObj);

  // render list items with drink info
  drinkObj.renderADrink();
}


function getDrinks()
{
  // check if drinks (order) is in storage
  let potentialOrders = localStorage.getItem('orders');

  // if no orders, order will be 'null'

  // if there are drinks, we turn them back into objects
  // will evaluate as a 'truthy' value in JS
  if (potentialOrders)
  {
    // turn potential orders back into JS objects (POJOs)
    let parsedOrders = JSON.parse(potentialOrders);
    // parsed order returns an array of POJOs

    // turned them back Drink objects AKA Reinstantiate


    // declare 'order' instead of doing 'i' and stuff
    // 'order' is the actual object we pass into the loop
    // for of loop example:
    for (let order of parsedOrders)
    {
      // makeADrink(name,drinkType,milk,size)

      // extract the values from the POJOs
      let name = order.name;
      let drinkType = order.drinkType;
      let milk = order.milk;
      let size = order.size;

      // pass the extracted values into our helper function that will reinstantiate the drink objects
      makeADrink(name,drinkType,milk,size);
    }
  }

  // if there are no drinks...:
}

// function to put drinks into local storage
function storeDrinks()
{
  // KEY (label) to put things into local storage

  // 'pack' items to put them into Local Storage
  // use JSON.stringify() to turn it into a String
  // 'orders' is they key

  // stringify a copy of the drinkOrder array into a JSON string
  let stringifiedOrders = JSON.stringify(drinkOrder);


  // 'pack' (set) orders into localStorage
  localStorage.setItem('orders', stringifiedOrders);
}

// EVENT HANDLER

function handleSubmitForm(event)
{
  event.preventDefault();

  // get customer's name from text input
  let customerName = event.target.name.value;

  // get customer's drink size from dropdown menu
  let drinkType = event.target.drinkType.value;

  // user input to make a drink object
  makeADrink(customerName, drinkType);
}

// EXECUTABLE CODE
coffeeForm.addEventListener('submit', handleSubmitForm);


// LOCAL STORAGE
// make coffee order persist
// goal: if there are drink orders stored, load those drinks. if not, load the page to input drinks
// in odd ducks: products will be stored
/* timeline:

  > user goes to the page

  > check local storage for products
    > (look for 'box' labeled "products" (-getItem()))
    > if there are no products, generate products
      > create new products
    > if there are products: load those products
      > unpack them > put them into product array
    > alternatively, delete the old products from local storage
      > delete old products, generate new products

  > user reloads page
    > The products are generated again! (oh no!)
    > to avoid this

  > user votes

  > render results

  > repack our localStorage box and add label tot he box "products"
  > put it into storage (.set(item))
*/

// JSON
/*
  JSON is always in caps!

  How to 'pack' items into LocalStorage:
    JSON.stringify();
      - turn JS into a JSON and then a String of JSON

  How to 'unpack' items we retrieve from LocalStorage
    JSON.parse();
      - revert a JSON string back into JS
      - by itself, .parse() will parse into POJOs
        - to avoid this problem, we'll reinstantiate our parsed object

POJO = Plain Old JavaScript Object

reinstantiation:
  - turn revert parsed string into an instance of the object

  ODD DUCK NOTEs!
  - look out for that one object that is a .png and how it plays with reinstantiating....?
  - find a way to clear views and votes for objects from old sessions on page reload
*/
