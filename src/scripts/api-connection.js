import dayjs from "dayjs"
import "dayjs/locale/pt-br"

// Declarando variáveis
const baseURL = "https://api.weatherapi.com/v1"
const key = "620292f288044cbdb84235050262609"

// Conectando API e resgatando os dados de clima da cidade
async function apiConnection(local){
    try{
        const request = `${baseURL}/forecast.json?`
        const response = await fetch(`${request}key=${key}&q=${encodeURIComponent(local)}&days=6&lang=pt`)
        const data = await response.json()
    
        return data

    }catch(error){
        alert("Não foi possível se conectar com a API - tente novamente mais tarde")
        console.log(error)
    }
}

export async function fetchWeather(local){
    try{
        // Chamando API
        const data = await apiConnection(local)

        // Separando os dados da API
        const location = data.location
        const current = data.current
        const forecast = data.forecast.forecastday

        // Objeto com as informações da API
        const date = location.localtime.split(" ")[0]
        const formattedDate = dayjs(date).locale("pt-br")
        const nextFirst = forecast[1]
        const nextSecond = forecast[2]
        const nextThird = forecast[3]
        const nextFourth = forecast[4]
        const nextFifth = forecast[5]

        const weatherDatas = {
            // Clima do dia atual
            city: location.name,
            contry: location.country,
            date: formattedDate.format("DD [de] MMMM [de] YYYY"),
            week: formattedDate.format("dddd"),
            icon: current.condition.icon.replace("64x64", "128x128"),
            temp: current.temp_c,
            status: current.condition.text,
            sensation: current.feelslike_c,
            humidity: current.humidity,
            wind: current.wind_kph,

            // Clima dos dias seguintes
            next: [
                {
                    // Primeiro dia seguinte (amanhã)
                    week: dayjs(nextFirst.date).locale("pt-br").format("dddd"),
                    icon: nextFirst.day.condition.icon,
                    max: nextFirst.day.maxtemp_c,
                    min: nextFirst.day.mintemp_c,
                    status: nextFirst.day.condition.text
                },
                {
                    // Segundo dia seguinte (depois de amanhã)
                    week: dayjs(nextSecond.date).locale("pt-br").format("dddd"),
                    icon: nextSecond.day.condition.icon,
                    max: nextSecond.day.maxtemp_c,
                    min: nextSecond.day.mintemp_c,
                    status: nextSecond.day.condition.text
                },
                {
                    // Terceiro dia seguinte
                    week: dayjs(nextThird.date).locale("pt-br").format("dddd"),
                    icon: nextThird.day.condition.icon,
                    max: nextThird.day.maxtemp_c,
                    min: nextThird.day.mintemp_c,
                    status: nextThird.day.condition.text
                },
                {
                    // Quarto dia seguinte
                    week: dayjs(nextFourth.date).locale("pt-br").format("dddd"),
                    icon: nextFourth.day.condition.icon,
                    max: nextFourth.day.maxtemp_c,
                    min: nextFourth.day.mintemp_c,
                    status: nextFourth.day.condition.text
                },
                {
                    // Quinto dia seguinte
                    week: dayjs(nextFifth.date).locale("pt-br").format("dddd"),
                    icon: nextFifth.day.condition.icon,
                    max: nextFifth.day.maxtemp_c,
                    min: nextFifth.day.mintemp_c,
                    status: nextFifth.day.condition.text
                }
            ]
        }

        return weatherDatas
    
    }catch(error){
        alert("Não foi possível pegar todos os dados - Tente novamente mais tarde")
        console.log(error)
    }

}
