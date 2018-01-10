<?php
ini_set('display_errors', 1);
require('include/conn.inc.php'); 
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


<?php
$numberOfNodes = "SELECT * FROM Cantor_Nodes_ThirdFloor";
$nodeResults = $pdo->query($numberOfNodes);
while($row = $nodeResults->fetchObject())
{
echo $row->NodeID;
}
?>





<!--<script> 
var numberOfRows = "SELECT NodeID FROM Cantor_Nodes_ThirdFloor";
$nodeResults = $pdo->query(numberOfRows);
while($row = $nodeResults->fetchObject())
{
console.log(numberOfRows)
}
</script>

<!--image and arrow drawing 
while($row = $nodeResults->fetchObject())
{
echo $row->NodeID;
}
-->

  <canvas id = "drawing" height = "460" width = "819"></canvas>

			<script src="DirectionsScript.js"></script>



</body>
</html>
