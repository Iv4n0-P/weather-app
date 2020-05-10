const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    search.value = ''
    weatherIcon.src = ''
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
            
        }
        weatherIcon.src = data.imgUrl
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast

        
      
    })
})
})