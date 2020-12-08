function initButton()
{
	let loInstrButton = document.getElementsByClassName("applicant")[0];
	loInstrButton.addEventListener("click", function (poEvent)
	{
		let loMarker1 = document.getElementById("applicantMarker1");
		let loMarker1Coord = loMarker1.getBoundingClientRect();
		document.getElementById("one").style.cssText = "top: " + loMarker1Coord.top + "px; left: " + loMarker1Coord.left + "px;";
		let loMarker2 = document.getElementById("applicantMarker2");
		let loMarker2Coord = loMarker2.getBoundingClientRect();
		document.getElementById("two").style.cssText = "top: " + loMarker2Coord.top + "px; left: " + loMarker2Coord.left + "px;";
		let loMarker3 = document.getElementById("applicantMarker3");
		let loMarker3Coord = loMarker3.getBoundingClientRect();
		document.getElementById("three").style.cssText = "top: " + loMarker3Coord.top + "px; left: " + loMarker3Coord.left + "px;";
		document.getElementById("applicantOverlay").style.display = "block";
	});

	document.getElementById("applicantOverlay").addEventListener("click", function (poEvent)
	{
		poEvent.currentTarget.style.display = "none";
	});
}

(function (window)
{
	initButton();
}(window));
