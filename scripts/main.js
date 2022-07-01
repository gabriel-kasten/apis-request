var dataSuccess;
var count = 0;
var inputValue = [];

async function infoMapGET() {
    const input_value = $("#input-form").val();
    $.ajax({
        url: 'http://api.weatherapi.com/v1/current.json?key=384bef246265439fa8a213046222606&q=' + input_value + '&days=10&aqi=no&alerts=no',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            dataSuccess = data;
            displayInfo(data);
            $('#input-form').removeClass("bg-danger").addClass("bg-dark");
        },
        error: function (error) {
            $('#input-form').removeClass("bg-dark").addClass("bg-danger");
        },
    });
}

$(document).on('keypress', function (e) {
    if (e.which == 13) {
        infoMapGET();
    }
});

$('#buttonAddValue').on("click", function () {
    if (dataSuccess != undefined) {
        console.log(inputValue);
        if (inputValue.includes(dataSuccess.location.name) == false || dataSuccess.location.name == null) {
            addTableBody();
        } else {
            alert("Não pode valores iguais :P")
        }
    } else {
        alert("Adicione alguma cidade por favor!");
    }
});

$('#buttonRemoveValue').on("click", function () {
    var itemsChecked = $('#table').find('td [type="checkbox"]:checked')
    for (let i = 0; i < itemsChecked.length; i++) {
        itemsChecked[i].parentNode.parentNode.remove();
        console.log(itemsChecked[i]); // pegar o valor do id, subtrair por 1 e remover a posição equivalente do array inputValue 
    }
});

function displayInfo(data) {
    $('#input-form').css("border-color", "#ced4da");
    $('#weather-icon').attr('src', data.current.condition.icon);
    $('#city-name').text(data.location.name);
    $('#state-name').text(data.location.region);
    $('#country-name').text(data.location.country);
    $('#temp').text(data.current.temp_c + '°C');
}
function addTableBody() {
    var html = "";
    count += 1;
    html =
        "<tr>" +
        "<th>" + count + "</th>" +
        "<td style='height: 100%;' id='cityName'>" + dataSuccess.location.name + "</td>" +
        "<td style='height: 100%;'>" + dataSuccess.location.region + "</td>" +
        "<td style='height: 100%;'>" + dataSuccess.location.country + "</td>" +
        "<td style='height: 100%;'>" + dataSuccess.current.temp_c + " °C</td>" +
        "<td> <img src='" + dataSuccess.current.condition.icon + "' style='height: 32px;'> </td>" +
        "<td style='height: 100%;'><input type='checkbox' id='" + count + "'></td>" +
        "</tr>";
    $("#tableBody").append(html);
    inputValue.push(dataSuccess.location.name);
}