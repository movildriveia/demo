'use strict';
var url="../app/mapa/consulta_datos_mapa.php";
var MapLocation = {
  lat: 40.440452,
  lng: -3.680567
};

var mv_icon = 'https://movildrive.com/img/mv_icon.png';

var mv_icon_assistance = 'https://movildrive.com/img/mv_icon_assistance.png';
var mv_icon_taxi = 'https://movildrive.com/img/mv_icon_taxi.png';

var mv_icon_kickscooter = 'https://movildrive.com/img/mv_icon_kickscooter.png';
var mv_icon_kickscooter_33 = 'https://movildrive.com/img/mv_icon_kickscooter_33.png';
var mv_icon_kickscooter_69 = 'https://movildrive.com/img/mv_icon_kickscooter_69.png';
var mv_icon_kickscooter_99 = 'https://movildrive.com/img/mv_icon_kickscooter_99.png';

var mv_icon_scooter = 'https://movildrive.com/img/mv_icon_scooter.png';
var mv_icon_scooter_33 = 'https://movildrive.com/img/mv_icon_scooter_33.png';
var mv_icon_scooter_69 = 'https://movildrive.com/img/mv_icon_scooter_69.png';
var mv_icon_scooter_99 = 'https://movildrive.com/img/mv_icon_scooter_99.png';

var mv_icon_bike = 'https://movildrive.com/img/mv_icon_bike.png';
var mv_icon_bike_33 = 'https://movildrive.com/img/mv_icon_bike_33.png';
var mv_icon_bike_69 = 'https://movildrive.com/img/mv_icon_bike_69.png';
var mv_icon_bike_99 = 'https://movildrive.com/img/mv_icon_bike.png';
var mv_icon_car = 'https://movildrive.com/img/mv_icon_car.png';

var mv_icon_car_33 = 'https://movildrive.com/img/mv_icon_car_33.png';
var mv_icon_car_69 = 'https://movildrive.com/img/mv_icon_car_69.png';
var mv_icon_car_99 = 'https://movildrive.com/img/mv_icon_car_99.png';

var mv_icon_truck = 'https://movildrive.com/img/mv_icon_truck.png';
var mv_icon_truck_33 = 'https://movildrive.com/img/mv_icon_truck_33.png';
var mv_icon_truck_69 = 'https://movildrive.com/img/mv_icon_truck_69.png';
var mv_icon_truck_99 = 'https://movildrive.com/img/mv_icon_truck_99.png';


function downloadUrl(url,callback) {
 var request = window.ActiveXObject ?
     new ActiveXObject('Microsoft.XMLHTTP') :
     new XMLHttpRequest;

 request.onreadystatechange = function() {
   if (request.readyState == 4) {
     request.onreadystatechange = doNothing;
     callback(request, request.status);
   }
 };

 request.open('GET', url, true);
 request.send(null);
}


function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(40.440452, -3.680567),
          zoom: 12
        });
        var infoWindow = new google.maps.InfoWindow;
          downloadUrl(url, function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
              var id = markerElem.getAttribute('id');
              var model = markerElem.getAttribute('model');
              var battery = markerElem.getAttribute('battery');
              var altitude = markerElem.getAttribute('altitude');

              var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('latitud')),
                  parseFloat(markerElem.getAttribute('longitud')));

              var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = model
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));

              var text = document.createElement('text');
              text.textContent = battery
              infowincontent.appendChild(text);
              var marker = new google.maps.Marker({
                map: map,
                position: point,
                icon:mv_icon
              });
                marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
                show_data_map(model,markerElem.getAttribute('latitud'),markerElem.getAttribute('longitud'));
              });
            });
          });
        }

function doNothing() {}

function show_data_map(qnr,lat,lon) {

  var text="<p> Vehicle ID</br>";
  text=text+"<input value="+qnr+" readonly></br></br>";
  text=text+"Latitude <br>";
  text=text+"<input value="+lat+" readonly></br></br>";
  text=text+"Longitud <br>";
  text=text+"<input value="+lon+" readonly></br></br>";
  text=text+"Abrir el coche <br>";
  text=text+"<button class='btn-success' onclick=abrir_qnr('"+qnr+"')> Abrir </button> <br></br>";
  text=text+"Cerrar el coche <br>";
  text=text+"<button class='btn-success' onclick=cerrar_qnr('"+qnr+"')>  Cerrar </button><br>";

  document.getElementById("map-datos").innerHTML=text;
}

