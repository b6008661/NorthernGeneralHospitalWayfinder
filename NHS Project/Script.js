var E = "Entrance/Exit";
var M = "Medical Care";
var Q = "QR Code";
var H = "Hallway";
var S = "Stairs";
var L = "Lift";
var C = "Cafe";

var nodeClass = function(id, name, disabled, type, facing)
{
	this.id = id;
	this.name = name;
	this.connections = new Array();
	this.disabled = disabled;
	this.type = type;
	this.facing = facing;
}

var connect = function(idNumber, direction)
{
	this.id=idNumber;
	this.direction = direction;
	if (direction != "North" && direction != "East" && direction != "South" && direction != "West")
		direction = null;
}

i=0;

var nodes = new Array;

var entrance = new nodeClass(i++,"West Entrance",true, E, "Null");
var outpatients = new nodeClass(i++,"Outpatients",true, M, "Null");
var wardA = new nodeClass(i++, "Ward A", true, M, "Null");
var qrWest = new nodeClass(i++, "QR Code West Corridor", true, Q, "North");
var cardiology = new nodeClass(i++, "Cardiology", true, M, "Null");
var intersection = new nodeClass(i++, "Intersection", true, H, "Null");
var qrNorth = new nodeClass(i++, "QR Code North Stairs", true, Q, "East");
var stairsNorth = new nodeClass(i++, "Stairs North", false, S, "Null" );
var qrEast = new nodeClass(i++, "QR Code East Corridor", true, Q, "South");
var liftEast = new nodeClass(i++, "Lift East Corridor", true, L, "Null");
var cafeEast = new nodeClass(i++, "The Sun Rise Cafe", true, C, "Null");


entrance.connections.push(new connect(outpatients.id, "East"));
outpatients.connections.push(new connect(entrance.id, "West"), new connect(wardA.id, "East"));
wardA.connections.push(new connect(outpatients.id, "West"), new connect(cardiology.id, "East"));
qrWest.connections.push(new connect(cardiology.id, "East"), new connect(wardA.id, "West"));
cardiology.connections.push(new connect(wardA.id, "West"), new connect(intersection.id, "East"));
intersection.connections.push(new connect(cardiology.id, "West"), new connect(stairsNorth.id, "North"), new connect(liftEast.id, "East"));
qrNorth.connections.push(new connect(intersection.id, "South"), new connect(stairsNorth.id, "North"));
stairsNorth.connections.push(new connect(intersection.id, "South"));
qrEast.connections.push(new connect(intersection.id, "West"), new connect (liftEast.id, "East"));
liftEast.connections.push(new connect(intersection.id, "East"), new connect (cafeEast.id, "East"));
cafeEast.connections.push(new connect(liftEast.id, "West"));


nodes.push(entrance);
nodes.push(outpatients);
nodes.push(wardA);
nodes.push(qrWest);
nodes.push(cardiology);
nodes.push(intersection);
nodes.push(qrNorth);
nodes.push(stairsNorth);
nodes.push(qrEast);
nodes.push(liftEast);
nodes.push(cafeEast);

function startAtId(idNumber)
{
	i = 0;
	var found = false;
	while (found == false && i != nodes.length)
	{
		if (nodes[i].id == idNumber)
			found = true;
		else
			i++;
	}
	return nodes[i].name;
}

function getName()
{
	var nameEntry = document.getElementById("inputbox").value;
	startAtName(nameEntry);
}

function startAtName(enterName)
{
	i = 0;
	var found = false;
	while (found == false && i != nodes.length)
	{
		if (nodes[i].name.toUpperCase() == enterName.toUpperCase())
			found = true;
		else
			i++;
	}
	if (found == true)
		console.log(nodes[i].name + " at id " + nodes[i].id);
	else
		console.log("Node not found");
	return i;
}

window.onload = function()
{
	populateDropDownStart();
	populateDropDownEnd();
	selectDefaultStart();
	document.getElementById("disabled").checked = false;
	loadPreviousLocation();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loadPreviousLocation()
{
	var previousLocation = localStorage.getItem("previousLocation");
	var dropdownboxend = document.getElementById("dropdownboxend");
	var locationIndex = getIndexOfLocationInDropdownList(dropdownboxend,previousLocation);
	dropdownboxend.selectedIndex = locationIndex;
}

function getIndexOfLocationInDropdownList(dropdown, location)
{
	var index = 0;
	var found = false;
	while ((!found) && (index < dropdown.length))
	{
		if (location == dropdown.options[index].text)
		{
			found = true;
			index--;
		}
		index++;
	}
	if (found)
	{
		return index;
	}
	else
	{
		return -1;
	}
}

function selectDefaultStart()
{
	var list = document.getElementById('dropdownboxstart');
	var nodeID = getParameterByName("nodeID");
	list.selectedIndex = nodeID;
}

function populateDropDownStart()
{
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].type == Q)
			addToList(dropdownboxstart, i);
	}

	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].type == E || nodes[i].type == M || nodes[i].type == C)
			addToList(dropdownboxstart, i);
	}
}

function populateDropDownEnd()
{
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].type == E || nodes[i].type == M || nodes[i].type == C)
			addToList(dropdownboxend, i);
	}
}

function addToList(dropDown,i)
{
	var newDropDownOption = document.createElement("OPTION");
	newDropDownOption.text = nodes[i].name;
	newDropDownOption.value = nodes[i].name;
	dropDown.options.add(newDropDownOption);
}

var fastestPath = new Array();

