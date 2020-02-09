const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/32a433de0ecb08f1dd6bed6cc7385f26/' + lat + ',' + long

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect weather services!!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            let { temperature, precipProbability } = body.currently
            callback(undefined, 'It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chances of rain.')
        }
    })
}


module.exports = forecast