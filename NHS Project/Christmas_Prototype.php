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
	<form class="locationInput">
		<input type= "text" name = "location" value="Enter something here ">
		<input type="submit" value="Submit">

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
		<br>

		<div class = "box">
		<h2>Select your destination:</h2>
		<div class = "dropDown">
		<select name = "dropdownboxend" id = dropdownboxend></select>
	</div>
	</div>

		<br>
		<br>
		<div class = "section">
<div class="disabled">
		<form action="">
		<h2>Do you need disabled access? <input type="checkbox" name = "disabled" id="disabled" checked=false>
		</form>
	</div>

		<br>
		<div class="findPath">
		<button class = "button" onclick = "findPath()"> Find Path </button>
</div>
</div>
</div>
</body>

<script src="Script.js"></script>

</html>
