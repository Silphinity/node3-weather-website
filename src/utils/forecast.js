const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9095cc4822e735a2a7bbe8b32dcbeb3c/' + latitude + ',' + longitude + '?units=ca'
    request({ url, json: true }, (error, {body}) =>{
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error){
            callback("Unable to find location: "+body.error, undefined)
        } else{

            const current = body.currently
            const daily = body.daily.data[0]
            callback(undefined, {
                summary: daily.summary,
                temperature: current.temperature,
                rainfall: current.precipProbability*100,
                windSpeed: current.windSpeed,
                tempHigh: daily.temperatureHigh,
                tempLow: daily.temperatureLow
            })
        }
    })
}

module.exports = forecast