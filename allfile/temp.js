let ry=document.getElementById('fr')
let va=document.getElementById('va')
let tempshow=document.getElementById('temp')
let windshow=document.getElementById('wind')
let humid=document.getElementById('humidity')
let weather=document.getElementById('weather')
let cityName=document.getElementById('city')
document.getElementById('va').focus();


//calculate direction of the wind
function getWindDirection(deg) {
  // Define direction ranges in degrees
  let directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest', 'North'];
  let degreeRanges = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

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


let temp=function(city)

  {
    let API_KEY='e15429f482cc6e392dbc1b8c88237b4c';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`).then(function(response){
     
      if (!response.ok)
      {
        throw new Error(`Can't find the city`)
      }
      return response.json()
    }).then(function(data){
      console.log(data)
      //wind speed in km/hour
      let country
      let temperature
      let winddirection
      let windspeed
      let weathercondition
      let humidity
      windspeed=data.wind.speed*3.6
      winddirection=getWindDirection(data.wind.deg)
      temperature=Math.floor(data.main.temp-273.15)
      weathercondition=data.weather[0].description
      humidity=data.main.humidity
      country=data.sys.country    

      cityName.innerText=`${city} -- ${country}`
      tempshow.innerText=`Temperature: ${temperature}\u00B0C`
      weather.innerText=`Weather: ${weathercondition}`
      windshow.innerText=`Wind Speed: ${Math.floor(windspeed)} km/h from ${winddirection}`
      humid.innerText=`Humidity: ${humidity}%`

    }).catch(function(err){
      alert(err.message)
    
    })
  }


let city=''
ry.addEventListener('submit',function(e){
  e.preventDefault()
  city=va.value
  va.value=''
  temp(city)

})