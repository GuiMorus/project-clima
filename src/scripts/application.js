import { fetchWeather } from "./api-connection.js"
import { filterText } from "./text-filter.js"

// Conectando DOM
const form = document.querySelector('form')
const input = document.querySelector('input')

form.addEventListener("submit", async (event) => {
    try{
        event.preventDefault()                          // Previnindo comportamento padrão
        const filtered = filterText(input.value)        // Passando texto digitado pelo usuário no filtro
        const data = await fetchWeather(filtered)       // Pegando informações necessárias da API
        console.log(data)
        
    }catch(error){
        alert("Não foi possível fazer a pesquisa - Tente novamente mais tarde")
        console.log(error)
    }
})
