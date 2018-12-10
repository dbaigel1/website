


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
	/*TO-DO: Connect data to viz and make axes */
	vizData = data;
	
	var svgContainer = d3.select("body")
	.append("svg")
	.attr("width", 1000)
	.attr("height", 500);
	/*.style("border", "1px solid black")*/

	/* Create Axes */
	var axisScaleX = d3.scaleLinear()
                         .domain([-1,1])
                         .range([0,900]);

	var xAxis = d3.axisBottom()
                      .scale(axisScaleX);

    var xAxisGroup = svgContainer.append("g").call(xAxis);

    var axisScaleY = d3.scaleLinear()
    					.domain([0,1])
    					.range([0,400]);

    var yAxis = d3.axisRight()
    				.scale(axisScaleY);

    var yAxisGroup = svgContainer.append("g").call(yAxis);
	
    /* Scale data to conform to axes */
    var scaledFoxPolarities = [];
 	var scaledFoxSubjs = [];

 	for (var i = 0; i < foxPolarities.length; i++) {
  		scaledFoxPolarities[i] = axisScaleX(foxPolarities[i]);
	}
	
	for (var i = 0; i < foxSubjs.length; i++) {
  		scaledFoxSubjs[i] = axisScaleY(foxSubjs[i]);
	}

	/* change avg polarity to its scaled form */
	total = 0;
	for (var i = 0; i < scaledFoxPolarities.length; i++) {
		total += parseFloat(scaledFoxPolarities[i]);
		/*console.log("total is: " + total);*/
	}

	scaledFoxAvgPolarity = total/scaledFoxPolarities.length;

	/* change avg subjectivity to its scaled form */
	total = 0;
	for (var i = 0; i < scaledFoxSubjs.length; i++) {
		total += parseFloat(scaledFoxSubjs[i]);
		/*console.log("total is: " + total);*/
	}

	scaledFoxAvgSubj = total/scaledFoxSubjs.length;

	var svgCircles = svgContainer.append("circle")
	.attr("cx", scaledFoxAvgPolarity)
	.attr("cy", scaledFoxAvgSubj)
	.attr("r", 30)
	.style("fill", "lightblue")



}, function (error) {
    console.error('file loading error: ', error);
});

