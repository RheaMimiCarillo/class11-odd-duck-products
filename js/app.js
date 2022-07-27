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

// will display images to the user of odd products
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
    console.log('incrementing allProducts[]');
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

    // display 3 new products to the user
    renderProducts();

    // if the user votes as many times as clicksAllowed
    if (totalClicks === clicksAllowed)
    {
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

// event listener for the container of my images
// when user clicks on an image in my container, call the handleProductClick() function
renderProducts();

// add click event listener to the <section> where the images will display
myContainer.addEventListener('click', handleProductClick);


// CHART.JS

// got help with random colors: https://stackoverflow.com/a/25709983
function getRandomColor()
{
  let letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ )
  {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderChart()
{
  // make 3 arrays for survey data
  let productNames=[];
  let productViews=[];
  let productClicks=[];

  for (let i = 0; i < allProducts.length; i++)
  {
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
  const myChart = new Chart(document.getElementById('myChart'),config);

}
