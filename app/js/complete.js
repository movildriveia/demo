
function reporte_inicio(){
  document.getElementById("marco_inicio").style.display="block";
  document.getElementById("marco_mapa").style.display="none";
  document.getElementById("marco_informe").style.display="none";
}

function reporte_mapa(){
  document.getElementById("marco_inicio").style.display="none";
  document.getElementById("marco_mapa").style.display="block";
  document.getElementById("marco_informe").style.display="none";
}

function reporte_kilometros(){
  document.getElementById("marco_inicio").style.display="none";
  document.getElementById("marco_mapa").style.display="none";
  document.getElementById("marco_informe").style.display="block";
  genera_reporte_kilometros();
}

function genera_reporte_kilometros(){

var kilometros_recorridos = document.getElementById("kilometros_recorridos");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 12;

var kilometros_recorridos_datos = {
  labels: ["12/10/2019", "13/10/2019", "14/10/2019", "15/10/2019", "16/10/2019", "17/10/2019", "18/10/2019"],
  datasets: [{
    label: "Kilometros recorridos (km)",
    data: [30, 59, 75, 20, 20, 55, 40],
  }]
};

var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'grey'
    }
  }
};

var lineChart = new Chart(kilometros_recorridos, {
  type: 'line',
  data: kilometros_recorridos_datos,
  options: chartOptions
});

}
