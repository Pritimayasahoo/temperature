const ry=document.getElementById('fr')
let va=document.getElementById('va')
const tempshow=document.getElementById('temp')
const windshow=document.getElementById('wind')
const humid=document.getElementById('humidity')

document.getElementById('va').focus();

let temperature
let winddirection
let windspeed
let weathercondition
let humidity


//calculate direction of the wind
function getWindDirection(deg) {
  // Define direction ranges in degrees
  const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest', 'North'];
  const degreeRanges = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

  // Adjust degrees to be within 0-360 range
  if (deg < 0) {
      deg += 360;
  } else if (deg >= 360) {
      deg -= 360;
  }

  // Determine wind direction
  for (let i = 0; i < degreeRanges.length; i++) {
      if (deg < degreeRanges[i]) {
          return directions[i];
      }
  }

  // If wind direction is not within any defined range, return North
  return 'North';
}


const temp=function(city)

  {
    const API_KEY='e15429f482cc6e392dbc1b8c88237b4c';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`).then(function(response){
     
      if (!response.ok)
      {
        throw new Error(`Can't find the city`)
      }
      return response.json()
    }).then(function(data){
    
      //wind speed in km/hour
      windspeed=data.wind.speed*3.6
      winddirection=getWindDirection(data.wind.deg)
      temperature=(data.main.temp-273.15).toFixed(2)
      weathercondition=data.weather[0].description
      humidity=data.main.humidity

     
      tempshow.innerText=`It's ${temperature}\u00B0C with ${weathercondition} in ${city}`
      windshow.innerText=`Wind speed in ${city} is ${(windspeed).toFixed(2)} km/h from ${winddirection}`
      humid.innerText=`Humidity in ${city} is now ${humidity}%`

    }).catch(function(err){
      alert(err.message)
    
    })
  }


let city=''
ry.addEventListener('submit',function(e){
  e.preventDefault()
  city=va.value
  city=city.replace(/\s/g, '');
  va.value=''
  temp(city)

})