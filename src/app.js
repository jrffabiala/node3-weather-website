const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const directoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(directoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John Rick'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'John Rick'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        name: 'John Rick',
        message: 'Help message'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'No address provided'
        })
    }
    
    geocode(address, (error, geocodeData = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(geocodeData, (error, forecastData) => {
            if (error) {
                return res.send({ error: 'Error in forecast' });
            }

            res.send({
                forecast: forecastData,
                location: geocodeData.location,
                address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'This is an error'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('errorView', {
        errorMessage: 'Help article not found'
    });    
});

app.get('*', (req, res) => {
    res.render('errorView', {
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});