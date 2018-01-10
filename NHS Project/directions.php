<?php
include('include/conn.inc.php');
$sqlNumberOfNodes = "SELECT(*) FROM Cantor_Nodes.ThirdFloor";
$nodeResults = $mysql -> query($sqlNumberOfNodes);
echo $nodeResults['NodeID'];

 ?>

<!DOCTYPE html>
<html>
<head>
	<meta name ="viewport" content="width-device-width, initial-scale=1">
	<link rel = "stylesheet" type="text/css" href="css/StyleSheet.css">
	<title> NHS WayFinder </title>
</head>

<body>
  <header>
  	<img src="images/nhs_logo.jpg" alt="nhs logo"><a href="https://www.nhs.uk/pages/home.aspx"></a>
  	<form class="locationInput">
  		<input type= "text" name = "location" value="Enter something here ">
  		<input type="submit" value="Submit">
  	</form>
  </header>

<!--image and arrow drawing -->

  <canvas id = "drawing" height = "460" width = "819"></canvas>

			<script src="DirectionsScript.js"></script>



</body>
</html>
