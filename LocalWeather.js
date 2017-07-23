'use strict'
function performSearch(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);    
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }  
}
function SetCelsius(){
       var unitsAre="metric";
        let tempArea=document.getElementById('temperature');
        var degree=" &deg;C";
        var tempA=(document.getElementById('temperature').innerHTML).split(' ');
        
        var tempC=tempA[1];
        var unit=tempA[2];
        console.log("Temperature: "+ tempC+" "+unit);
        if(tempC>" " && document.getElementById('cel').value=='OFF'){
           tempC-=32;
           tempC*=5/9;
           tempArea.innerHTML="Temperature: "+ Math.round(tempC)+ degree;
           document.getElementById('far').value='OFF';
           document.getElementById('cel').value='ON';
        }
}

function SetFahrenheit(){
      var unitsAre="imperial";
      let tempArea=document.getElementById('temperature');
      var degree=" &deg;F";
      var butF=document.getElementById('far');
      var tempA=(document.getElementById('temperature').innerHTML).split(' ');
      var tempF=tempA[1];
      console.log("Unit is:"+tempA[2]);
      if(butF.value==='ON')
      tempArea.innerHTML="Temperature: "+ Math.round(tempF)+ degree;
      else if(butF.value==='OFF'){
          tempF=(tempF*9/5.0)+32;
          tempArea.innerHTML="Temperature: "+ Math.round(tempF)+ degree;
          document.getElementById('cel').value='OFF';
          butF.value='ON';
      }
}
function showPosition(position) 
  { var unitsAre="imperial";
    let locationArea=document.getElementById('location');
    let windSpeed=document.getElementById('speed');
    let descArea=document.getElementById('description');
    let tempArea=document.getElementById('temperature');
    let humidity=document.getElementById('humidity');
    let reuslts=document.getElementById('body');
    var lat = position.coords.latitude;
	var lon = position.coords.longitude;
    var request = new XMLHttpRequest();
    var city=[];
    
        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true';
        var async = false;
        request.open(method, url, async);
        
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
            var fullAddress=address.formatted_address;
            city=fullAddress.split(', ');          
          }
        };  
       
        request.send();
        
    document.getElementById('GPS').innerHTML="Location latitude: "+ lat+ " longitude:"+ lon;
    const apiBaseURL='https://api.apixu.com/v1/current.json?';
    const apiKey='bf3518a28fe742c982f30008170607';
    var finalURL=`${apiBaseURL}?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=${unitsAre}`;
   
    finalURL="https://api.apixu.com/v1/current.json?key=bf3518a28fe742c982f30008170607&q="+city[1];
    console.log(finalURL);
    
    fetch(finalURL).then((response)=>{         
         return response.json();
    }).then((returnedValue)=>{
        var degree='';
        var images=["cloudy.jpg","clearImage.jpg"];
        if(unitsAre=='imperial')degree=" &deg;F";
       humidity.innerHTML="Humidity: "+ returnedValue.current.humidity+ " &#37;";
        windSpeed.innerHTML="Wind speed: "+ returnedValue.current.wind_mph +" mph";
      var icon=returnedValue.current.condition.icon;
      
      tempArea.innerHTML="Temperature: "+ returnedValue.current.temp_f+degree;
      var country=returnedValue.location.country;
      var Region=returnedValue.location.region;
      locationArea.innerHTML="Location: "+returnedValue.location.name+ ", "+ Region+", "+country;
      var description=returnedValue.current.condition.text;
      var Describe=description.toLowerCase();
      descArea.innerHTML="Weather description: "+ Describe; 

      document.body.style.backgroundImage = "url('http:"+icon+"')";
       console.log("url('"+icon+"')");
    }).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

}