/*function findPath()
{
	var end = startAtName(dropdownboxend.value);
	var start = startAtName(dropdownboxstart.value);
	localStorage.setItem("previousLocation",dropdownboxstart.options[dropdownboxstart.selectedIndex].text);
  var path = new Array();
	fastestPath = new Array();
	var loc = start;
	var previous = start;
	var isDisabled = document.getElementById("disabled").checked;
	var pathTraversable = true;

	path.push(start);
	followPath();
	displayDirections();

	function followPath()
	{
		for (var i = 0; i < nodes[loc].connections.length; i++) {	 //Loops through each edge
			if (isDisabled==true && nodes[loc].disabled == false)
				pathTraversable = false;
			else
				pathTraversable = true;
			if(!path.includes(nodes[loc].connections[i].id) && pathTraversable == true) {		//Check if next node is in the path array (double back)
				path.push(nodes[loc].connections[i].id);						//Adds node to path array
				if (nodes[loc].connections[i].id == end) {					//Checks if next node is the end
					if (fastestPath.length == 0)	{										//Checks if this is the first found path to the end
						fastestPath = path.slice();											//Copies current path into the global variable fastest path
						path.splice(-1,1);
					}
					else if (path.length <= fastestPath.length) {				//Checks if a new path to the end is faster than the current one
							fastestPath = path.slice();										//Copies current path into the global variable fastest path
							path.splice(-1,1);
					}
				}
				else {																								//If next node isn't the destination then...
					loc = nodes[loc].connections[i].id;								//Set new location to the next node
					followPath(); 																	  //**Recursion** Go through for loop of edges connected to nodes
							path.splice(-1,1);														  //Backtrack the algorithm by one to previous node in path
							loc = path[path.length-1]; 										  //New location is the previous node
						}
					}
				}
			}

		function displayDirections()
		{

			for (var i = 0; i < fastestPath.length; i++) { //List all items in array
					console.log( i + ". " + startAtId(fastestPath[i]));
				}

			if (nodes[fastestPath[0]].type == Q) {
			var newFacing = nodes[fastestPath[0]].facing;
			var i = 0;
			console.log("Facing the QR code turn " + findInstruction(newFacing, findNextNodeDirection(i)) + " and walk straight");
			newFacing = findNextNodeDirection(i);
					for (i=1; i < fastestPath.length-1; i++) {
							var nextDirection = findInstruction(newFacing, findNextNodeDirection(i));
							var locationName = nodes[fastestPath[i]].name;
							var cafeMessage

							if (nodes[fastestPath[i]].type == L)
								locationName = "the lifts";
							if (nodes[fastestPath[i]].type == H)
								locationName = "the intersection";


							if (nextDirection == "left" || nextDirection == "right")
								console.log("Turn " + nextDirection + " at " + locationName);
								else if (nextDirection == "straight")
									console.log("Continue walking past " + locationName);
									else if(nextDirection == "Turn around and walk forward")
									 	console.log(nextDirection + " past " + locationName);



							newFacing = findNextNodeDirection(i);
					}
					console.log("You have now reached " + nodes[fastestPath[fastestPath.length-1]].name);

					if (nodes[fastestPath[i]].type == C)
						console.log("Enjoy your meal!");
						console.log("-------------------");
				}
			}
		}

		function findNextNodeDirection(fastestPathPosition)
		{
			var nextFastestPathPosition = fastestPathPosition + 1;

			for (var i = 0; i < nodes[fastestPath[fastestPathPosition]].connections.length; i++) {
				if (nodes[fastestPath[fastestPathPosition]].connections[i].id == fastestPath[nextFastestPathPosition])
					return nodes[fastestPath[fastestPathPosition]].connections[i].direction;
			}
		}

		function findInstruction(currentFacing, end)
		{
			var compassDirection;
			switch (currentFacing) {
				case "North":
						switch (end) {
							case "North":
								compassDirection = "straight";
								newFacing = "North";
								break;
							case "East":
								compassDirection = "right";
								newFacing = "East";
								break;
							case "South":
								compassDirection = "Turn around and walk forward";
								newFacing = "South";
							case "West":
								compassDirection = "left";
								newFacing = "West";
								break;
						}
					break;
				case "East":
					switch(end){
						case "North":
							compassDirection = "left";
							newFacing = "North";
							break;
						case "East":
							compassDirection = "straight";
							newFacing = "East";
							break;
						case "South":
							compassDirection = "right";
							newFacing = "South";
							break;
						case "West":
							compassDirection = "Turn around and walk forward";
							newFacing = "West"
							break;
					}
					break;
				case "South":
					switch(end){
						case "North":
							compassDirection = "Turn around and walk forward";
							newFacing = "North"
							break;
						case "East":
							compassDirection = "left";
							newFacing = "East";
							break;
						case "South":
							compassDirection = "straight";
							newFacing = "South";
							break;
						case "West":
							compassDirection = "right";
							newFacing = "West";
							break;
					}
					break;
				case "West":
					switch(end){
						case "North":
							compassDirection = "right";
							newFacing = "North";
							break;
						case "East":
							compassDirection = "Turn around";
							newFacing = "East";
							break;
						case "South":
							compassDirection = "left";
							newFacing = "South";
							break;
						case "West":
							compassDirection = "straight"
							newFacing = "West";
							break;
					}

			}

			return compassDirection;
}*/

function dropDownBoxStartValue()
{
	var URL = encodeURIComponent(startAtName(dropdownboxstart.value));
	return URL;
}

function dropDownBoxEndValue()
{
	return encodeURIComponent(startAtName(dropdownboxend.value));
}

function setDisabledValue()
{
	return encodeURIComponent(disabled.checked);
}

function setValuesForBoxes()
{
	document.getElementById("start").value = dropDownBoxStartValue();
	document.getElementById("end").value = dropDownBoxEndValue();
	document.getElementById("disabled").value = setDisabledValue();
}
