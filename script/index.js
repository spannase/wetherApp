//  api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
     
let div1= document.querySelector("#dataDiv");


async function getwether(){
    try{
        let city = document.getElementById("city").value;
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b63af0a25975608dc32993990a556e03&units=metric`); 

        let data = await res.json();  
         mapme(city)
         showWeather(data);
        //console.log("users:",data);
    }
    catch (err){
        console.log("err",err)
    }
}

 function showWeather(elem) {
         div1.innerHTML="";

         let name = document.createElement("h3");
         name.textContent = `City name : ${elem.name}`;

         let temp = document.createElement("p");
         temp.textContent=`temp :${elem.main.temp}°`;

         let pressure = document.createElement("p");
         pressure.innerHTML=`pressure: ${elem.main.pressure}`;

         let humi = document.createElement("p");
         humi.textContent= `humidity: ${ elem.main.humidity}`;

           div1.append(name, temp, pressure, humi)       
  
}


 //let city = document.getElementById("city").value;


       function mapme(city){
        let x =   document.querySelector(".gmap_canvas");

            x.innerHTML=`  <iframe
              width="600"
             height="500"
             id="gmap_canvas" 
             src="https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed" 
             frameborder="0" 
             scrolling="no"
             marginheight="0"
             marginwidth="0">   
             </iframe>  `;
       }



       async function forecast(){
    try{
        let city = document.getElementById("city").value;
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b63af0a25975608dc32993990a556e03&units=metric`);


        let data = await res.json();  
        let list= data.list ;
         showforecast(list)

        console.log("users:",list);
    }
    catch (err){
        console.log("err",err)
    }
}
let forecastDiv = document.querySelector("#forecastDiv");
function showforecast(list) {

    forecastDiv.innerHTML="";

    document.querySelector("#heading").textContent="Forecast :";

    for( var i=0 ; i<7 ; i++){
        
        let div2= document.createElement("div")

        let date = document.createElement("p");
        let x= list[i].dt_txt.split(" ")
        date.textContent = `date : ${x[0]}`;

        let max_temp = document.createElement("p");
        max_temp.textContent=`temp :${list[i].main.temp_max}°`;

        let min_temp = document.createElement("p");
        min_temp.innerHTML=`temp min: ${list[i].main.temp_min}°`;

        let logo = document.createElement("img");
       // logo.setAttribute=("id", "logo")

        let weather = list[i].weather[0].main
        //   console.log(weather)
        if(weather=="Rain"){
           
            logo.setAttribute("src", "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRCK0sYe2SyvanNVy2v5Llfg0YcdgAdl32EHQ4iN6ME_BpSpquO");
         }
        else if(weather== "Clear"){
            logo.setAttribute("src", "https://www.oneclay.net/cms/lib/FL02211874/Centricity/Domain/1684/sun-icon-47359.png");
        }
         else if(weather== "Clouds"){
            logo.setAttribute("src", "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQi_QE0B0k4P-Pwflo78TjgrWOpx1mY8oa4r_34szXqEoCi88Lv");
         }
         else{
             logo.setAttribute("src", "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQcif0Mdfw3ntot1fnTAqv_2ni0lAr_CEuqCVSIkChlY21YKUZb");
         }

         forecastDiv.append(div2)
        div2.append(date, logo, max_temp, min_temp )


    }
   
   
}
