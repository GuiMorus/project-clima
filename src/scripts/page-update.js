import * as dom from "./dom-connections.js"

// Iniciando variáveis
const nextDays = [dom.nextFirst, dom.nextSecond, dom.nextThird, dom.nextFourth, dom.nextFifth]
let count = 0

// Atualizando as informações da página com os dados da API

export async function pageUpdate(data) {
    // Modificando card principal
    dom.city.textContent = data.city
    dom.country.textContent = data.country
    dom.date.textContent = data.date
    dom.week.textContent = data.week
    dom.iconWeather.src = data.icon
    dom.weather.textContent = `${convertSymbol(data.temp)}ºC`
    dom.status.textContent = data.status

    dom.sensation.textContent = `${convertSymbol(data.sensation)}ºC`
    dom.humidity.textContent = `${convertSymbol(data.humidity)}%`
    dom.wind.textContent = `${convertSymbol(data.wind)} km/h`

    // Modificando cards de próximos dias
    for(let day of nextDays){
        day.querySelector('p').textContent = data.next[count].week
        day.querySelector('img').src = data.next[count].icon
        day.querySelector('strong').innerHTML = `${convertSymbol(data.next[count].max)}º / <span>${convertSymbol(data.next[count].min)}°</span>`
        day.querySelector('small').textContent = data.next[count].status
        count++
    }

    // Resetando contador
    count = 0
}

function convertSymbol(text){
    return String(text).replace(".", ",")
}
