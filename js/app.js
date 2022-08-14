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
function OddProduct(name, fileExtension, timesClicked, timesViewed) {
  // name of the product
  this.name = name;

  // src for use in linking to the file in the img folder
  this.src = `./img/${this.name}.${fileExtension}`;

  this.fileExtension = fileExtension;
  // total times product has been clicked
  this.timesClicked = timesClicked;

  // total times product has been displayed to user
  this.timesViewed = timesViewed;
}


// FUNCTIONS

// helper function to 1. instantiate an OddProduct and 2. push that product into the allProducts[] array
function makeOddProduct(name, fileExtension = 'jpg', timesClicked = 0, timesViewed = 0)
{
  // gets name and fileExtension and passes it into constructor
  // fileExtension defaults to be .jpg, in case no parameter is passed in
  let anOddProduct = new OddProduct (name, fileExtension, timesClicked, timesViewed);

  // pushes the product into the allProducts[] array
  allProducts.push(anOddProduct);
}

// this function will see if there are products already stored in local storage
function getOddProducts()
{
  // check if there are products in storage
  let potentialProducts = localStorage.getItem('products');

  // if there are no products in to get from potentialProducts, potentialProducts will be 'null'

  // truth-y if there are orders; false-y if null
  if(potentialProducts)
  {
    // revert the 'potentialProducts' string into POJO objects
    let parsedProducts = JSON.parse(potentialProducts);

    // revert the parsed objects back into OddProduct instances using the makeOddProduct() helper function

    for (let product of parsedProducts)
    {
      // extract the properties and such from the POJOs
      let name = product.name;
      let fileExtension = product.fileExtension;
      let timesClicked = product.timesClicked;
      let timesViewed = product.timesViewed;

      // debug logs
      console.log(`parsed ${name}: ${product.name}`);
      console.log(`parsed ${fileExtension}:${product.fileExtension}`);
      console.log(`parsed ${timesClicked}:${product.timesClicked}`);
      console.log(`parsed ${timesViewed}:${product.timesViewed}`);

      // reinstantiate the OddProducts using the makeOddProduct() helper function (which'll repopulate the allProducts[] array)
      makeOddProduct(name, fileExtension, timesClicked, timesViewed);
    }
  }
  // if there are no odd products in local storage
  else
  {
    // make all of these products
    makeOddProduct('bag');
    makeOddProduct('banana');
    makeOddProduct('bathroom');
    makeOddProduct('boots');
    makeOddProduct('breakfast');
    makeOddProduct('bubblegum');
    makeOddProduct('chair');
    makeOddProduct('cthulhu');
    makeOddProduct('dog-duck');
    makeOddProduct('dragon');
    makeOddProduct('pen');
    makeOddProduct('pet-sweep');
    makeOddProduct('scissors');
    makeOddProduct('shark');
    makeOddProduct('sweep', 'png');
    makeOddProduct('tauntaun');
    makeOddProduct('unicorn');
    makeOddProduct('water-can');
    makeOddProduct('wine-glass');
  }
  // render the objects
  renderProducts();
}

// function to store OddProducts in the allProducts[] array into localStorage
function storeOddProducts()
{
  // `localStorage` needs a  `key` (label), like a box, to put things into
  // 'products' will be the key
  // JSON.stringify() to turn the allProducts[] array into a JSON string
  let stringifiedProducts = JSON.stringify(allProducts);

  // set (.setItem) the stringified string into localStorage
  localStorage.setItem('products', stringifiedProducts);
}

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

      // store statistics for OddProducts into localStorage
      storeOddProducts();
    }
  }
}

// EXECUTABLE CODE



// event listener for the container of my images
// when user clicks on an image in my container, call the handleProductClick() function
getOddProducts();

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
