<?php

$username= "dbu177667";
$password="Movildrive2020!";
$database="dbs200242";

$enlace = mysqli_connect("db5000205279.hosting-data.io", $username, $password, $database);

 if (!$enlace) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
// Select all the rows in the markerscars table
$sql = "SELECT id,model,latitud,longitud,battery,altitude FROM `MarkersCars`";
$result = mysqli_query($enlace,$sql);
if (!$result) {
  die('Invalid query: ' . mysqli_error());
}

// Start XML file, create parent node

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each

while ($row = @mysqli_fetch_assoc($result)){
  // Add to XML document node
  $node = $dom->createElement("marker");
  $newnode = $parnode->appendChild($node);
  $newnode->setAttribute("id",$row['id']);
  $newnode->setAttribute("model",$row['model']);
  $newnode->setAttribute("latitud", $row['latitud']);
  $newnode->setAttribute("longitud", $row['longitud']);
  $newnode->setAttribute("battery", $row['battery']);
  $newnode->setAttribute("altitude", $row['altitude']);
}

echo $dom->saveXML();

mysqli_close($enlace);

?>
