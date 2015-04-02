//Javascript 
//XML Getting Script
//SCRIPT OBTAINED FROM IN CLASS EXERCISE


//xml variables
var xmlFile = "options.xml";
var tagName = "select";
var attrName = "text";

var myHTTPrequest = getHTTPObject();
var xmlDoc;
var listOfSelects = [];

///////// Create and get an http object (ajax)
function getHTTPObject() {
	var xmlhttp;
	// Check to see if you can use native XMLHttpRequest object or ActiveX
	if (window.XMLHttpRequest){
  			xmlhttp=new XMLHttpRequest();
  	}
	//  ... for IE/Windows ActiveX version
	else if (window.ActiveXObject){
  			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}		/// you're using a browser that doesn't allow http object
			else{	// return false to the variable on line 10
 					return false;
  				}
  	/// return the object to the variable on line 10
	return xmlhttp;	
}

//CREATES LIST OF SELECTS WITH OPTIONS
//this code runs once, when the page is loaded, and reads in all
//the information it needs from the XML file
function handleHttpResponse() {
	// first check if the http request is there
	if (myHTTPrequest) {
    	// good, myHTTPrequest has something (not = false)
		myHTTPrequest.open("GET", xmlFile, false);
		myHTTPrequest.setRequestHeader("content-type", "text/xml");
    	myHTTPrequest.send(null);
	}

	//check to see if unsupported browser(IE) is being used.
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10
        window.location="http://www.google.com/chrome/";
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11
        window.location="http://www.google.com/chrome/";
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12
       window.location="http://www.google.com/chrome/";
    }

	// Now see if the request got something from the server 
  	if (myHTTPrequest.readyState == 4) {
    // is the server response a good one?
    	if (myHTTPrequest.status==200) {
      		// Use the XML DOM to unpack the XML data 
      		xmlDoc = myHTTPrequest.responseXML; 
      		
			// now build a list of data from the XML document
			
			// concatenate all of the 'text' attribute values 
			// that are in the select nodes in the xml file
			// NOTE: this is where your code could be different 
			//           -- it depends on what your XML file holds
			// mine has a 'text' attribute

			//gets initial question
			var contents='';
			var selectLength = xmlDoc.getElementsByTagName(tagName).length;
			for(var i=0; i<selectLength; i++){
           		var tempStorage=
           				xmlDoc.getElementsByTagName(tagName)[i].getAttribute(attrName);
				contents += tempStorage + "<br/>";
      		}
      		//gets options
      		var contents2='';
      		var selectLength2 = xmlDoc.getElementsByTagName("option").length;
      		for(var i=0; i<selectLength2; i++){
      			var tempStorage2=
      					xmlDoc.getElementsByTagName("option")[i].getAttribute("text");
      			contents2 += tempStorage2 + "<br/>";
      		}
      		//gets options to add
      		var contents3= [];
      		var selectLength3 = xmlDoc.getElementsByTagName("option").length;
      		for(var i=0; i<selectLength3; i++){
      			var tempStorage3 =
      					xmlDoc.getElementsByTagName("option")[i].getAttribute("toAdd");
      			contents3 += tempStorage3;
      		}

			// put the concatenated string into the 'container'
			//     element in your html document
      		//document.getElementById('mainLeftDiv').innerHTML += contents;
      		//document.getElementById('selectDiv').innerHTML += contents;
      		for(var i=0; i<selectLength; i++){
      			var sel = document.createElement("select");
      			sel.setAttribute("id","mySelect"+i);
      			var theOpInitial = "op0";
      			var theOpInitial = document.createElement("option");
      			theOpInitial.text = xmlDoc.getElementsByTagName(tagName)[i].getAttribute(attrName);
      			sel.appendChild(theOpInitial);
      			sel.setAttribute("onChange","toggleSelect(this)");
      			sel.setAttribute("class","form-control");
      			listOfSelects[i] = sel;
      		}
      		//Adds options to a select statement.
      		for(var i = 0; i<listOfSelects.length; i++){
      			for(var j=0; j<selectLength2; j++){
      				if(i == contents3[j]){
      					var option = document.createElement("option");
      					option.text = xmlDoc.getElementsByTagName("option")[j].getAttribute(attrName);
      					option.value = xmlDoc.getElementsByTagName("option")[j].getAttribute("value");
      					listOfSelects[i].appendChild(option);
      				}
      			}
      		}
      		document.getElementById("selectDiv").appendChild(listOfSelects[0]);
      		document.getElementById("formDiv").style.display = "none";
	 	}
  	}
}

//returns the selected value
function getValue(ele){
	return ele.options[ele.selectedIndex].value
}

//removes the last element, when switching options prior to the last one
function removeLastChild(theEle){
	var last = document.getElementById("selectDiv").lastChild;
	while(last.id != theEle.id){
		document.getElementById("selectDiv").lastChild.selectedIndex = 0;
		document.getElementById("selectDiv").removeChild(document.getElementById("selectDiv").lastChild);
		last = document.getElementById("selectDiv").lastChild;
	}
}

