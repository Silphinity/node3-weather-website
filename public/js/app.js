const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value
    fetch('/weather?address='+encodeURIComponent(location)).then((response) => {
        response.json().then(({error, location, summary, temperature, rainfall, windSpeed} = {error: 'Cannot find data'}) => {
            if (error) {
                messageOne.textContent = error
            }
            else {
                messageOne.textContent = location
                messageTwo.textContent = summary + " Currently, the Temperature is "+ temperature +"°C, with "+ rainfall +"% chance of rainfall and wind speeds of "+ windSpeed +" kph."
                
            }
        })
    })
})