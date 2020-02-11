console.log('client side javascript')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const weatherURL = '/weather?address=' + encodeURIComponent(search.value)
    messageOne.textContent = 'Loading weather data...'
    messageTwo.textContent = ''
    fetch(weatherURL).then((res) => {
        res.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})