const request = require('request')


const geocode = (location, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiZHJwa2hvciIsImEiOiJjazY3c2wxNTEwZzBwM21wd2ExZzEzY3U0In0.ZBlsiAI-S_UolNvQm25nYA'

    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('Something went wrong!!', undefined)
        } else if (response.body.features.length == 0) {
            callback('Location not found!!', undefined)
        } else {
            let { center: Latlong, place_name: location } = response.body.features[0]
            callback(undefined, {
                lattitude: Latlong[1],
                longitude: Latlong[0],
                location
            })
        }
    })
}

module.exports = geocode