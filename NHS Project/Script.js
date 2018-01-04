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
var cardiology = new nodeClass(i++, "Cardiology", true, M);
var qrWest = new nodeClass(i++, "QR Code West Corridor", true, Q);
var intersection = new nodeClass(i++, "Intersection", true, H);
var qrNorth = new nodeClass(i++, "QR Code North Stairs", true, Q);
var stairsNorth = new nodeClass(i++, "Stairs North", false, S);
var qrEast = new nodeClass(i++, "QR Code East Corridor", true, Q);
var liftEast = new nodeClass(i++, "Lift East Corridor", true, L);
var cafeEast = new nodeClass(i++, "The Sun Rise Cafe", true, C);


entrance.connections.push(new connect(outpatients.id, "East"));
outpatients.connections.push(new connect(entrance.id, "West"), new connect(wardA.id, "East"),null);
wardA.connections.push(new connect(outpatients.id, "West"), new connect(cardiology.id, "East"),null);
qrWest.connections.push(new connect(cardiology.id, "West"), new connect(wardA.id, "East"), null);
cardiology.connections.push(new connect(wardA.id, "West"), new connect(intersection.id, "East"), null);
intersection.connections.push(new connect(wardA.id, "West"), new connect(stairsNorth.id, "North"), new connect(liftEast.id, "East"), null);
qrNorth.connections.push(new connect(intersection.id, "South"), new connect(stairsNorth.id, "North"), null);
stairsNorth.connections.push(new connect(intersection.id, "South"), null);
qrEast.connections.push(new connect(intersection.id, "East"), new connect (liftEast.id, "East"), null);
liftEast.connections.push(new connect(intersection.id, "East"), new connect (cafeEast.id, "East"), null);
cafeEast.connections.push(new connect(liftEast.id, "West"), null);


nodes.push(entrance);
nodes.push(outpatients);
nodes.push(wardA);
nodes.push(cardiology);
nodes.push(qrWest);
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
	while (found == false && i != nodes.length - 1)
	{
		if (nodes[i].id == idNumber)
			found = true;
		else
			i++;
	}
	if (found == true)
		console.log("Node found as " + nodes[i].name + " at id " + nodes[i].id);
	else
		console.log("Node not found");
}

function startAtName(enterName)
{
	i = 0;
	var found = false;
	while (found == false && i != nodes.length - 1)
	{
		if (nodes[i].name.toUpperCase() == enterName.toUpperCase())
			found = true;
		else
			i++;
	}
	if (found == true)
		console.log("Node found as " + nodes[i].name + " at id " + nodes[i].id);
	else
		console.log("Node not found");
}