//toggles the selects
function toggleSelect(ele){
	//sunny
	backCol = colorToHex(window.getComputedStyle(document.getElementById("bod")).getPropertyValue('background-color'));

	if(getValue(ele) == "SU"){

		if(document.getElementById("selectDiv").lastChild != ele){
			removeLastChild(ele);
		}
		colorFade("bod",backCol,"ffff8d",25,30);
		document.getElementById("selectDiv").appendChild(listOfSelects[1]);
		createFinalNode();
		createFinalColor();
	}
	//cloudy
	if(getValue(ele) == "CL"){
		if(document.getElementById("selectDiv").lastChild != ele){
			removeLastChild(ele);
		}
		colorFade("bod",backCol,"9e9e9e",25,30);
		document.getElementById("selectDiv").appendChild(listOfSelects[4]);
		createFinalNode();
		createFinalColor();
	}
	//hot
	if(getValue(ele) == "H"){
		if(document.getElementById("selectDiv").lastChild != ele){
			removeLastChild(ele);
		}
		colorFade("bod",backCol,"ffa000",25,30);
		document.getElementById("selectDiv").appendChild(listOfSelects[2]);
		createFinalNode();
		createFinalColor();
	}
	//cold
	if(getValue(ele) == "C"){
		if(document.getElementById("selectDiv").lastChild != ele){
			removeLastChild(ele);
		}
		colorFade("bod",backCol,"82b1ff",25,30);
		document.getElementById("selectDiv").appendChild(listOfSelects[3]);
		createFinalNode();
		createFinalColor();
	}
	//snow
	if(getValue(ele) == "S"){
		if(document.getElementById("selectDiv").lastChild != ele){
			removeLastChild(ele);
		}
		colorFade("bod",backCol,"bbdefb",25,30);
		document.getElementById("selectDiv").appendChild(listOfSelects[5]);
		createFinalNode();
		createFinalColor();
	}
	//rain
	if(getValue(ele) == "R"){
		if(document.getElementById("selectDiv").lastChild != ele){
			removeLastChild(ele);
		}
		colorFade("bod",backCol,"4ABBFF",25,30);
		document.getElementById("selectDiv").appendChild(listOfSelects[6]);
		createFinalNode();
		createFinalColor();
	}
	//desert
	if(getValue(ele) == "1H"){
		colorFade("bod",backCol,"7F6040",25,30);
		createFinalNode();
		createFinalColor();
	}
	//beach
	if(getValue(ele) == "2H"){
		colorFade("bod",backCol,"FCD89D",25,30);
		createFinalNode();
		createFinalColor();
	}
	//tundra
	if(getValue(ele) == "1C"){
		colorFade("bod",backCol,"5D7CA6",25,30);
		createFinalNode();
		createFinalColor();
	}
	//arctic
	if(getValue(ele) == "2C"){
		colorFade("bod",backCol,"A1AEDE",25,30);
		createFinalNode();
		createFinalColor();
		
	}
	//blizzard
	if(getValue(ele) == "S1"){
		colorFade("bod",backCol,"7C8AA6",25,30);
		createFinalNode();
		createFinalColor();
	}
	//slush
	if(getValue(ele) == "S2"){
		colorFade("bod",backCol,"998D81",25,30);
		createFinalNode();
		createFinalColor();
	}
	//hurricane
	if(getValue(ele) == "R1"){
		colorFade("bod",backCol,"517373",25,30);
		createFinalNode();
		createFinalColor();
	}
	//freezing rain
	if(getValue(ele) == "R2"){
		colorFade("bod",backCol,"90caf9",25,30);
		createFinalNode();
		createFinalColor();
	}
}

//reset current selection
function resetSelection(){
	var last = document.getElementById("selectDiv").lastChild;
	while(last.id != "mySelect0"){
		document.getElementById("selectDiv").lastChild.selectedIndex = 0;
		document.getElementById("selectDiv").removeChild(document.getElementById("selectDiv").lastChild);
		last = document.getElementById("selectDiv").lastChild;
	}
	colorFade("bod",colorToHex(window.getComputedStyle(document.getElementById("bod")).getPropertyValue('background-color')),"FFFFFF",25,30);
	document.getElementById("mySelect0").selectedIndex = 0;
	if(document.getElementById("finalSelection").lastChild != null){
		if(document.getElementById("finalSelection").lastChild.tagName = "h2"){
			document.getElementById("finalSelection").removeChild(document.getElementById("finalSelection").lastChild);
		}
	}
	if(document.getElementById("rightDiv").lastChild.tagName == "IMG"){
		document.getElementById("rightDiv").removeChild(document.getElementById("rightDiv").lastChild);
	}
	document.getElementById("formDiv").style.display = "none";
}

