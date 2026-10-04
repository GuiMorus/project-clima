import * as dom from "./dom-connections.js"
import {gradientList} from "./code-gradient-list.js"

// Iniciando variáveis
const nextDays = [dom.nextFirst, dom.nextSecond, dom.nextThird, dom.nextFourth, dom.nextFifth]
let count = 0

// Atualizando as informações da página com os dados da API

export async function pageUpdate(data) {
    // Modificando card principal
    dom.mainCard.style.background = gradientList[data.code]
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
        const nextDay = data.next[count]

        day.querySelector('p').textContent = nextDay?.week ?? "não informado"
        day.querySelector('img').src = nextDay?.icon ?? "./src/assets/img/alert.svg"
        day.querySelector('strong').innerHTML = nextDay
            ? `${convertSymbol(nextDay.max)}º / <span>${convertSymbol(nextDay.min)}°</span>`
            : "0"
        day.querySelector('small').textContent = nextDay?.status ?? "não informado"

        count++
    }

    // Resetando contador
    count = 0
}

function convertSymbol(text){
    return String(text).replace(".", ",")
}
