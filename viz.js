
/*get data*/
var dataFile = d3.csv("data_file.csv");
dataFile.then(function (data) {
    
    console.log(data); 

    /* Data Variables */
    var foxAvgPolarity = 0;
    var foxAvgSubj = 0;
    var foxNumHeads = 0;

    /* Sort data into arrays */
	var dates = [];

	/*FOX*/
	var foxHeadlines = [];
	var foxPolarities = [];
	var foxSubjs = [];
	var foxCats = [];

	for (var i = 0; i < data.length; i++) {
		dates[i] = data[i]["Date"];

		foxHeadlines[i] = data[i]["Fox Headline"];
		foxPolarities[i] = data[i]["Fox Polarity"];
		foxSubjs[i] = data[i]["Fox Subjectivity"];
		foxCats[i] = data[i]["Fox Category"];
	}
	
	foxNumHeads = foxHeadlines.length;
	var total = 0;
	var totalSubj = 0;

	/* polarity */
	for (var i = 0; i < foxPolarities.length; i++) {
		total += parseFloat(foxPolarities[i]);
		/*console.log("total is: " + total);*/
	}

	foxAvgPolarity = total/foxPolarities.length;
	console.log("Average Fox Polarity: " + foxAvgPolarity);	
	total = 0;

	/* subjectivity */
	for (var i = 0; i < foxSubjs.length; i++) {
		total += parseFloat(foxSubjs[i]);
		/*console.log("total is: " + total);*/
	}

	foxAvgSubj = total/foxSubjs.length;
	console.log("Average Fox Subjectivity: " + foxAvgSubj);

	/* Do D3 stuff */
	vizData = data;
	console.log(vizData);


	var svgContainer = d3.select("body")
	.append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.style("border", "1px solid black")
	
	var svgCircles = svgContainer.append("circle")
	.attr("cx", 250)
	.attr("cy", 250)
	.attr("r", 100)
	.style("fill", "lightblue")



}, function (error) {
    console.error('file loading error: ', error);
});

