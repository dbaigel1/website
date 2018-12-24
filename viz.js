


/*get data*/
var dataFile = d3.csv("tempdata_file.csv");
dataFile.then(function (data) {
    
    console.log(data); 

    var containerWidth = 1000;
    var containerHeight = 500;
    
    /* Sort data into arrays */
	var dates = [];

	var allPolarities = []; /* contains all news source polarity arrays */
	var allSubjs = []; /* contains all news source subjectivity arrays */

	var allAvgPols = []; /* contains all avg polarity values */
	var allAvgSubjs = []; /* contains all avg subj values */

	var newsSources = ["Fox", "NBC", "Wash Post", "ABC", "Breitbart", "BuzzFeed"]; /* contains order of newssources */
	
	/*FOX*/
	var foxAvgPolarity = 0;
    var foxAvgSubj = 0;
    var foxNumHeads = 0;

	var foxHeadlines = [];
	var foxPolarities = [];
	var foxSubjs = [];
	var foxCats = [];

	/*NBC*/
	var nbcAvgPolarity = 0;
    var nbcAvgSubj = 0;
    var nbcNumHeads = 0;

	var nbcHeadlines = [];
	var nbcPolarities = [];
	var nbcSubjs = [];
	var nbcCats = [];

	/*WP*/
	var wpAvgPolarity = 0;
    var wpAvgSubj = 0;
    var wpNumHeads = 0;

	var wpHeadlines = [];
	var wpPolarities = [];
	var wpSubjs = [];
	var wpCats = [];

	/*ABC*/
	var abcAvgPolarity = 0;
    var abcAvgSubj = 0;
    var abcNumHeads = 0;

	var abcHeadlines = [];
	var abcPolarities = [];
	var abcSubjs = [];
	var abcCats = [];

	/*BB*/
	var bbAvgPolarity = 0;
    var bbAvgSubj = 0;
    var bbNumHeads = 0;

	var bbHeadlines = [];
	var bbPolarities = [];
	var bbSubjs = [];
	var bbCats = [];

	/*BF*/
	var bfAvgPolarity = 0;
    var bfAvgSubj = 0;
    var bfNumHeads = 0;

	var bfHeadlines = [];
	var bfPolarities = [];
	var bfSubjs = [];
	var bfCats = [];

	/* give variables data from file */
	for (var i = 0; i < data.length; i++) {
		dates[i] = data[i]["Date"];

		foxHeadlines[i] = data[i]["Fox Headline"];
		foxPolarities[i] = data[i]["Fox Polarity"];
		foxSubjs[i] = data[i]["Fox Subjectivity"];
		foxCats[i] = data[i]["Fox Category"];

		nbcHeadlines[i] = data[i]["NBC Headline"];
		nbcPolarities[i] = data[i]["NBC Polarity"];
		nbcSubjs[i] = data[i]["NBC Subjectivity"];
		nbcCats[i] = data[i]["NBC Category"];

		wpHeadlines[i] = data[i]["Wash Post Headline"];
		wpPolarities[i] = data[i]["Wash Post Polarity"];
		wpSubjs[i] = data[i]["Wash Post Subjectivity"];
		wpCats[i] = data[i]["Wash Post Category"];

		abcHeadlines[i] = data[i]["ABC Headline"];
		abcPolarities[i] = data[i]["ABC Polarity"];
		abcSubjs[i] = data[i]["ABC Subjectivity"];
		abcCats[i] = data[i]["ABC Category"];

		bbHeadlines[i] = data[i]["Breitbart Headline"];
		bbPolarities[i] = data[i]["Breitbart Polarity"];
		bbSubjs[i] = data[i]["Breitbart Subjectivity"];
		bbCats[i] = data[i]["Breitbart Category"];

		bfHeadlines[i] = data[i]["BuzzFeed Headline"];
		bfPolarities[i] = data[i]["BuzzFeed Polarity"];
		bfSubjs[i] = data[i]["BuzzFeed Subjectivity"];
		bfCats[i] = data[i]["BuzzFeed Category"];

	}
	/* add data to ~all~ arrays */
	allPolarities.push(foxPolarities, nbcPolarities, wpPolarities,
	                   abcPolarities, bbPolarities, bfPolarities);
	allSubjs.push(foxSubjs, nbcSubjs, wpSubjs, abcSubjs, bbSubjs, bfSubjs);
	allAvgPols.push(foxAvgPolarity, nbcAvgPolarity, wpAvgPolarity,
	                abcAvgPolarity, bbAvgPolarity, bfAvgPolarity);
	allAvgSubjs.push(foxAvgSubj, nbcAvgSubj, wpAvgSubj, abcAvgSubj, bbAvgSubj, bfAvgSubj);

	/* count of headlines of each news source */
	for (var i = 0; i < data.length; i++) {
		
		if (foxHeadlines[i] != "") {
			foxNumHeads++;
		}

		if (nbcHeadlines[i] != "") {
			nbcNumHeads++;
		}

		if (wpHeadlines[i] != "") {
			wpNumHeads++;
		}

		if (abcHeadlines[i] != "") {
			abcNumHeads++;
		}

		if (bfHeadlines[i] != "") {
			bfNumHeads++;
		}

		if (bbHeadlines[i] != "") {
			bbNumHeads++;
		}
	}

	var total = 0;

	/* polarity */
	for (var source = 0; source < allPolarities.length; source++) {
		
		for (var j = 0; j < allPolarities[source].length; j++) {
			if(allPolarities[source][j] != ""){
				total += parseFloat(allPolarities[source][j]);
			}
		}

		allAvgPols[source] = total / allPolarities[source].length;
		total = 0;
		console.log(allAvgPols[source]);
	}

	/* subjectivity */
	for (var source = 0; source < allSubjs.length; source++) {
		
		for (var j = 0; j < allSubjs[source].length; j++) {
			if (allSubjs[source][j] != ""){
				total += parseFloat(allSubjs[source][j]);
			}
		}

		allAvgSubjs[source] = total / allSubjs[source].length;
		total = 0;
		console.log(allAvgSubjs[source]);
	}

	/* Do D3 stuff */
	/*TO-DO: rearrange y-axis to be 0 to 1*/
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
 	var scaledFoxAvgPolarity = 0;
 	var scaledFoxAvgSubj = 0;

 	var scaledNBCPolarities = [];
 	var scaledNBCSubjs = [];
 	var scaledNBCAvgPolarity = 0;
 	var scaledNBCAvgSubj = 0;
 	
 	var scaledWPPols = [];
 	var scaledWPSubjs = [];
 	var scaledWPAvgPol = 0;
 	var scaledWPAvgSubj = 0;

 	var allScaledPols = [];
 	var allScaledSubjs = [];
 	allScaledPols.push(scaledFoxPolarities, scaledNBCPolarities, scaledWPPols);
 	allScaledSubjs.push(scaledFoxSubjs, scaledNBCSubjs, scaledWPSubjs);

 	var allScaledAvgPols = [];
 	var allScaledAvgSubjs = [];
 	allScaledAvgPols.push(scaledFoxAvgPolarity, scaledNBCAvgPolarity, scaledWPAvgPol);
 	allScaledAvgSubjs.push(scaledFoxAvgSubj, scaledNBCAvgSubj, scaledWPAvgSubj);

 	var idealPol = axisScaleX(0);
 	var idaelSubj = axisScaleY(0);

	total = 0;
 	
 	/* avg scaled polarity */
 	for (var source = 0; source < allScaledPols.length; source++) {
 		for (var i = 0; i < allPolarities[source].length; i++) {
 			allScaledPols[source][i] = axisScaleX(allPolarities[source][i]);
 			total += parseFloat(allScaledPols[source][i]);
 		}
 		allScaledAvgPols[source] = total/(allScaledPols[source].length);
 		total = 0;
 	}

 	/* avg scaled subjectivity */
 	for (var source = 0; source < allScaledSubjs.length; source++) {
 		for (var i = 0; i < allSubjs[source].length; i++) {
 			allScaledSubjs[source][i] = axisScaleY(allSubjs[source][i]);
 			total += parseFloat(allScaledSubjs[source][i]);
 		}
 		allScaledAvgSubjs[source] = total/(allScaledSubjs[source].length);

 		total = 0;
 	}

	/* Append circles to graph */
	var svgCircles = svgContainer.append("circle")
								.attr("cx", allScaledAvgPols[0])
								.attr("cy", allScaledAvgSubjs[0])
								.attr("r", 20)
								.style("fill", "red")

	svgCircles += svgContainer.append("circle")
								.attr("cx", allScaledAvgPols[1])
								.attr("cy", allScaledAvgSubjs[1])
								.attr("r", 20)
								.style("fill", "orange")

	svgCircles += svgContainer.append("circle")
								.attr("cx", allScaledAvgPols[2])
								.attr("cy", allScaledAvgSubjs[2])
								.attr("r", 20)
								.style("fill", "yellow")

	/* ideal center of non polar and not subjective */
	svgCircles += svgContainer.append("circle")
								.attr("cx", idealPol)
								.attr("cy", idaelSubj)
								.attr("r", 10)
								.style("fill", "black")

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

