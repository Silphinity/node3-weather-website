const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'WEATHER',
        name: 'Sean Hurwitz'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'ABOUT ME',
        name: 'Sean Hurwitz'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        message: 'Help! I need somebody!',
        pic: 'head',
        title: 'HELP',
        name: 'Sean Hurwitz'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please enter an address!'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {summary, temperature, rainfall, windSpeed} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                summary,
                temperature,
                rainfall,
                windSpeed
            })
            })
        }
    )
    
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 ERROR',
        error: 'Help Article Not Found',
        name: 'Sean Hurwitz'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        error: 'Page does not Exist',
        name: 'Sean Hurwitz'
    })
})

//This opens up a port for the website on a local machine
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})