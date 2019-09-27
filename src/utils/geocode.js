const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGhlYnJldCIsImEiOiJjajUyYXdpMnIwYzRhMzNxcmQ5anRvNGZ6In0.m9v3mHoefZBz-3tXH2rZXw&limit=1'
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            const results = body.features[0]
            callback(undefined, {
                latitude: results.center[1],
                longitude: results.center[0],
                location: results.place_name
            })
        }
    })
}

module.exports = geocode