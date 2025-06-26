const url = "http://api.weatherapi.com/v1"
const API_KEY = "80b9d2524c2c48c894385831252606"


 

function validate() {
    const inputcityDOM = document.getElementById("input-city")
    const errorDOM = document.getElementById("error")
    
    if(!inputcityDOM.value.trim()) {
        ShowError(errorDOM, "Please Enter Your City")
        return false;
    }
    
    const CityValue = inputcityDOM.value.trim();

    if(CityValue.length < 2){
         ShowError(errorDOM, "City must be at least 2 character")
        return false;
     
    }

    const onlyLetter = /^[\u0E00-\u0E7Fa-zA-Z\s]+$/;

    if(!onlyLetter.test(CityValue)) {
        ShowError(errorDOM, "City must contain  only letters")
        return false;
    }
    
    

    errorDOM.classList.add('hidden')
    return true;

}

function ShowError(errorDOM,message) {
    errorDOM.textContent = message
    errorDOM.classList.remove('hidden');

    setTimeout(() => {
            errorDOM.classList.add('hidden');}, 3000);
        
        
}


async function getWeather() {

    if(!validate()) {
        return;
    }


    const inputcityDOM = document.getElementById("input-city");
    const cityDOM = document.getElementById("city")
    const tempDOM = document.getElementById("temp");
    const weatherDOM = document.getElementById("weather");
    const humidityDOM = document.getElementById("humidity")
    const localtimeDOM = document.getElementById("localtime")
    const uvDOM = document.getElementById("uv")
    const LoadingDOM  = document.getElementById("loading")
    const countryDOM = document.getElementById("country")
    const errorDOM = document.getElementById("error")
    
    

    const cityName = inputcityDOM.value.trim();
    
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(cityName)}&aqi=no`

    console.log("🌍 API URL:", API_URL)

    try{
        LoadingDOM.textContent = "Loading . . . "
        const response = await fetch(API_URL);

        if (!response.ok) {
        const errorData = await response.json();
        ShowError(errorDOM, errorData.error?.message || "Unknown error occurred.");
        LoadingDOM.textContent = "";
        return;
    }
        const data = await response.json()
        LoadingDOM.textContent = ""
  

        

        weatherDOM.textContent = `${data.current.condition.text} `
        tempDOM.textContent = `${data.current.temp_c} °C`
        cityDOM.textContent = `City: ${data.location.name} `
        countryDOM.textContent = `Country: ${data.location.country}`
        uvDOM.textContent = `UV: ${data.current.uv}`
        humidityDOM.textContent = `Humidity: ${data.current.humidity}`
        localtimeDOM.textContent = `Localtime: ${data.location.localtime}`
    

       
      


    
 } catch (error) {
   console.log("Error", error)
}

}

