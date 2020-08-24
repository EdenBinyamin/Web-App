const weatherForm = document.querySelector('form')
const linksContatier=document.querySelector('div')
const search = document.querySelector('input')
const cityName = document.querySelector('#city-name')
const cityHumidity = document.querySelector('#city-humidity')
const cityWindSpeed = document.querySelector("#city-wind-speed")
const cityTemparture = document.querySelector("#city-temperature")
const img = document.getElementById("search-city-icon")
const searchedCity = document.querySelector("#searched-city")
const firstLink = document.getElementById("first-link")
const secondLink = document.getElementById("second-link")
const thirdLink = document.getElementById("third-link")
const links = document.getElementById("links-container").children;
message = document.querySelector("#link-bellow-message")
let searchedLocation = '';

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (e) => {
        e.preventDefault();
        const linkText = e.target.innerText;
        let cityNameForSearch = e.target.innerText;
        country = searchedLocation
        searchWeatherForCity(makeStringSearchable(cityNameForSearch, country))
    })
}

function makeStringSearchable(city, country){
    city = city.replace(/[^a-zA-Z ]/g, '');
    city = city.replace(' ','-')
    city = city.toLowerCase()
    country = country.substring(country.search(','))
    country = country.substring(2)
    return `${city}, ${country}`
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    searchedLocation = location;
    cityToSearch = location.substring(0, location.search(','))
    searchWeatherForCity(makeStringSearchable(cityToSearch,location));
})

function searchWeatherForCity(location) {
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            searchedCity.textContent = data.error
        } else {
            cityName.textContent = data.name;
            img.src = data.iconWeather
            img.width = '80'
            img.height = '80'
            cityHumidity.textContent="Humidiy: "+data.humidity
            cityWindSpeed.textContent="Wind Speed: "+data.windSpeed
            cityTemparture.textContent="Currently: "+data.temperature
            searchedCity.style.display='flex'
            firstLink.href = data.firstLink
            firstLink.textContent = data.firstLinkName
            secondLink.href = data.secondLink
            secondLink.textContent = data.secondLinkName
            thirdLink.href = data.thirdLink
            thirdLink.textContent = data.thirdLinkName
            message.textContent = data.citiesNearByMessage
        }
    })
})
}