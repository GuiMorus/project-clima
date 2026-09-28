// Função para filtrar o texto digitado pelo usuário
export function filterText(text){
    let filtrado = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")  // Separando acentuação
    filtrado = filtrado.trim().toLowerCase()
    
    return filtrado
}
