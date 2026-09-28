import { fetchWeather } from "./api-connection.js"
import { filterText } from "./text-filter.js"

// Conectando DOM
const form = document.querySelector('form')
const input = document.querySelector('input')

form.addEventListener("submit", async (event) => {
    event.preventDefault()                          // Previnindo comportamento padrão
    const filtered = filterText(input.value)        // Passando texto digitado pelo usuário no filtro
    const data = await fetchWeather(filtered)
    console.log(data)
})
