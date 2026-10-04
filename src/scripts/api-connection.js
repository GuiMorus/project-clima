import dayjs from "dayjs"
import "dayjs/locale/pt-br"

// Declarando variáveis
const baseURL = "https://api.weatherapi.com/v1"
const key = "620292f288044cbdb84235050262609"

// Conectando API e resgatando os dados de clima da cidade
async function apiConnection(local){
    try{
        console.log(local)
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
            country: location.country,
            date: formattedDate.format("DD [de] MMMM [de] YYYY"),
            week: formattedDate.format("dddd"),
            icon: current.condition.icon.replace("64x64", "128x128"),
            temp: current.temp_c,
            status: current.condition.text,
            code: current.condition.code,
            sensation: current.feelslike_c,
            humidity: current.humidity,
            wind: current.wind_kph,

            // Clima dos dias seguintes
            next: [
                {
                    // Primeiro dia seguinte
                    week: nextFirst
                        ? dayjs(nextFirst.date).locale("pt-br").format("dddd")
                        : "não informado",

                    icon: nextFirst
                        ? nextFirst.day.condition.icon
                        : "./src/assets/img/alert.svg",

                    max: nextFirst
                        ? nextFirst.day.maxtemp_c
                        : "0",

                    min: nextFirst
                        ? nextFirst.day.mintemp_c
                        : "0",

                    status: nextFirst
                        ? nextFirst.day.condition.text
                        : "não informado"
                },
                {
                    // Segundo dia seguinte
                    week: nextSecond
                        ? dayjs(nextSecond.date).locale("pt-br").format("dddd")
                        : "não informado",

                    icon: nextSecond
                        ? nextSecond.day.condition.icon
                        : "./src/assets/img/alert.svg",

                    max: nextSecond
                        ? nextSecond.day.maxtemp_c
                        : "não informado",

                    min: nextSecond
                        ? nextSecond.day.mintemp_c
                        : "0",

                    status: nextSecond
                        ? nextSecond.day.condition.text
                        : "0"
                },
                {
                    // Terceiro dia seguinte
                    week: nextThird
                        ? dayjs(nextThird.date).locale("pt-br").format("dddd")
                        : "não informado",

                    icon: nextThird
                        ? nextThird.day.condition.icon
                        : "./src/assets/img/alert.svg",

                    max: nextThird
                        ? nextThird.day.maxtemp_c
                        : "0",

                    min: nextThird
                        ? nextThird.day.mintemp_c
                        : "0",

                    status: nextThird
                        ? nextThird.day.condition.text
                        : "não informado"
                },
                {
                    // Quarto dia seguinte
                    week: nextFourth
                        ? dayjs(nextFourth.date).locale("pt-br").format("dddd")
                        : "não informado",

                    icon: nextFourth
                        ? nextFourth.day.condition.icon
                        : "./src/assets/img/alert.svg",

                    max: nextFourth
                        ? nextFourth.day.maxtemp_c
                        : "0",

                    min: nextFourth
                        ? nextFourth.day.mintemp_c
                        : "0",

                    status: nextFourth
                        ? nextFourth.day.condition.text
                        : "não informado"
                },
                {
                    // Quinto dia seguinte
                    week: nextFifth
                        ? dayjs(nextFifth.date).locale("pt-br").format("dddd")
                        : "não informado",

                    icon: nextFifth
                        ? nextFifth.day.condition.icon
                        : "./src/assets/img/alert.svg",

                    max: nextFifth
                        ? nextFifth.day.maxtemp_c
                        : "0",

                    min: nextFifth
                        ? nextFifth.day.mintemp_c
                        : "0",

                    status: nextFifth
                        ? nextFifth.day.condition.text
                        : "não informado"
                }
            ]
        }

        return weatherDatas

    }catch(error){
        alert("Não foi possível pegar todos os dados - Tente novamente mais tarde")
        console.log(error)
    }
}