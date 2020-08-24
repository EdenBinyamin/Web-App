const cheerio = require("cheerio");

function parseAll(html){
    const $ = cheerio.load(html)
    checkBadAddress = $("body > div.wrapper > div.main-content-div > header > div.bn-header__wrap.fixed > div > section.headline-banner__wrap > div > h1").text()
    if(!checkBadAddress.substring(0,7).localeCompare("Unknown")){
        return {error: checkBadAddress}
    }
    const weather = $("div.h2").text()
    let name = $("body > div.wrapper > div.main-content-div > header > div.bn-header__wrap.fixed > div > section.headline-banner__wrap > div > h1").text();
    name = name.substring(11).trim()
    const humadity = $("body > div.wrapper > div.main-content-div > main > article > section.bk-focus > div.bk-focus__info > table > tbody > tr:nth-child(6) > td").text()
    const windSpeed = $("#wt-48 > tbody > tr:nth-child(5) > td:nth-child(8)").text()
    firstLink = $("body > div.wrapper > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2) > div:nth-child(2) > h3 > a").attr("href")
    firstLinkName = $("body > div.wrapper > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2) > div:nth-child(2) > h3 > a").text()
    secondLink = $("body > div.wrapper > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2) > div:nth-child(3) > h3 > a").attr("href")
    secondLinkName = $("body > div.wrapper > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2) > div:nth-child(3) > h3 > a").text()
    thirdLink = $("body > div.wrapper > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2) > div:nth-child(4) > h3 > a").attr("href")
    thirdLinkName = $("body > div.wrapper > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2) > div:nth-child(4) > h3 > a").text()
    iconWeather = $('#cur-weather').attr('src')
    citiesNearByMessage = ''
    if(firstLinkName.localeCompare('')) {
        citiesNearByMessage = 'Click below for nearby cities weather!'
    }
    const weatherDetails = {
        name: name,
        humadity: humadity,
        windSpeed: windSpeed,
        weather: weather,
        iconWeather: iconWeather,
        firstLink: firstLink,
        firstLinkName: firstLinkName,
        secondLink: secondLink,
        secondLinkName: secondLinkName,
        thirdLink: thirdLink,
        thirdLinkName: thirdLinkName,
        citiesNearByMessage: citiesNearByMessage
    }
    return weatherDetails
}

module.exports = parseAll