function abrir_qnr(qnr) {
  var xhttp = new XMLHttpRequest();
  var params = 'qnr='+qnr;
  xhttp.onreadystatechange = function() {
    console.log("respondiendo")
    if (this.readyState == 4 && this.status == 200) {
      console.log("respondiendo OK")
    }
  };
  xhttp.open("POST", "../app/mapa/abrir_qnr.php", true);
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp.send(params);
  console.log("vamos a abrir_qnr php")
}

function cerrar_qnr(qnr) {
  console.log("cerrando_qnr")
  var xhttp = new XMLHttpRequest();
  var params = 'qnr='+qnr;
  xhttp.onreadystatechange = function() {
    console.log("respondiendo")
    if (this.readyState == 4 && this.status == 200) {
      console.log("respondiendo OK")
      this.responseText;
    }
  };
  xhttp.open("POST", "../app/mapa/cerrar_qnr.php", true);
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp.send(params);
  console.log("vamos a cerrar_qnr php")
}

function fill_map(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("update OK")
    }
  };
  xhttp.open("GET", "../app/mapa/fill_map.php", true);
  xhttp.send();
}


/*

var MapLocation = {
  lat: 40.440452,
  lng: -3.680567
};

var map = new google.maps.Map(document.getElementById('map'), {
       center: MapLocation,
       zoom: 13,
    })

    var marker1 = new google.maps.Marker({
      position: {lat: 40.426441, lng: -3.67112},
      icon: mv_icon,
      map: map
    });

    var marker2 = new google.maps.Marker({
      position: {lat: 40.426441, lng: -3.67112},
      icon: mv_icon,
      map: map
    });

    var marker3 = new google.maps.Marker({
      position: {lat: 40.407884, lng: -3.678156},
      icon: mv_icon,
      map: map
    });

    var marker4 = new google.maps.Marker({
      position: {lat: 40.438232, lng: -3.693097},
      icon: mv_icon,
      map: map
    });

    var marker5 = new google.maps.Marker({
      position: {lat: 40.462936, lng: -3.717436},
      icon: mv_icon,
      map: map
    });

    var marker6 = new google.maps.Marker({
      position: {lat: 40.459271, lng: -3.676752},
      icon: mv_icon,
      map: map
    });

    var marker6 = new google.maps.Marker({
      position: {lat: 40.414330, lng: -3.713833},
      icon: mv_icon,
      map: map
    });



function locateMarkersCars(){

  var map1 = new google.maps.Map(document.getElementById('map'), {
         center: MapLocation,
         zoom: 13
      })

  var marker1 = new google.maps.Marker({
    position: {lat: 40.426441, lng: -3.67112},
    icon: mv_icon,
    map: map1
  });

  var marker2 = new google.maps.Marker({
    position: {lat: 40.426441, lng: -3.67112},
    icon: mv_icon,
    map: map1
  });

  var marker3 = new google.maps.Marker({
    position: {lat: 40.407884, lng: -3.678156},
    icon: mv_icon,
    map: map1
  });

  var marker4 = new google.maps.Marker({
    position: {lat: 40.438232, lng: -3.693097},
    icon: mv_icon,
    map: map1
  });

  var marker5 = new google.maps.Marker({
    position: {lat: 40.462936, lng: -3.717436},
    icon: mv_icon,
    map: map1
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.459271, lng: -3.676752},
    icon: mv_icon,
    map: map1
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.414330, lng: -3.713833},
    icon: mv_icon,
    map: map1
  });
}


function locateMarkersScooters(){

  var map2 = new google.maps.Map(document.getElementById('map'), {
         center: MapLocation,
         zoom: 12,
      })

  var marker1 = new google.maps.Marker({
    position: {lat: 40.422067, lng: -3.684340},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker2 = new google.maps.Marker({
    position: {lat: 40.437880, lng: -3.678499},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker3 = new google.maps.Marker({
    position: {lat: 40.423112, lng: -3.712666},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker4 = new google.maps.Marker({
    position: {lat: 40.438795, lng: -3.718336},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker5 = new google.maps.Marker({
    position: {lat: 40.456310, lng: -3.692234},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.406304, lng: -3.710642},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.465209, lng: -3.670513},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker7 = new google.maps.Marker({
    position: {lat: 40.408090, lng: -3.669922},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker8 = new google.maps.Marker({
    position: {lat: 40.466666, lng: -3.723233},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker9 = new google.maps.Marker({
    position: {lat: 40.393162, lng: -3.691522},
    icon: mv_icon_scooter,
    map: map2
  });

  var marker10 = new google.maps.Marker({
    position: {lat: 40.492925, lng: -3.689924},
    icon: mv_icon_scooter,
    map: map2
  });

}

function locateMarkersKickScooters(){

  var map3 = new google.maps.Map(document.getElementById('map'), {
         center: MapLocation,
         zoom: 13,
      })

  var marker1 = new google.maps.Marker({
    position: {lat: 40.466666, lng: -3.723233},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker2 = new google.maps.Marker({
    position: {lat: 40.437880, lng: -3.678499},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker3 = new google.maps.Marker({
    position: {lat: 40.423112, lng: -3.712666},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker4 = new google.maps.Marker({
    position: {lat: 40.438795, lng: -3.718336},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker5 = new google.maps.Marker({
    position: {lat: 40.456310, lng: -3.692234},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.406304, lng: -3.710642},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.465209, lng: -3.670513},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker7 = new google.maps.Marker({
    position: {lat: 40.408090, lng: -3.669922},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker8 = new google.maps.Marker({
    position: {lat: 40.422067, lng: -3.684340},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker9 = new google.maps.Marker({
    position: {lat: 40.437880, lng: -3.678499},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker10 = new google.maps.Marker({
    position: {lat: 40.423112, lng: -3.712666},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker11 = new google.maps.Marker({
    position: {lat: 40.438795, lng: -3.718336},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker12 = new google.maps.Marker({
    position: {lat: 40.456310, lng: -3.692234},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker13 = new google.maps.Marker({
    position: {lat: 40.406304, lng: -3.710642},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker14 = new google.maps.Marker({
    position: {lat: 40.465209, lng: -3.670513},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker15 = new google.maps.Marker({
    position: {lat: 40.408090, lng: -3.669922},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker16 = new google.maps.Marker({
    position: {lat: 40.466666, lng: -3.723233},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker17 = new google.maps.Marker({
    position: {lat: 40.457556, lng: -3.704497},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker18 = new google.maps.Marker({
    position: {lat: 40.446965, lng: -3.702548},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker19 = new google.maps.Marker({
    position: {lat: 40.427260, lng: -3.697459},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker20 = new google.maps.Marker({
    position: {lat: 40.417229, lng: -3.687023},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker21 = new google.maps.Marker({
    position: {lat: 40.419280, lng: -3.686724},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker22 = new google.maps.Marker({
    position: {lat: 40.417779, lng: -3.680139},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker23 = new google.maps.Marker({
    position: {lat: 40.418880, lng: -3.683655},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker24 = new google.maps.Marker({
    position: {lat: 40.405555, lng: -3.68414167},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker25 = new google.maps.Marker({
    position: {lat: 40.409880, lng: -3.684703},
    icon: mv_icon_kickscooter,
    map: map3
  });
}

function locateMarkersTrucks(){

  var map4 = new google.maps.Map(document.getElementById('map'), {
         center: MapLocation,
         zoom: 11,
      })

  var marker2 = new google.maps.Marker({
    position: {lat: 40.397127, lng: -3.742030},
    icon: mv_icon_truck,
    map: map4
  });

  var marker3 = new google.maps.Marker({
    position: {lat: 40.342501, lng: -3.780177},
    icon: mv_icon_truck,
    map: map4
  });

  var marker4 = new google.maps.Marker({
    position: {lat: 40.374371, lng: -3.617659},
    icon: mv_icon_truck,
    map: map4
  });

  var marker5 = new google.maps.Marker({
    position: {lat: 40.402261, lng: -3.605442},
    icon: mv_icon_truck,
    map: map4
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.391757, lng: -3.586544},
    icon: mv_icon_truck,
    map: map4
  });

  var marker7 = new google.maps.Marker({
    position: {lat: 40.432537, lng: -3.566431},
    icon: mv_icon_truck,
    map: map4
  });

  var marker8 = new google.maps.Marker({
    position: {lat: 40.428796, lng: -3.563015},
    icon: mv_icon_truck,
    map: map4
  });

  var marker9 = new google.maps.Marker({
    position: {lat: 40.550004, lng: -3.628253},
    icon: mv_icon_truck,
    map: map4
  });

  var marker10 = new google.maps.Marker({
    position: {lat: 40.385970, lng: -3.708698},
    icon: mv_icon_truck,
    map: map4
  });

  var marker11 = new google.maps.Marker({
    position: {lat: 40.382131, lng: -3.744901},
    icon: mv_icon_truck,
    map: map4
  });

  var marker12 = new google.maps.Marker({
    position: {lat: 40.463163, lng: -3.695775},
    icon: mv_icon_truck,
    map: map4
  });

  var marker13 = new google.maps.Marker({
    position: {lat: 40.442293, lng: -3.651697},
    icon: mv_icon_truck,
    map: map4
  });

  var marker14 = new google.maps.Marker({
    position: {lat: 40.438450, lng: -3.623830},
    icon: mv_icon_truck,
    map: map4
  });

  var marker15 = new google.maps.Marker({
    position: {lat: 40.422992, lng: -3.624787},
    icon: mv_icon_truck,
    map: map4
  });

}

function locateMarkersBikes(){

  var map5 = new google.maps.Map(document.getElementById('map'), {
         center: MapLocation,
         zoom: 13,
      })

  var marker0 = new google.maps.Marker({
    position: {lat: 40.426441, lng: -3.67112},
    icon: mv_icon_bike,
    map: map5
  });

  var marker1 = new google.maps.Marker({
    position: {lat: 40.466666, lng: -3.723233},
    icon: mv_icon_bike,
    map: map5
  });

  var marker2 = new google.maps.Marker({
    position: {lat: 40.437880, lng: -3.678499},
    icon: mv_icon_bike,
    map: map5
  });

  var marker3 = new google.maps.Marker({
    position: {lat: 40.423112, lng: -3.712666},
    icon: mv_icon_bike,
    map: map5
  });

  var marker4 = new google.maps.Marker({
    position: {lat: 40.438795, lng: -3.718336},
    icon: mv_icon_bike,
    map: map5
  });

  var marker5 = new google.maps.Marker({
    position: {lat: 40.456310, lng: -3.692234},
    icon: mv_icon_bike,
    map: map5
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.406304, lng: -3.710642},
    icon: mv_icon_bike,
    map: map5
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.465209, lng: -3.670513},
    icon: mv_icon_bike,
    map: map5
  });

  var marker7 = new google.maps.Marker({
    position: {lat: 40.408090, lng: -3.669922},
    icon: mv_icon_bike,
    map: map5
  });

  var marker8 = new google.maps.Marker({
    position: {lat: 40.422067, lng: -3.684340},
    icon: mv_icon_bike,
    map: map5
  });

  var marker9 = new google.maps.Marker({
    position: {lat: 40.437880, lng: -3.678499},
    icon: mv_icon_bike,
    map: map5
  });

  var marker10 = new google.maps.Marker({
    position: {lat: 40.423112, lng: -3.712666},
    icon: mv_icon_bike,
    map: map5
  });

  var marker11 = new google.maps.Marker({
    position: {lat: 40.438795, lng: -3.718336},
    icon: mv_icon_bike,
    map: map5
  });

  var marker12 = new google.maps.Marker({
    position: {lat: 40.456310, lng: -3.692234},
    icon: mv_icon_bike,
    map: map5
  });

  var marker13 = new google.maps.Marker({
    position: {lat: 40.406304, lng: -3.710642},
    icon: mv_icon_kickscooter,
    map: map3
  });

  var marker14 = new google.maps.Marker({
    position: {lat: 40.465209, lng: -3.670513},
    icon: mv_icon_bike,
    map: map5
  });

  var marker15 = new google.maps.Marker({
    position: {lat: 40.408090, lng: -3.669922},
    icon: mv_icon_bike,
    map: map5
  });

  var marker16 = new google.maps.Marker({
    position: {lat: 40.466666, lng: -3.723233},
    icon: mv_icon_bike,
    map: map5
  });

  var marker17 = new google.maps.Marker({
    position: {lat: 40.434938, lng: -3.698623},
    icon: mv_icon_bike,
    map: map5
  });

}

function locateMarkersTaxis(){

  var map6 = new google.maps.Map(document.getElementById('map'), {
         center: MapLocation,
         zoom: 13,
      })

  var marker1 = new google.maps.Marker({
    position: {lat: 40.426441, lng: -3.67112},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker2 = new google.maps.Marker({
    position: {lat: 40.423587, lng: -3.680607},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker3 = new google.maps.Marker({
    position: {lat: 40.420120, lng: -3.694067},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker4 = new google.maps.Marker({
    position: {lat: 40.420308, lng: -3.704081},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker5 = new google.maps.Marker({
    position: {lat: 40.430660, lng: -3.689285},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker6 = new google.maps.Marker({
    position: {lat: 40.444562, lng: -3.691285},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker7 = new google.maps.Marker({
    position: {lat: 40.450853, lng: -3.690885},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker8 = new google.maps.Marker({
    position: {lat: 40.463944, lng: -3.689685},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker9 = new google.maps.Marker({
    position: {lat: 40.433298, lng: -3.698084},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker10 = new google.maps.Marker({
    position: {lat: 40.445677, lng: -3.703019},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker11 = new google.maps.Marker({
    position: {lat: 40.442049, lng: -3.701494},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker12 = new google.maps.Marker({
    position: {lat: 40.420717, lng: -3.686393},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker13 = new google.maps.Marker({
    position: {lat: 40.440148, lng: -3.691485},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker14 = new google.maps.Marker({
    position: {lat: 40.399635, lng: -3.701653},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker15 = new google.maps.Marker({
    position: {lat: 40.407340, lng: -3.694293},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker16 = new google.maps.Marker({
    position: {lat: 40.448373, lng: -3.651692},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker17 = new google.maps.Marker({
    position: {lat: 40.450037, lng: -3.619974},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker18 = new google.maps.Marker({
    position: {lat: 40.494494, lng: -3.599113},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker19 = new google.maps.Marker({
    position: {lat: 40.485420, lng: -3.598771},
    icon: mv_icon_taxi,
    map: map6
  });

  function locateMarkersCars_auto(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("map").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "fill_map.php", true);
  xhttp.send();
}

  var marker20 = new google.maps.Marker({
    position: {lat: 40.481438, lng: -3.581434},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker21 = new google.maps.Marker({
    position: {lat: 40.470600, lng: -3.573537},
    icon: mv_icon_taxi,
    map: map6
  });

  var marker22 = new google.maps.Marker({
    position: {lat: 40.451841, lng: -3.591057},
    icon: mv_icon_taxi,
    map: map6
  });

}

function locateMarkersAssistance(){

  var map6 = new google.maps.Map(document.getElementById('map'), {
         center: MapLocation,
         zoom: 13,
      })

  var marker6 = new google.maps.Marker({
    position: {lat: 40.426441, lng: -3.67112},
    icon: mv_icon_taxi,
    map: map6
  });
}

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
       center: MapLocation,
       zoom: 13,
    })

    var marker = new google.maps.Marker({
      position: map.getCenter(),
      icon: img_mv,
      map: map
    });

    var marker2 = new google.maps.Marker({
      position: {lat: 40.426441, lng: -3.67112},
      icon: img_mv,
      map: map1
    });

    var marker3 = new google.maps.Marker({
      position: {lat: 40.407884, lng: -3.678156},
      icon: img_mv,
      map: map2
    });

    var marker4 = new google.maps.Marker({
      position: {lat: 40.438232, lng: -3.693097},
      icon: img_mv,
      map: map2
    });

    var marker5 = new google.maps.Marker({
      position: {lat: 40.462936, lng: -3.717436},
      icon: img_mv,
      map: map2
    });

    var marker6 = new google.maps.Marker({
      position: {lat: 40.459271, lng: -3.676752},
      icon: img_mv,
      map: map2
    });

    var marker6 = new google.maps.Marker({
      position: {lat: 40.414330, lng: -3.713833},
      icon: img_mv,
      map: map2
    });
}

/*
function locateMarkersCars_auto() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "fill_map.php", true);
  xhttp.send();
}
*/
