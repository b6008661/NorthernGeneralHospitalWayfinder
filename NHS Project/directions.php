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
// $numberOfNodes = "SELECT * FROM Cantor_Nodes_ThirdFloor";
// $stmt = $pdo->query($numberOfNodes);
// while($row = $stmt->fetch(PDO::FETCH_ASSOC))
// {
// $nodes = array(
// 	'NodeID'=>$row['NodeID'],
// 	'NodeType' =>$row ['NodeType'],
// 	'Floor'=>$row ['Floor']);
// }
?>


<?php
$nodes = array();
$numberOfNodes = "SELECT NodeID FROM Cantor_Nodes_ThirdFloor";
$stmt = $pdo->query($numberOfNodes);

while($row = $stmt->fetch(PDO::FETCH_ASSOC))
{
$nodestest = array('NodeID'=>$row['NodeID']);
array_push($nodes, $nodestest);
}


?>

<?php
$nodes_json = json_encode($nodes);
echo $nodes_json;
?>

<script type="text/javascript">

var obj = JSON.parse('<?php echo $nodes_json; ?>');
//alert("Output" + obj.NodeID);
console.log(obj);
</script>


  <canvas id = "drawing" height = "460" width = "819"></canvas>
			<script src="DirectionsScript.js"></script>
</body>
</html>
