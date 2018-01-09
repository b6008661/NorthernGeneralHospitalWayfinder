<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1.0,initial-scale=1">
	<title> NHS WayFinder </title>
	<link rel = "stylesheet" type="text/css" href="css/StyleSheet.css">
	<link href="css/desktop.css" media="only screen and (min-width:601px)" rel="stylesheet" type="text/css">
</head>

<body>
<header>
	<img src="images/nhs_logo.jpg" alt="nhs logo"><a href="https://www.nhs.uk/pages/home.aspx"></a>
<div class="headerText">
	<h1>Northern General Hospital</h1>
	<h1>Find your way</h1>
</div>
	<form>
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
<br>
		<div class = "box">
		<h2>Select your destination:</h2>
		<div class = "dropDown">
		<select name = "dropdownboxend" id = dropdownboxend></select>
	</div>
	</div>
	<br>
		<div class = "box">
		<form action="">
		<h2>Would you like to avoid staircases?</h2> <input type="checkbox" name = "disabled" checked=false>
		</form>
		</div>

		<div class="box">
		<form action="directions.html">
		<button class = "button" onclick = "findPath()"> Find Path </button>
		</form>
		</div>

</div>
</body>

<script src="Script.js"></script>

</html>
