<?php
// Script para enviar iniciar sesión
if (isset($_POST["usuario"])&&isset($_POST["clave"])){
  $usuario = $_POST["usuario"];
  $clave = $_POST["clave"];
}
else {
  header('Location: index.php');
  exit;
}

//conecta con el servidor
//                        NOMBRE HOST                  USUARIO        PASSWORD       NOMBRE_DB
$mysqli = new mysqli("db5000205279.hosting-data.io", "dbu177667", "Movildrive2020!", "dbs200242");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

// Consulta si es un usuario valido

$query="SELECT usuario, clave, correo FROM Users WHERE usuario='$usuario' AND clave='$clave'";

if ($resultado = $mysqli->query($query)) {
  if ($resultado->num_rows == 1) {
    // Si es diferente de null -> crear sesión
    session_name('privado');
    session_start();
    $id_privado=session_id();
    header('Location: app/index.html');
    exit;
  }
  else {
    echo "Usuario o clave incorrectos.";
    header('Location: index.php');
  }
    /* liberar el conjunto de resultados */
    $resultado->free();
}
else {
  echo "por favor confirma que tu mail este correcto sino escribe al administrador";
  header('Location: index.php');
}
$mysqli->close();
?>
