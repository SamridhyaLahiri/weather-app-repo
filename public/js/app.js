console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherResult=document.querySelector('#result')
const errorMsg=document.querySelector('#errormsg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    errorMsg.textContent=""
    fetch('/weather?address=' + location).then((response) => {   //NOTE:http://localhost:3000
        response.json().then((data) => {
            if (data.error ) {
                console.log(data.error)
                weatherResult.textContent="Loading..."
                errorMsg.textContent="Enter a valid location"
                weatherResult.textContent=""
            } else {
                errorMsg.textContent=""
                console.log(data.address)
                console.log(data.forecast)
                weatherResult.textContent="Loading..."
                weatherResult.textContent="It is "+data.forecast+" in "+data.address+" ,and temperature is"+data.temperature+"degrees.There is a "+data.precipitation+"% chance of rain"
            }
        })
    })
})