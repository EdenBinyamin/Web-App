const parser = require('../webcrawling/parser')
const httpRequest = require('../webcrawling/httpRequest')

const geocode = async (address) => {
    city = address.substring(0, address.search(',')).trim()
    country = address.substring(address.search(', ')).trim()
    country = country.substring(2)
    url = 'https://www.timeanddate.com/weather/' + country + '/' + city;
    html = await httpRequest(url);
    parsedUrl = await parser(html)
    return parsedUrl;
}
module.exports = geocode