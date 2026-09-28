// Pegar a localização atual do navegador
export function getLocation(){
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords
                resolve({latitude, longitude})
            },

            (error) => {
                reject(error)
            }
        )
    })
}
