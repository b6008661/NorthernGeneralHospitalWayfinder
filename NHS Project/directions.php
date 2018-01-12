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

function arrayToObject($array) {
    if (!is_array($array)) {
        return $array;
    }

    $object = new stdClass();
    if (is_array($array) && count($array) > 0) {
        foreach ($array as $name=>$value) {
            $name = strtolower(trim($name));
            if (!empty($name)) {
                $object->$name = arrayToObject($value);
            }
        }
        return $object;
    }
    else {
        return FALSE;
    }

	}



$nodes = array();
$multinodes = array();
$connections = array();

$numberOfNodes = "SELECT * FROM Cantor_Nodes_ThirdFloor";
$stmt = $pdo->query($numberOfNodes);

	while($row = $stmt->fetch(PDO::FETCH_ASSOC))
	{
		$array = array(
		'id'=>$row['ID'] -1,
		'name'=>$row['Name'],
		'floor'=>$row['Floor'],
		'type' => $row['NodeType'],
		'facing'=>$row['Facing'],
		'connections'=> $connections


		);

	array_push($multinodes,arrayToObject($array));

	}

	

	 $connectionsTable = "SELECT * FROM Connections";
	 $stmt = $pdo->query($connectionsTable);
	 

	$connectionsarray = array();
	while($row = $stmt->fetch(PDO::FETCH_ASSOC))
	{
		$array = array(
		'start'=>$row['Name'],
		'direction'=>$row['Direction'],
		'id'=>$row['End'],
		'facing'=>$row['Facing'],
		'line_name'=> $row['Line_Name'],
		);
		array_push($connectionsarray,arrayToObject($array));
	}
	
	 $stmt = $pdo->query($connectionsTable);
		$reverseconnectionsarray = array();
	while($row = $stmt->fetch(PDO::FETCH_ASSOC))
	{
		$array = array(
		'id'=>$row['Name'],
		'direction'=>$row['Direction'],
		'start'=>$row['End'],
		'facing'=>$row['Facing'],
		'line_name'=> $row['Line_Name'],
		);
		array_push($reverseconnectionsarray,arrayToObject($array));
	}
?>

<?php
$multinodes_json = json_encode($multinodes);
$connectionsarray_json = json_encode($connectionsarray);
$reverseconnectionsarray_json = json_encode($reverseconnectionsarray);
?>

<script type="text/javascript">

var nodes = JSON.parse('<?php echo $multinodes_json; ?>');


var connectionsArray = JSON.parse('<?php echo $connectionsarray_json; ?>');

var reverseconnectionsArray = JSON.parse('<?php echo $reverseconnectionsarray_json; ?>');
console.log(connectionsArray);
console.log( reverseconnectionsArray);


for (i=0; i<nodes.length;i++)
{
	nodes[i].connections = [];
}

for (j=0; j<connectionsArray.length;j++)
	for(i=0;i<nodes.length;i++)
		if (nodes[i].name == connectionsArray[j].start)
			nodes[i].connections.push(connectionsArray[j]);

for (j=0; j<reverseconnectionsArray.length;j++)
	for(i=0;i<nodes.length;i++)
		if (nodes[i].name == reverseconnectionsArray[j].start)
			nodes[i].connections.push(reverseconnectionsArray[j]);


console.log(nodes);
</script>


  <canvas id = "drawing" height = "460" width = "819"></canvas>
			<script src="DirectionsScript.js"></script>
</body>
</html>