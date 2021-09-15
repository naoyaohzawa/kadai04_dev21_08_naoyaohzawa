

// グローバル変数を定義
const apiKey = 'd2b5ae8338f4deac5ae15440f366ce53';  //AviationstackのAPI
const limit = 1;
const ailineCode = "SQ" //singapore airways
const airport = "SIN" //changi airport(singapore)

// ボタンを押したら全てが始まるonboard関するを定義
function onboard() {
// JSON読み込み
fetch('https://api.aviationstack.com/v1/flights?access_key='
    // URL中に検索方法を設定
    + apiKey
    + "&limit="
    + limit
    + "&airline_iata="
    + ailineCode
    + "&dep_iata="
    + airport
    )
.then(response => response.json())
.then(data => {
    function displayFlight(){
        const airline = data.data[0].airline.name;
        const flight_number = data.data[0].flight.number;
        const flight_date = data.data[0].flight_date;
        const flight_status = data.data[0].flight_status;
        const departure_scheduled = data.data[0].departure.scheduled;
        const departure_estimated = data.data[0].departure.estimated;
        const departure_airport = data.data[0].departure.airport;
        const arrival_airport = data.data[0].arrival.airport;
        const arrival_scheduled = data.data[0].arrival.scheduled;
        const arrival_estimated = data.data[0].arrival.scheduled;

        console.log(arrival_airport)

        // airportの名前は singapore-airportやsingapore airportとなっているので、スペースやハイフンを削除してcity nameだけに変換
        let pos = arrival_airport.indexOf("-");
        let pes = arrival_airport.indexOf(" ");
        if (pos > 0) {
            arrival_city  = arrival_airport.substring(0, pos)
        } else if(pes > 0){
            arrival_city  = arrival_airport.substring(0, pes)  
        }else{
            arrival_city = arrival_airport
        }
        

        // Kansai airportだとWeather APIが反応しないのでマニュアルでOsakaに変更
        if(arrival_city == "Kansai"){
            arrival_city = "Osaka"
        }

        // 羽田と成田空港の場合だけ特別にarrival cityを東京に変更
        if(arrival_city == "Haneda"){
            arrival_city == "Tokyo";
        }
        if(arrival_city == "Narita"){
            arrival_city == "Tokyo";
        }
        // console.log(arrival_city)

        if(arrival_city == "Heathrow"){
            arrival_city == "London";
        }

        // 出発scheduleから00:00を削除
        let pis = departure_scheduled.indexOf("+");
        if (pis > 0) {
            new_departure_scheduled  = departure_scheduled.substring(0, pis)
        }

        // 出発estimatedから00:00を削除
        let pas = departure_estimated.indexOf("+");
        if (pas > 0) {
            new_departure_estimated  = departure_estimated.substring(0, pas)
        }

        // 到着scheduleから00:00を削除
        let ai = arrival_scheduled.indexOf("+");
        if (ai > 0) {
            new_arrival_scheduled  = arrival_scheduled.substring(0, ai)
        }

        // 到着estimatedから00:00を削除
        let oi = departure_estimated.indexOf("+");
        if (oi > 0) {
            new_arrival_estimated  = arrival_estimated.substring(0, oi)
        }

        // // flight dateから00:00を削除
        // let ei = flight_date.indexOf("+");
        // if (ei > 0) {
        //     new_flight_date  = flight_date.substring(0, ei)
        // }

        // console.log(arrival_city)

        // JSONから取得した情報をHTMLに記載
        $("#destination").html(`Your Destination is <span>${arrival_city}</span>`)
        $("#airline").html(` ${airline}`);
        $("#flight_number").html(flight_number);
        $("#flight_date").html(flight_date);
        $("#flight_status").html(flight_status);
        $("#departure_scheduled").html(new_departure_scheduled);
        $("#departure_estimated").html(new_departure_estimated);
        $("#departure_airport").html(departure_airport);
        $("#arrival_airport").html(arrival_airport);
        $("#arrival_scheduled").html(new_arrival_scheduled);
        $("#arrival_estimated").html(new_arrival_estimated);
        
        
        $(".table").append(`
        <tr>
        <td id="departure_scheduled">${new_departure_scheduled}</td>
        <td id="arrival_airport">${arrival_airport}</td>
        <td id="airline">${airline}</td>
        <td id="flight_number">${flight_number}</td>
        <td id="arrival_estimated">${new_arrival_estimated}</td>
        </tr>
        `);


        // arrival_cityの天気を取得するAPI
        let weather ={
            "appKey" : "c7d657441fc71317b94e231c802db1b8",
            fetchWeather: function (city) {  
                fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
                + city
                // セルシウスの気温に変更
                + "&units=metric&appid=" 
                + this.appKey
                )
                .then(response => response.json())
                .then((data) => this.displayWeather(data));        
            },
            
            displayWeather: function (data) {  
                const {name} = data;
                const {icon, description} = data.weather[0];
                const {temp, humidity} = data.main;
                const {speed} = data.wind;
                console.log(name, icon, description, temp, humidity, speed);
        
                // 取得した天気情報をHTMLに記載
                $(".city").html(`Weather in ${arrival_city}`)
                $(".temp").html(`${temp}°C`);
                // 天気のアイコンはAPIの中に保存してあるので、icon名毎に表示する画像を変更
                $(".icon").attr('src', 'http://openweathermap.org/img/wn/'+ icon +'.png')
                $(".description").html(description);
                $(".humidity").html(`Humidity: ${humidity}%`)
                $(".wind").html(`Wind Speed: ${speed} km/h`)
                // console.log(name)
            }
        };    
        weather.fetchWeather(arrival_city);  
        
        // arrival_cityの検索ワードによって、unsplashから画像を取得
        // 画像を背景に設定
        $("body").css("background-image","url(https://source.unsplash.com/featured/?"+arrival_city+")")    
        // setInterval(() => {
        //     let date = new Date()
        //     console.log(date)
        //     $("body").css("background-image","url(https://source.unsplash.com/featured/?"+"tokyo"+")")    
        // }, 2000);
        $("#title").html("");
        $("#video").css("opacity", 0);
        $("#today").css("margin-top", "10px");
        $("#destination").css("margin-top", "150px")
    }
    displayFlight(data);
    $("#today").html("")
});
}

$("#today").on("click",function () {  
    onboard();
    $("#result").fadeIn()
    
})






