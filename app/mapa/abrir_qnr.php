<?php

// qnr recibido
$qnr=$_POST["qnr"];
echo var_dump($qnr);

// end-point del back-end
$url="https://api.cloudboxx.invers.com/api/devices/";
$url_qnr_status= $url.$qnr.'/status';
$headers = array('X-CloudBoxx-ApiKey:IpVVi6lUaRDgCi8mfByBnoN7NeCbzXiEgtiT3+GQCUz20ggFSu3Xn4r/UGS7HqbO',
'Content-Type: application/json',
'X-HTTP-Method-Override: PATCH');
$request_body = '{"immobilizer": "unlocked", "central_lock": "unlocked"}';

echo var_dump($request_body);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url_qnr_status);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request_body);

$response = curl_exec($ch);
echo $response;
curl_close($ch);

$data_response = json_decode($response, true);

echo var_dump($data_response["central_lock"],$data_response["immobilizer"],$data_response["position"]["lat"], $data_response["position"]["lon"]);

?>
