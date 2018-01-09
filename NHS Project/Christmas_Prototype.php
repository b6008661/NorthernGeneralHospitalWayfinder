<!DOCTYPE html>
<html>

<head>
	<!--<meta name ="viewport" content="width-device-width, initial-scale=1";-->
	<link rel = "stylesheet" type="text/css" href="css/StyleSheet.css">
	<title> NHS WayFinder </title>
</head>

<body>
<header>
	<img src="images/nhs_logo.jpg" alt="nhs logo"><a href="https://www.nhs.uk/pages/home.aspx"></a>
		<input type= "text" name = "location" value="Enter something here ">
		<input type="submit" value="Search">
	</form>

</header>

		<!--<input type = "text" id = "inputbox" value = "">
		<button onclick = "getName()"> Find Name</button>

		<br>
		<br>
		<br>
	  -->
		<div class="container">
		<div class = "box">
		<h2>Select your starting location:</h2>
		<div class = "dropDown">
		<select name = "dropdownboxstart" id= "dropdownboxstart"></select>
	</div>
	</div>
		<div class = "box">
		<h2>Select your destination:</h2>
		<div class = "dropDown">
		<select name = "dropdownboxend" id = dropdownboxend></select>
	</div>
	</div>
		<form action="">
		</form>

		<form action="directions.html">
<<<<<<< HEAD
			<input id="start" name="start" type="hidden" value="" />
			<input id="end" name="end" type="hidden" value="" />
			<input id="disabled" name="disabled" type="hidden" value=""/>
		<div class="findPath">
		<button class = "button" onclick = "setValuesForBoxes()"> Find Path </button>
		</div>
=======
		<button class = "button" onclick = "findPath()"> Find Path </button>
>>>>>>> 1ae0513b58857eed07f387d8ad0c4398cdd67ac2
		</form>
		</div>
</div>
</body>

<script src="Script.js"></script>

</html>