//COLOR FADE
// main function to process the fade request 
// code to make the background color fade is taken from 
// http://www.scriptiny.com/2008/05/javascript-color-fading-script/
function colorFade(id,start,end,steps,speed) {
  var startrgb,endrgb,er,eg,eb,step,rint,gint,bint,step;
  var target = document.getElementById(id);
  steps = steps || 20;
  speed = speed || 20;
  clearInterval(target.timer);
  endrgb = colorConv(end);
  er = endrgb[0];
  eg = endrgb[1];
  eb = endrgb[2];
  if(!target.r) {
    startrgb = colorConv(start);
    r = startrgb[0];
    g = startrgb[1];
    b = startrgb[2];
    target.r = r;
    target.g = g;
    target.b = b;
  }
  rint = Math.round(Math.abs(target.r-er)/steps);
  gint = Math.round(Math.abs(target.g-eg)/steps);
  bint = Math.round(Math.abs(target.b-eb)/steps);
  if(rint == 0) { rint = 1 }
  if(gint == 0) { gint = 1 }
  if(bint == 0) { bint = 1 }
  target.step = 1;
  target.timer = setInterval( function() { animateColor(id,steps,er,eg,eb,rint,gint,bint) }, speed);
}

// incrementally close the gap between the two colors //
function animateColor(id,steps,er,eg,eb,rint,gint,bint) {
  var target = document.getElementById(id);
  var color;
  if(target.step <= steps) {
    var r = target.r;
    var g = target.g;
    var b = target.b;
    if(r >= er) {
      r = r - rint;
    } else {
      r = parseInt(r) + parseInt(rint);
    }
    if(g >= eg) {
      g = g - gint;
    } else {
      g = parseInt(g) + parseInt(gint);
    }
    if(b >= eb) {
      b = b - bint;
    } else {
      b = parseInt(b) + parseInt(bint);
    }
    color = 'rgb(' + r + ',' + g + ',' + b + ')';
    target.style.backgroundColor = color;
    target.r = r;
    target.g = g;
    target.b = b;
    target.step = target.step + 1;
  } else {
    clearInterval(target.timer);
    color = 'rgb(' + er + ',' + eg + ',' + eb + ')';
    target.style.backgroundColor = color;
  }
}

// convert the color to rgb from hex //
function colorConv(color) {
  var rgb = [parseInt(color.substring(0,2),16), 
    parseInt(color.substring(2,4),16), 
    parseInt(color.substring(4,6),16)];
  return rgb;
}

// convert the color to hex from rgb
function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + rgb.toString(16);
}

// creates the final text node with what the user selected
function createFinalNode(){

	//check of node already exists, if it does, delete and create new one
	if(document.getElementById("finalSelection").lastChild != null){
		if(document.getElementById("finalSelection").lastChild.tagName = "h2"){
			document.getElementById("finalSelection").removeChild(document.getElementById("finalSelection").lastChild);
			document.getElementById("formDiv").style.display = "none";
		}
	}

	var finalString = "Your selected options are ";
	var selects = document.getElementsByTagName("select");
	//if all the options are selected
	if(selects.length == 3){
		if(selects[2].options[selects[2].selectedIndex].index != 0){
			//loop through the selected options and append them to a final string, which displays
			//the users final choice.
			for(i=0;i<selects.length;i++){
				finalString += selects[i].options[selects[i].selectedIndex].text + " ";
			}
		var fin = document.createElement("h3");
		var text = document.createTextNode(finalString);
		//set local storage to the users final selection
		if(typeof(Storage) !== "undefined") {
    	// Code for localStorage
    		localStorage.setItem("finalChoice",finalString);
		} else {
    	// Sorry! No Web Storage support..

		}
		fin.appendChild(text);
		document.getElementById("formDiv").style.display = "initial";
		document.getElementById("finalSelection").appendChild(fin);

		}
	}
}

//creates the final color node with what the user selected
function createFinalColor(){

	//removes pic if pic is already there
	if(document.getElementById("rightDiv").lastChild.tagName == "IMG"){
		document.getElementById("rightDiv").removeChild(document.getElementById("rightDiv").lastChild);
	}

	var selects = document.getElementsByTagName("select");

	//if all the selects are selected
	if(selects.length == 3 && selects[2].options[selects[2].selectedIndex].index != 0){
		var pic = document.createElement("img");
		pic.setAttribute("src", "images/" + selects[2].options[selects[2].selectedIndex].innerHTML + ".png");
		pic.setAttribute("height","135px");
		pic.style.border = "5px solid black";
		document.getElementById("rightDiv").appendChild(pic);
	}
}

//error checking for form validation
function validateForm(){
	var errorMsg = "";
	var firstName = document.getElementById("formName");
	var email = document.getElementById("formEmail");


	if(!firstName.value || firstName.value.match(/\d+/g)){
		errorMsg += "Please enter a valid name. ";
	}

	if(!email.value){
		errorMsg += "Please enter a email.";
	}

	if(errorMsg){
		var p = document.createElement("p");
		var t = document.createTextNode(errorMsg);
		p.appendChild(t);
		p.style.color = "red";
		p.id = "errorMsg";
		//local storage stores firstname and email in form.
		localStorage.setItem("name", firstName);
		localStorage.setItem("email", email);
		if(document.getElementById("errorMsg") == null){
			document.getElementById("formDiv").appendChild(p);
		}
		return false;
	} 
	else{
		return true;
	}
}

//allows the user to download the image selection
function downloadSelection(){
	var selects = document.getElementsByTagName("select");
	window.open("images/" + selects[2].options[selects[2].selectedIndex].innerHTML + ".png");
}




