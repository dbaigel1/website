


/*get data*/
var dataFile = d3.csv("data_file.csv");
dataFile.then(function (data) {
    
    console.log(data); 

    var containerWidth = 1000;
    var containerHeight = 500;
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
	
	var svgContainer = d3.select("#graph")
	.append("svg")
	.attr("width", containerWidth)
	.attr("height", containerHeight)
	/*.style("border", "1px solid black");*/

	/* Create Axes */
	var axisScaleX = d3.scaleLinear()
                         .domain([-1,1])
                         .range([50,containerWidth-50]);

	var xAxis = d3.axisTop()
                      .scale(axisScaleX);

    var xAxisGroup = svgContainer.append("g")
    .attr("transform", `translate(0, ${containerHeight-30})`)
    .call(xAxis);

    var axisScaleY = d3.scaleLinear()
    					.domain([0,1])
    					.range([50,containerHeight-60]);

    var yAxis = d3.axisRight()
    				.scale(axisScaleY);

    var yAxisGroup = svgContainer.append("g")
    .attr("transform", "translate(30, 0)")
    .call(yAxis);
	
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

	/* axis labels*/
	var xLabel = svgContainer.append("text")
						     .attr("text-anchor", "middle")
						     .attr("x", containerWidth/2)
						     .attr("y", containerHeight-10)
						     .style("font-size", "20px")
						     .text("Polarity");

	var yLabel = svgContainer.append("text")
							.attr("text-anchor", "middle")
						    .attr("y", 15)
						    .attr("x", -containerHeight/2)	
						    .attr("transform", "rotate(-90)")
						    .style("font-size", "20px")
						    .text("Subjectivity");

}, function (error) {
    console.error('file loading error: ', error);
});

