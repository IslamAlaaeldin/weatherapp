/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=4eba8b0b3e421a19c11b6aff212f8d6f';
const units = '&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear(); // Corrected date format for month

// Function to GET weather data from OpenWeatherMap API
const getWeatherData = async (city) => { 
    const response = await fetch(`${baseURL}${city}${apiKey}${units}`);
    try {
        const data = await response.json();
        return data;
    } 
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// Function to POST data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

// Function to GET project data from the server
const retrieveData = async () =>{
    const request = await fetch('/all',);
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =allData.temperature + 'degrees';
    document.getElementById("content").innerHTML =  "fellings is=> "+allData.userResponse;
    document.getElementById("date").innerHTML ="date is "+allData.date;
    document.getElementById("cityy").innerHTML = "City: " + allData.City;
    }
    catch(error) {
      console.log("Error updating UI", error);
    }
};

// Event listener for the button
document.getElementById('generate').addEventListener('click', async () => {
    const city = document.getElementById('cityholder').value;
    const feelings = document.getElementById('feelings').value;
    // Fetch weather data
    const weatherData = await getWeatherData(city);
    if (weatherData && weatherData.main) {
        // Post data to server
        await postData('http://localhost:8000/addWeather', {
            date: newDate,
            temperature: weatherData.main.temp,
            userResponse: feelings,
            City: city
        });
        // Update the UI
        await retrieveData();
    } else {
        console.error('Failed to fetch weather data. Check zip code or API key.');
        alert('Invalid Zip Code or failed to fetch weather data');
    }
});