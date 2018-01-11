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
$multinodes = array();
$connections = array();

$numberOfNodes = "SELECT * FROM Cantor_Nodes_ThirdFloor";
$stmt = $pdo->query($numberOfNodes);

	while($row = $stmt->fetch(PDO::FETCH_ASSOC))
	{
	$nodestest = array('id'=>$row['ID'] -1);
	// $nodestest = $nodestest-1;
	array_push($nodes, $nodestest);	
	$nodestest = array('name'=>$row['Name']);
	array_push($nodes, $nodestest);
	$nodestest = array('type'=>$row['NodeType']);
	array_push($nodes, $nodestest);
	$nodestest = array('floor'=>$row['Floor']);
	array_push($nodes, $nodestest);
	$nodestest = array('disabled'=>$row['Disabled']);
	array_push($nodes, $nodestest);
	$nodestest = array('facing'=>$row['Facing']);
	array_push($nodes, $nodestest);
	$nodestest = array('connections'=> $connections);
	array_push($nodes, $nodestest);

	array_push($multinodes, $nodes);
	$nodes = array();
	}

	$connNode;

	 $connectionsTable = "SELECT * FROM Connections";
	 $stmt = $pdo->query($connectionsTable);
	for($i=0;$i<$numberOfNodes;$i++)
	{
		$conname = $multinodes[$i]->name;
		while($row = $stmt->fetch(PDO::FETCH_ASSOC))
		{

			$numberOfConnections = 0;
			$nodestest = array('name'=>$row['Name']);
			if($conname == $nodestest)
				{
					$nodestest = array('direction'=>$row['Direction']);
					array_push($multinodes[$numberOfConnections++]->connections, $nodestest);
				}
		}
	}



?>

<?php
$multinodes_json = json_encode($multinodes);
//echo $multinodes_json;
?>

<script type="text/javascript">

var nodes = JSON.parse('<?php echo $multinodes_json; ?>');
//alert("Output" + obj.NodeID);
console.log(nodes);
</script>


  <canvas id = "drawing" height = "460" width = "819"></canvas>
			<script src="DirectionsScript.js"></script>
</body>
</html>
