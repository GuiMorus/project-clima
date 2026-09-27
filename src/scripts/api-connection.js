// Declarando variáveis
const baseURL = "https://api.weatherapi.com/v1"
const key = "620292f288044cbdb84235050262609"

async function fetchWeather({cidade}){
    const search = `${baseURL}/forecast.json?`
    const response = await fetch(`${search}key=${key}&q=${cidade}&days=6&lang=pt`)
    const data = await response.json()

    console.log(data.forecast)
}

fetchWeather({cidade: "Sao Paulo"})
