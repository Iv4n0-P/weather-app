const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoiaXZhbmtvcCIsImEiOiJjazlwcmxwcXowZGFyM2dtbTk3Y3cweWh2In0.wfPsa6vnsAp1PZ0fVdBdzg'
    //ovo encodeURIComponent() je JS funkcija koja će konvertirati neki specijalni znak, npr. ako netko upiše upitnik program će se crashat a sa ovim će konvertirat specijalni znak u onaj zamjenski asci
    request({url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect with service')
        } else if (body.features.length === 0) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode