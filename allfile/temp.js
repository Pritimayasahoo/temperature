const ry=document.getElementById('fr')
let va=document.getElementById('va')
const show=document.getElementById('p')
document.getElementById('va').focus();
const temp=function(city)

  {
    const API_KEY='e15429f482cc6e392dbc1b8c88237b4c';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`).then(function(response){
      console.log(response)
      if (!response.ok)
      {
        throw new Error(`Can't find the city` )
      }
      return response.json()
    }).then(function(data){
      console.log(data)
      console.log(`City temperature is  ${(data.main.temp-273.15).toFixed(2)} C`)
      show.innerText=`Temperature in ${data.name} is ${(data.main.temp-273.15).toFixed(2)} C`
    }).catch(function(err){
      alert(err.message)
      console.log(err)
    })
  }


let city=''
ry.addEventListener('submit',function(e){
  e.preventDefault()
  city=va.value
  va.value=''
  temp(city)
  va.blur()

})