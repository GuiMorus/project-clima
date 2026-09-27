// Declarando variáveis
const baseURL = "https://api.weatherapi.com/v1"
const key = "620292f288044cbdb84235050262609"

// Conectando API e resgatando os dados de clima da cidade
export async function fetchWeather({location}){
    const request = `${baseURL}/forecast.json?`
    const response = await fetch(`${request}key=${key}&q=${encodeURIComponent(location)}&days=6&lang=pt`)
    const data = await response.json()
    
    return data
}
