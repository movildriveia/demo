<!doctype html>
</body>

<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Herramienta para Gestión de Flotas - Movildrive</title>
  <meta name="checkin" content="formulario">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="estilo_login.css">
</head>
<!-- Descripción: herramienta para firma, pagina de inicio de sesión-->
<body>
<div id="login" class="container">
  <a href="../../index.html"><img src="logo-mini.svg" width="80px" align="center"></a>
  <h2 class="text-center text-white pt-5">Gestor de Flotas</h2>
  <form name="form_ini" action="login.php" onsubmit="return validateForm()" method="post">
    <div class="form-group" align="center">
      <label>usuario:</label>
      <input type="text" id="usuario" class="form-control" name="usuario" size="10" required>
      <label>clave:</label>
      <input type="password" id="clave" class="form-control" name="clave" size="10" required>
      <br>
      <button class="btn btn-success" type="submit" onclick="registro()">Iniciar sesión</button>
    </div>
  </form>
  <div align="center">
    <a href="recupera_clave.php">
      <button class="btn btn-info center">Si no recuerda su clave
      </button>
    </a>
  </div>
<script src="scripts.js"></script>
</html>
