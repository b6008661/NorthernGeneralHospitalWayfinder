var E = "Entrance/Exit";
var M = "Medical Care";
var Q = "QR Code";
var H = "Hallway";
var S = "Stairs";
var L = "Lift";
var C = "Cafe";

var nodeClass = function(id, name, disabled, type)
{
	this.id = id;
	this.name = name;
	this.connections = new Array();
	this.disabled = disabled;
	this.type = type;
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

var entrance = new nodeClass(i++,"West Entrance",true, E);
var outpatients = new nodeClass(i++,"Outpatients",true, M);
var wardA = new nodeClass(i++, "Ward A", true, M);
var qrWest = new nodeClass(i++, "QR Code West Corridor", true, Q);
var cardiology = new nodeClass(i++, "Cardiology", true, M);
var intersection = new nodeClass(i++, "Intersection", true, H);
var qrNorth = new nodeClass(i++, "QR Code North Stairs", true, Q);
var stairsNorth = new nodeClass(i++, "Stairs North", false, S);
var qrEast = new nodeClass(i++, "QR Code East Corridor", true, Q);
var liftEast = new nodeClass(i++, "Lift East Corridor", true, L);
var cafeEast = new nodeClass(i++, "The Sun Rise Cafe", true, C);


entrance.connections.push(new connect(outpatients.id, "East"));
outpatients.connections.push(new connect(entrance.id, "West"), new connect(wardA.id, "East"));
wardA.connections.push(new connect(outpatients.id, "West"), new connect(cardiology.id, "East"));
qrWest.connections.push(new connect(cardiology.id, "East"), new connect(wardA.id, "West"));
cardiology.connections.push(new connect(wardA.id, "West"), new connect(intersection.id, "East"));
intersection.connections.push(new connect(cardiology.id, "West"), new connect(stairsNorth.id, "North"), new connect(liftEast.id, "East"));
qrNorth.connections.push(new connect(intersection.id, "South"), new connect(stairsNorth.id, "North"));
stairsNorth.connections.push(new connect(intersection.id, "South"));
qrEast.connections.push(new connect(intersection.id, "East"), new connect (liftEast.id, "East"));
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
	/*if (found == true)
		console.log("Node found as " + nodes[i].name + " at id " + nodes[i].id);
	else
		console.log("Node not found");*/
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

function onLoad()
{
	populateDropDownStart();
	populateDropDownEnd();
	selectDefaultStart();
}

window.onload = function()
{
	populateDropDownStart();
	populateDropDownEnd();
	selectDefaultStart();
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

function findPath()
{
	var end = startAtName(dropdownboxend.value);
	var start = startAtName(dropdownboxstart.value);
  var path = new Array();
	fastestPath = new Array();
	var loc = start;
	var previous = start;
	path.push(start);
	followPath();

	for (var i = 0; i < fastestPath.length; i++) {
		console.log( i + ". " + startAtId(fastestPath[i]));
	}



	function followPath()
	{
		for (var i = 0; i < nodes[loc].connections.length; i++) {	 //Loops through each edge
			if(!path.includes(nodes[loc].connections[i].id)) {			//Check if next node is in the path array (double back)
				path.push(nodes[loc].connections[i].id);						//Adds node to path array
				if (nodes[loc].connections[i].id == end) {						//Checks if next node is the end
					if (fastestPath.length == 0)	{										//Checks if this is the first found path to the end
						fastestPath = path.slice();											//Copies current path into the global variable fastest path
						console.log(fastestPath);
					}
					else if (path.length <= fastestPath.length) {			//Checks if a new path to the end is faster than the current one
							fastestPath = path.slice();										//Copies current path into the global variable fastest path
							console.log(fastestPath);
					}
				}
				else {																								//If next node isn't the destination then...
					loc = nodes[loc].connections[i].id;								//Set new location to the next node
					followPath(); 																	  //**Recursion** Go through for loop of edges connected to nodes
					if (path.length > 1)	{													  //If the path array holds 2 or more items
						path.splice(-1,1);														  //Backtrack the algorithm by one to previous node in path
						loc = path[path.length-1]; 										  //New location is the previous node
					}
					else {
						loc = start;																		//If the path array has backtracked to the start
						//path.length = 1
					}
				}
			}
		}
	}
}
