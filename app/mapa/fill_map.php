<?php

// Consulta todos los datos para saber que qnr estan activos
$url="https://api.cloudboxx.invers.com/api/devices/";

$headers = array('X-CloudBoxx-ApiKey:IpVVi6lUaRDgCi8mfByBnoN7NeCbzXiEgtiT3+GQCUz20ggFSu3Xn4r/UGS7HqbO','Content-Type: application/json');
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);

$response = curl_exec($ch);

echo "La respuesta de la llamada es:";
echo var_dump($response);
curl_close($ch);

$data = json_decode($response, true);
$keys_qnr = $data["data"];
/* Parte que mostraba el total de la consulta a INVERS */
echo "<br>Consulta inicial de los qnr activos<br>";
echo var_dump($keys_qnr);
echo "<br><br>";
$k=1;

// Consulta todos los datos de cada qnr
$headers = array('X-CloudBoxx-ApiKey:IpVVi6lUaRDgCi8mfByBnoN7NeCbzXiEgtiT3+GQCUz20ggFSu3Xn4r/UGS7HqbO','Content-Type: application/json');
$ch_2 = curl_init();

// se conecta con la BD para escribir
$username= "dbu177667";
$password="Movildrive2020!";
$database="dbs200242";

$enlace = mysqli_connect("db5000205279.hosting-data.io", $username, $password, $database);
/*
echo "<br>Enlace para consulta mysql<br>";
echo var_dump($enlace);
echo "<br><br>";
*/

// itera sobre cada qnr
foreach($keys_qnr as $key){

  $qnr=$key["qnr"];
  $url_qnr_status= $url.$qnr.'/status';

  curl_setopt($ch_2, CURLOPT_URL, $url_qnr_status);
  curl_setopt($ch_2, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch_2,CURLOPT_HTTPHEADER,$headers);

  $response_2 = curl_exec($ch_2);
  $data_qnr_status = json_decode($response_2, true);


  if (!$enlace) {
      echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
      echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
      echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
      exit;
  }

  if (isset($data_qnr_status["error"]))
  {
      echo $data_qnr_status["error"];
      echo "<br><br>";
  }
  else {
  // Escribir en la base de datos
  $sql="SELECT * FROM MarkersCars WHERE model='$qnr'";
  $result = mysqli_query($enlace,$sql);
  echo "<br> Consulta SQl: " . $sql;

  if (mysqli_num_rows($result)>0) {
    // Actualiza la posición
    $sql = "UPDATE MarkersCars SET latitud=" . $data_qnr_status["position"]["lat"];
    $sql.= ",longitud=" . $data_qnr_status["position"]["lon"] . " WHERE model=$qnr )";
    $result = mysqli_query($enlace,$sql);
    echo "<br>Consulta SQL de actualización<br>";
    echo $sql."<br>";
    echo "resultado: ".$result;
    echo "<br><br>";
    }
  elseif (mysqli_num_rows($result)==0) {
    $sql = "INSERT INTO MarkersCars (model,latitud,longitud) VALUES (".$qnr.",".$data_qnr_status["position"]["lat"].",".$data_qnr_status["position"]["lon"].")";
      $result = mysqli_query($enlace,$sql);
      echo "<br>Consulta inserción SQL<br>";
      echo $sql."<br>";
      echo "resultado: ".$result;
      echo "<br><br>";
    }
    else {
      echo "<br> numero de veces escrito $qnr: " . mysqli_num_rows($result);
    }
  }
  }

  mysqli_close($enlace);
  curl_close($ch_2);
?>
