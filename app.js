
const api= require('dotenv').config();

const getloc=async ()=>{
    const url=api.api_loc;
    try{
        const response=await fetch(url)
        const data=await response.json()
        return data
} catch(error){
    console.log(error)
    }
}

const getWeather=async (lat,lon)=>{
     const url=api.api_weath;
    try{
        const response=await fetch(url)
        const data=await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}


function dayOrnight(){
    let dayornight;
    const date = new Date();
    const hours = date.getHours();
    if(hours<6 && hours>18){
        return  dayOrnight= "night";
        }
        else{
            return dayOrnight= "day";
            }
}


function getIcon(weMain){
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const DayOrNigh = dayOrnight();
            icon = `${weMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}


function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}
 
const loti = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const dese = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const tede = document.querySelector('.temperature-description');


getloc().then( data=>{
    const timeZone= data.timezone;
    loti.textContent= timeZone;
    return getWeather(data.lat, data.lon);
}).then(newdata=>{
    console.log(newdata)
    const wetemp= newdata.main.temp;
    const weMain = newdata.weather[0].main;
    const wedesc=newdata.weather[0].description;
    const weIcon = getIcon(weMain);
    icon.innerHTML= `<img src="icons/${weIcon}">`;
    deg.textContent= getTemp(wetemp).kel;
    unit.textContent= '°K';
    tede.textContent= wedesc;
    deg.addEventListener('click', function(e){
       if(unit.textContent== '°K'){
         deg.textContent=getTemp(wetemp).far;
         unit.textContent='°F';
       }else {
        deg.textContent=getTemp(wetemp).kel;
        unit.textContent='°K';
       }
    })
})
