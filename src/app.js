const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide address'
		})
	}

	geocode(req.query.address, (err, { latitude, longitude, location} = {}) => {
        if (err) {
			return res.send({
				error: err
			})
        }
        forecast(latitude, longitude, (err, forecastData, imgUrl) => {
            if (err) {
                return res.send({
					error: err
				})
            }

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
				imgUrl
			})
        })
    })

	
})

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Ivanko Perišić'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Ivanko Perišić'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Ivanko Perišić',
		helpMessage: 'This is help message'
	})
})


app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found.',
		name: 'Ivanko Perišić'
	})
})
//mora bit zadnji
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found.',
		name: 'Ivanko Perišić'
	})
})

app.listen(port, () => {
	console.log('Server is up on the port 3000')
})