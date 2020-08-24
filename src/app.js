const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectionPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static diractory to serve
app.use(express.static(publicDirectionPath))


app.get('', async (req, res)=>{
    firstMainCityforecastData = await geocode('tel-aviv, israel')
    secondMainCityForcastData = await geocode('new-york, usa')

    res.render('index',{
        title:'Weather App',
        firstMainCityName: firstMainCityforecastData.name,
        firstMainCityHumidity: firstMainCityforecastData.humadity,
        firstMainCityWindSpeed: firstMainCityforecastData.windSpeed,
        firstMainCityWeather: firstMainCityforecastData.weather,
        firstMainCityIconWeather: firstMainCityforecastData.iconWeather,
        secondMainCityName: secondMainCityForcastData.name,
        secondMainCityHumidity: secondMainCityForcastData.humadity,
        secondMainCityWindSpeed: secondMainCityForcastData.windSpeed,
        secondMainCityWeather: secondMainCityForcastData.weather,
        secondMainCityIconWeather: secondMainCityForcastData.iconWeather,
        name:'Eden Binyamin',
        check: 'none'
    })
})


app.get('/weather', async (req, res) => {
    address = req.query.address
    forecastData = await geocode(address)
    if(forecastData.error)
    {
        return res.send({
            error: forecastData.error.substring(0,14) + '. Please try writing the address in a city, country form.'
        })
    }
    if(address === ','){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    return res.send({
        name: forecastData.name,
        humidity: forecastData.humadity,
        windSpeed: forecastData.windSpeed,
        temperature: forecastData.weather,
        iconWeather: forecastData.iconWeather,
        firstLink: forecastData.firstLink,
        firstLinkName: forecastData.firstLinkName,
        secondLink: forecastData.secondLink,
        secondLinkName: forecastData.secondLinkName,
        thirdLink: forecastData.thirdLink,
        thirdLinkName: forecastData.thirdLinkName,
        citiesNearByMessage: forecastData.citiesNearByMessage
    })
})

app.get('/weather/*', async (req, res) => {
    console.log(req._parsedOriginalUrl.path)
    pathAddress = req._parsedOriginalUrl.path
    country = pathAddress.substring(9)
    city = country.substring(country.search('/'))
    city = city.substring(1)
    address = city + ', ' + country 
    forecastData = await geocode(address)
    return res.send({
        name: forecastData.name,
        humidity: forecastData.humadity,
        windSpeed: forecastData.windSpeed,
        temperature: forecastData.weather,
        iconWeather: forecastData.iconWeather,
        firstLink: forecastData.firstLink,
        firstLinkName: forecastData.firstLinkName,
        secondLink: forecastData.secondLink,
        secondLinkName: forecastData.secondLinkName,
        thirdLink: forecastData.thirdLink,
        thirdLinkName: forecastData.thirdLinkName
    })
})




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help artictle was not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log('Server is up on ' + port +'.')
})