<?php
ini_set('display_errors', 1);
include('include/conn.inc.php');
$sqlNumberOfNodes = "SELECT(*) FROM Cantor_Nodes.ThirdFloor";
$nodeResults = $mysql -> query($sqlNumberOfNodes);
echo $nodeResults['NodeID'];
?>


<html>
<head>
	<meta name ="viewport" content="width-device-width, initial-scale=1">
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link href="css/custom.css" rel="stylesheet" type="text/css">
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
?>

<?php
while($row = $nodeResults->fetchObject())
{
echo $row->NodeID;
}
?>
<!--image and arrow drawing -->

  <canvas id = "drawing" height = "460" width = "819"></canvas>

			<script src="DirectionsScript.js"></script>



</body>
</html>
