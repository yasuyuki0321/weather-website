const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Yasuyuki Kikuchi',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Yasuyuki Kikuchi',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is same helpful text.',
    name: 'Yasuyuki Kikuchi',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address.',
    });
  } else {
    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          } else {
            res.send({
              forecast: forecastData,
              location,
              address,
            });
          }
        });
      }
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term.',
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Yasuyuki Kikuchi',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Yasuyuki Kikuchi',
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
