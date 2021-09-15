// aviationstachのJSONの検索方法
// https://api.aviationstack.com/v1/flights
    // ? access_key = YOUR_ACCESS_KEY ここにkeyを入れる
    
    // http://api.aviationstack.com/v1/flights?access_key=d2b5ae8338f4deac5ae15440f366ce53&limit=3&airline_iata=SQ&dep_iata=SIN
    // d2b5ae8338f4deac5ae15440f366ce53



// グローバル変数を定義
const apiKey = 'd2b5ae8338f4deac5ae15440f366ce53';
const limit = 10;
const ailineCode = "SQ" //singapore airways
const airport = "SIN" //changi airport(singapore)

// ボタンを押したら全てが始まるonboard関するを定義
function onboard() {
// JSON読み込み
fetch('http://api.aviationstack.com/v1/flights?access_key='
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
    console.log(data)
    function displayFlight(){

        let el = '';
        for (let i = 0; i < 10; i++) {
        
            let airline = data.data[i].airline.name;
            let flight_number = data.data[i].flight.number;
            let flight_date = data.data[i].flight_date;
            let flight_status = data.data[i].flight_status;
            let departure_scheduled = data.data[i].departure.scheduled;
            let departure_estimated = data.data[i].departure.estimated;
            let departure_airport = data.data[i].departure.airport;
            let arrival_airport = data.data[i].arrival.airport;
            let arrival_scheduled = data.data[i].arrival.scheduled;
            let arrival_estimated = data.data[i].arrival.scheduled;

            $(".table").append(`
            <tr>
            <td id="departure_scheduled">${departure_scheduled}</td>
            <td id="arrival_airport">${arrival_airport}</td>
            <td id="airline">${airline}</td>
            <td id="flight_number">${flight_number}</td>
            <td id="arrival_estimated">${arrival_estimated}</td>
            </tr>
            `);
                 
        }  


        console.log(arrival_airport)
    }
    displayFlight(data);
    
});
}

onboard();

