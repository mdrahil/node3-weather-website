const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Md Rahil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is Help Page',
        name: 'Md Rahil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Md Rahil'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address must be supplied.'
        })
    }

    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(lattitude, longitude, (forecastError, forecast) => {

            if (error) {
                return res.send({ forecastError })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })

        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Md Rahil',
        errorMessage: 'Help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Md Rahil',
        errorMessage: 'Page Not found'
    })
})



app.listen(3000, () => {
    console.log('server is up on port 3000');

})