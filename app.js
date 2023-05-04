const { error } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials')); // registrar parciales

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
async function getBeersAsync(response) {
  try {
    const beerArr = await punkAPI.getBeers();
    console.log('beerArr', beerArr);
    response.render('beers', { beerArr ,diffInfo:true});
  } catch (error) {
    console.log(error);
  }
}

app.get('/beers', (req, res) => {
  getBeersAsync(res);
});
app.get('/beers/beer/:id', (req, res) => {
 
  punkAPI.getBeer(req.params.id).then((response)=>{
    console.log('response',response);
      res.render('random-beer', { randomBeer: response[0],diffInfo:false }); // reuso el de random beer
    
  });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(response => {
      //este metodo devuelve un array
      console.log(response, 'response');
      res.render('random-beer', { randomBeer: response[0],diffInfo:true });
    })
    .catch(error => {
      console.log(error);
    });
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
