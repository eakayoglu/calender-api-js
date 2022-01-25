window.addEventListener('load',()=>{
    let long, lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const apikeyz = ''; //write openweathermap.org api key
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikeyz}`;
        
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data=>{
                    //console.log(data);
                    locationTimezone.textContent = data.sys.country + " / " + data.name;
                    
                    temperatureDegree.textContent = kToC(data.main.temp);
                    setIcon(data.weather[0].main, document.querySelector('.anicon'));

                    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    temperatureDescription.textContent = data.weather[0].description.toUpperCase();
                })
        });
    }
    
    function kToC(kelvin) 
    {
        var kTemp = parseFloat(kelvin);
        var kToCel = kTemp-273.15;
        return kToCel.toFixed();
    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({"color":"white"});
        const currentIcon = icon.replace(' ','_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});