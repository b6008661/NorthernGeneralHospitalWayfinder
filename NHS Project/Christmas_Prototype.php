<?php
ini_set('display_errors', 1);
require('include/conn.inc.php');
?>

<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--<link rel = "stylesheet" type="text/css" href="css/StyleSheet.css">-->
	<!--<link href="css/tablet.css" media="only screen and (min-width:700px) and (max-width:1199px)" rel= "stylesheet" type="text/css">
	<link href="css/desktop.css" media="only screen and (min-width:1200px)" rel="stylesheet" type="text/css">-->
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link href="css/custom.css" rel="stylesheet" type="text/css">
	<title> NHS WayFinder </title>
</head>

<body>
<header>
	<img src="images/nhs_logo.jpg" alt="nhs logo"><a href="https://www.nhs.uk/pages/home.aspx"></a>
	<h1 class="headerText">Northern General Hospital</h1>
</header>

		<!--<input type = "text" id = "inputbox" value = "">
		<button onclick = "getName()"> Find Name</button>

		<br>
		<br>
		<br>
	  -->
		<div class="container-fluid">
		<div class = "row">
			<div class = "col-sm-4">
				<div class="box">
		<h2>Select your starting location:</h2>
		<div class = "dropDown">
		<select name = "dropdownboxstart" id= "dropdownboxstart"></select>
	</div>
	</div>
	</div>
		<div class = "col-sm-4">
		<h2>Select your destination:</h2>
		<div class = "dropDown">
		<select name = "dropdownboxend" id = "dropdownboxend"></select>
	</div>
	</div>

<div class="col-sm-4">
	<h2>Would you like to avoid staircases?</h2>
<div class="findPath">
		<form action="directions.php">
			<input id="start" name="start" type="hidden" value="" />
			<input id="end" name="end" type="hidden" value="" />
			<input id="disabled" name="disabled" type="checkbox" value="" checked=false/>
</div>
		<button class = "button" onclick = "setValuesForBoxes()"> Find Path </button>
		<!--<button class = "button" onclick = "findPath()"> Find Path </button>-->
		</form>
		</div>
	</div>
</div>

<?php
$nodes = array();
$numberOfNodes = "SELECT * FROM Cantor_Nodes_ThirdFloor";
$stmt = $pdo->query($numberOfNodes);

while($row = $stmt->fetch(PDO::FETCH_ASSOC))
{
$nodestest = array('name'=>$row['Name']);
array_push($nodes, $nodestest);
}
?>

<?php
$nodes_json = json_encode($nodes);
?>

<script type="text/javascript">

var obj = JSON.parse('<?php echo $nodes_json; ?>');
console.log(obj);
</script>
</body>

<script src="Script.js">

</script>

</html>
