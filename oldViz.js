/*
Created by Daniel Baigel
to run locally -- python -m SimpleHTTPServer

*/

/*TO-DO: 
1. add descriptions for graphs above each graph
2. make functions for code i.e. makeData, drawGraph, writeLabels, drawAxes etc.

graph1
2. make whole thing responsive



graph2
a bar graph that breaks out news source by category
0. refine category AI (ongoing)
2. create data - count each category within a givin news source
	each news source data should have count of headlines for each category and total,
	as well as color and source, and then maybe a percentage (e.g. 50% of wp headlines are Politics)
3. create the bars - look up how to do this
4. group the bars by news source - look up how to do this (maybe do stacked bars)
*/


/*get data*/
var dataFile = d3.csv("data_file.csv"); //converts csv data to json
dataFile.then(function (data) {
    console.log(data);
    /*create a helper file in Python to translate data into the format i want*/
    //outputs a new csv with 8 rows, each of which is a newsource
    // columns are data points: avg polarity, avg subj, num headlines, source name e.g. Fox

    //or, restructure csv so that each row is a single headline with a newsource column and timestamp
    //create buckets by newsource name
    //might need to do this first before getting to the top option

    //flatten csv file so each row is a single headline
    //create a set() on newsource names and then bucket by unique names

    /*gets rid of blank rows*/
    for(var i = 0; i < data.length; i++) {
    	if(data[i]["Date"] == "") {
    		data.splice(i, 1);
    		i--;
    	}
    }

    /* set size of graph */
    var containerWidth = 1000; //eventually make responsive 
    var containerHeight = 500;
    
    /* Sort data into arrays */
	var dates = [];

	var allPolarities = []; /* contains all news source polarity arrays */
	var allSubjs = []; /* contains all news source subjectivity arrays */

	var allAvgPols = []; /* contains all avg polarity values */
	var allAvgSubjs = []; /* contains all avg subj values */

	var newsSources = ["Fox", "NBC", "Wash Post", "ABC", "Breitbart", "BuzzFeed", "China Daily", "Sixth Tone", "Target"]; /* contains order of newssources */
	var colors = ["#FF0000", "#FFA500", "#ADD8E6", "#008000", "#FFFF00", "#FFC0CB", "#800000", "#8A2BE2", "#000000"];
	var newsSourcesNoTarget = ["Fox", "NBC", "Wash Post", "ABC", "Breitbart", "BuzzFeed", "China Daily", "Sixth Tone"];
	var categories = ["Politics", "Sports", "International", "Environment", "Technology", "Miscellaneous"];

	/*Fox*/
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

	/*CD*/
	var cdAvgPolarity = 0;
    var cdAvgSubj = 0;
    var cdNumHeads = 0;

	var cdHeadlines = [];
	var cdPolarities = [];
	var cdSubjs = [];
	var cdCats = [];

	/*ST*/
	var stAvgPolarity = 0;
    var stAvgSubj = 0;
    var stNumHeads = 0;

	var stHeadlines = [];
	var stPolarities = [];
	var stSubjs = [];
	var stCats = [];

	var totalNumHeads = 0; /*num total headlines*/
	
	/* initialize variables from file's data */
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

		cdHeadlines[i] = data[i]["China Daily Headline"];
		cdPolarities[i] = data[i]["China Daily Polarity"];
		cdSubjs[i] = data[i]["China Daily Subjectivity"];
		cdCats[i] = data[i]["China Daily Category"];

		stHeadlines[i] = data[i]["Sixth Tone Headline"];
		stPolarities[i] = data[i]["Sixth Tone Polarity"];
		stSubjs[i] = data[i]["Sixth Tone Subjectivity"];
		stCats[i] = data[i]["Sixth Tone Category"];
		
	}
	
	/* add data to ~all~ arrays */
	allPolarities.push(foxPolarities, nbcPolarities, wpPolarities,
	                   abcPolarities, bbPolarities, bfPolarities, cdPolarities, stPolarities);
	
	allSubjs.push(foxSubjs, nbcSubjs, wpSubjs, abcSubjs, bbSubjs, bfSubjs, cdSubjs, stSubjs);
	
	allAvgPols.push(foxAvgPolarity, nbcAvgPolarity, wpAvgPolarity,
	                abcAvgPolarity, bbAvgPolarity, bfAvgPolarity, 
	                cdAvgPolarity, stAvgPolarity);
	
	allAvgSubjs.push(foxAvgSubj, nbcAvgSubj, wpAvgSubj, abcAvgSubj, bbAvgSubj, bfAvgSubj,
		             cdAvgSubj, stAvgSubj);


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

		if (cdHeadlines[i] != "") {
			cdNumHeads++;
		}

		if (stHeadlines[i] != "") {
			stNumHeads++;
		}

	}
	totalNumHeads = foxNumHeads + nbcNumHeads + wpNumHeads + bbNumHeads + abcNumHeads
	+ bfNumHeads + cdNumHeads + stNumHeads

	var total = 0;
	var numElems = 0;
	
	/* avg polarity */
	for (var source = 0; source < allPolarities.length; source++) {
		
		for (var j = 0; j < allPolarities[source].length; j++) {
			if(allPolarities[source][j] != ""){
				total += parseFloat(allPolarities[source][j]);
				numElems++;
			}
		}

		allAvgPols[source] = total / numElems;
		total = 0;
		numElems = 0;
	}

	/* avg subjectivity */
	for (var source = 0; source < allSubjs.length; source++) {
		
		for (var j = 0; j < allSubjs[source].length; j++) {
			if (allSubjs[source][j] != ""){
				total += parseFloat(allSubjs[source][j]);
				numElems++;
			}
		}

		allAvgSubjs[source] = total / numElems;
		
			
		total = 0;
		numElems = 0;
	}

	/* Graphs */

	vizData = data;
	
	/* Graph 1 */

	var graph1 = d3.select('#graph1').append("svg")
			    .attr("width", '80%')
			    .attr("height", '80%')
			    .attr('viewBox','0 0 '+ containerWidth +' '+containerHeight)
			    .attr('preserveAspectRatio','xMinYMin');
			    //.style("border", "1px solid black");

			    /*.select() returns a graph object. Once you .append("sgv") to the graph,
			    that becomes the new object*/


	/*.style("border", "1px solid black");*/ /* use to debug container */

	/* Create Axes */
	
	/*get min and max values for scales*/
	/* polarity -- x axis */
	var mostMinP = 0;
	var mostMaxP = 0;
	for (var i = 0; i < allAvgPols.length; i++) {
		if (parseFloat(allAvgPols[i]) > mostMaxP) {
			mostMaxP = parseFloat(allAvgPols[i]);
		}
		else if (parseFloat(allAvgPols[i]) < mostMinP) {
			mostMinP = parseFloat(allAvgPols[i]);
		}
	}
	console.log(allAvgPols);
	var range = d3.extent(allAvgPols);
	console.log(range);
	console.log([mostMinP, mostMaxP]);

	/* subjectivity -- y ais */
	var mostMaxS = 0;
	for (var i = 0; i < allAvgSubjs.length; i++) {
		if (parseFloat(allAvgSubjs[i]) > mostMaxS) {
			mostMaxS = parseFloat(allAvgSubjs[i]);
		}
	}


	var axisScaleX = d3.scaleLinear()
                       .domain([mostMinP-0.1,mostMaxP +0.1]) /*max domain -1 to 1*/
                       .range([50,containerWidth-50]);

	var xAxis = d3.axisTop()
                  .scale(axisScaleX);
 
    var xAxisGroup = graph1.append("g")
    					   .attr("transform", `translate(0, ${containerHeight-30})`)
    					   .call(xAxis);

    var axisScaleY = d3.scaleLinear()
    				   .domain([mostMaxS +0.1,0])
    				   .range([50,containerHeight-60]);

    var yAxis = d3.axisRight()
    				.scale(axisScaleY);

    var yAxisGroup = graph1.append("g")
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
 	
 	var scaledwpPols = [];
 	var scaledwpSubjs = [];
 	var scaledwpAvgPol = 0;
 	var scaledwpAvgSubj = 0;

 	var scaledABCPols = [];
 	var scaledABCSubjs = [];
 	var scaledABCAvgPol = 0;
 	var scaledABCAvgSubj = 0;

 	var scaledBBPols = [];
 	var scaledBBSubjs = [];
 	var scaledBBAvgPol = 0;
 	var scaledBBAvgSubj = 0;

 	var scaledBFPols = [];
 	var scaledBFSubjs = [];
 	var scaledBFAvgPol = 0;
 	var scaledBFAvgSubj = 0;

 	var scaledCDPols = [];
 	var scaledCDSubjs = [];
 	var scaledCDAvgPol = 0;
 	var scaledCDAvgSubj = 0;

 	var scaledSTPols = [];
 	var scaledSTSubjs = [];
 	var scaledSTAvgPol = 0;
 	var scaledSTAvgSubj = 0;

 	var allScaledPols = [];
 	var allScaledSubjs = [];

 	allScaledPols.push(scaledFoxPolarities, scaledNBCPolarities, scaledwpPols,
 		               scaledABCPols, scaledBBPols, scaledBFPols, 
 		               scaledCDPols, scaledSTPols);

 	allScaledSubjs.push(scaledFoxSubjs, scaledNBCSubjs, scaledwpSubjs,
 		                scaledABCSubjs, scaledBBSubjs, scaledBFSubjs, 
 		                scaledCDPols, scaledSTSubjs);

 	var allScaledAvgPols = [];
 	var allScaledAvgSubjs = [];

 	allScaledAvgPols.push(scaledFoxAvgPolarity, scaledNBCAvgPolarity, scaledwpAvgPol,
 		                  scaledABCAvgPol, scaledBBAvgPol, scaledBFAvgPol,
 		                  scaledCDAvgPol, scaledSTAvgPol);

 	allScaledAvgSubjs.push(scaledFoxAvgSubj, scaledNBCAvgSubj, scaledwpAvgSubj,
 		                   scaledABCAvgSubj, scaledBBAvgSubj, scaledBFAvgSubj,
 		                   scaledCDAvgSubj, scaledSTAvgSubj);

 	/* data for target node */
 	var idealPol = axisScaleX(0);
 	var idealSubj = axisScaleY(0);

	total = 0;
 	
 	/* avg scaled polarity */
 	for (var source = 0; source < allScaledPols.length; source++) {
 		var tempLength = 0;
 		for (var i = 0; i < allPolarities[source].length; i++) {
 			if (allPolarities[source][i] != "") {
 				allScaledPols[source][i] = axisScaleX(allPolarities[source][i]);
 				total += parseFloat(allScaledPols[source][i]);
 				tempLength++;
 			}
 		}
 		allScaledAvgPols[source] = total/tempLength;
 		
 		total = 0;
 	}

 	/* avg scaled subjectivity */
 	for (var source = 0; source < allScaledSubjs.length; source++) {
 		var tempLength = 0;
 		for (var i = 0; i < allSubjs[source].length; i++) {
 			if (allSubjs[source][i] != "") {
 				allScaledSubjs[source][i] = axisScaleY(allSubjs[source][i]);
 				total += parseFloat(allScaledSubjs[source][i]);
 				tempLength++;
 			}
 		}
 		allScaledAvgSubjs[source] = total/tempLength;
 		total = 0;
 	}

	/*for each news source the object should have:
		avg polarity, avg scaled polarity, avg subj, avg scaled subj, numHeadlines, color,
		newssource, category breakdown
	*/ 	

	/*transfer to json data type*/
	var jsonData = [];			
	var foxData = new Object();
	var nbcData = new Object();
	var wpData = new Object();
	var abcData = new Object();
	var bbData = new Object();
	var bfData = new Object();
	var cdData = new Object();
	var stData = new Object();
	var perfData = new Object(); /* target dataset */

	/* rounding decimals */
	for (var i = 0; i < allAvgPols.length; i++) {
		allAvgPols[i] = Number(allAvgPols[i].toFixed(2));
		allAvgSubjs[i] = Number(allAvgSubjs[i].toFixed(2));  
	}
	/*
		ordinal scale -- domain is news sources
						range is colors
	*/
	/* converting to jSON */
	perfData.Pol = 0;
	perfData.ScaledPol = idealPol;
	perfData.Subj = 0;
	perfData.ScaledSubj = idealSubj;
	perfData.numHeads = 0;
	perfData.color = "black";
	perfData.source = "target";

	foxData.Pol = allAvgPols[0];
	foxData.ScaledPol = allScaledAvgPols[0];
	foxData.Subj = allAvgSubjs[0];
	foxData.ScaledSubj = allScaledAvgSubjs[0];
	foxData.numHeads = foxNumHeads;
	foxData.color = "red";
	foxData.source = "Fox";

	nbcData.Pol = allAvgPols[1];
	nbcData.ScaledPol = allScaledAvgPols[1];
	nbcData.Subj = allAvgSubjs[1];
	nbcData.ScaledSubj = allScaledAvgSubjs[1];
	nbcData.numHeads = nbcNumHeads;
	nbcData.color = "orange";
	nbcData.source = "NBC";

	wpData.Pol = allAvgPols[2];
	wpData.ScaledPol = allScaledAvgPols[2];
	wpData.Subj = allAvgSubjs[2];
	wpData.ScaledSubj = allScaledAvgSubjs[2];
	wpData.numHeads = wpNumHeads;
	wpData.color = "lightblue";
	wpData.source = "Washington Post";

	abcData.Pol = allAvgPols[3];
	abcData.ScaledPol = allScaledAvgPols[3];
	abcData.Subj = allAvgSubjs[3];
	abcData.ScaledSubj = allScaledAvgSubjs[3];
	abcData.numHeads = abcNumHeads;
	abcData.color = "green";
	abcData.source = "ABC";

	bbData.Pol = allAvgPols[4];
	bbData.ScaledPol = allScaledAvgPols[4];
	bbData.Subj = allAvgSubjs[4];
	bbData.ScaledSubj = allScaledAvgSubjs[4];
	bbData.numHeads = bbNumHeads;
	bbData.color = "yellow";
	bbData.source = "Breitbart";

	bfData.Pol = allAvgPols[5];
	bfData.ScaledPol = allScaledAvgPols[5];
	bfData.Subj = allAvgSubjs[5];
	bfData.ScaledSubj = allScaledAvgSubjs[5];
	bfData.numHeads = bfNumHeads;
	bfData.color = "pink";
	bfData.source = "BuzzFeed";

	cdData.Pol = allAvgPols[6];
	cdData.ScaledPol = allScaledAvgPols[6];
	cdData.Subj = allAvgSubjs[6];
	cdData.ScaledSubj = allScaledAvgSubjs[6];
	cdData.numHeads = cdNumHeads;
	cdData.color = "maroon";
	cdData.source = "China Daily";

	stData.Pol = allAvgPols[7];
	stData.ScaledPol = allScaledAvgPols[7];
	stData.Subj = allAvgSubjs[7];
	stData.ScaledSubj = allScaledAvgSubjs[7];
	stData.numHeads = stNumHeads;
	stData.color = "blueViolet";
	stData.source = "Sixth Tone";

	//just need polarity, subj, source, numheads

	jsonData.push(foxData);
	jsonData.push(nbcData);
	jsonData.push(wpData);
	jsonData.push(abcData);
	jsonData.push(bbData);
	jsonData.push(bfData);
	jsonData.push(cdData);
	jsonData.push(stData);
	jsonData.push(perfData);


	//console.log(jsonData);

	/*color legend*/
	var colorScale = d3.scaleBand() //for when you want to make barcharts
    					.domain(newsSources)
    					.range(colors);

    //var colorScale2 = d3.scaleOrdinal().domain(newsSources).range(colors); //for graph

    /*the data you pass in should be in data space, not pixel space. scale the data in the function */
	/* add data elements */
	graph1.selectAll("circle")
				.data(jsonData)  //everything you want to render but not scaled
				.enter()
				.append("circle")
				.attr("cx", function(d, i) {
				
					return d.ScaledPol; /* polarity is the x axis */
					//return axisScaleX(d.polarity);
					
				})
				.attr("cy", function(d) {
					
					return d.ScaledSubj /* subjectivity is the y axis */
					//return axisScaleY(d.subjectivity)
				})
				.attr("r", function(d){
					if (d.source == "target") {
						return 18;
					}
					else
						return 27; /* size of radius, kinda arbitrary */
						//return linearscale of number of headlines where domain is num headlines and range is size of radius in pixels 
						//map smallest radius to min headlines and biggest radius to max headlines
				})
				.style("fill", function(d){
					return d.color
					//ordinal scale map d.newssource to color
					//var colorScale2 = d3.scaleOrdinal().domain(newsSources).range(colors);
				})
				.style("fill-opacity", .5)
				.style("stroke", "black")
				.attr("class", function(d, i) {  
  					
  					return "source" + i; 

				})
				.on("mouseover", function(d, i){
					tooltip.style("display", null);
					tooltip.style("background-color", d.color);

					graph1.selectAll(".source" + i)
						  .style("fill-opacity", 1)
						  .style("font-weight", "bold")
						  .attr("stroke-width", "2.5");

				})
				.on("mouseout", function(d, i){
					
					tooltip.style("display", "none");

					graph1.selectAll(".source" + i)
							.style("fill-opacity", .5)
							.style("font-weight", "normal")
							.attr("stroke-width", "1");

		

				})
				.on("mousemove", function(d){
				
					var xPos = d3.event.pageX;
					var yPos = d3.event.pageY;


					//tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
					if (d.source == "target") {
						tooltip.select("p").text(d.source);
						tooltip.style("background-color", "gray")
								.style("width", 60+"px")
								.style("height", 60+"px")
								.style("text-align", "center")
								.style("border", "2px solid black");
					
					}
					else {
						tooltip.select("p").html(d.source + "<br>" 
							+ "Headlines: " + d.numHeads  
							+ " Polarity: " + d.Pol + 
							" Subjectivity: " + d.Subj);

						tooltip.style("background-color", d.color)
								.style("width", 170+"px")
								.style("height", 120+"px")
								.style("text-align", "left")
								.style("border", "2px solid black");


					}

					d3.select('.tooltip')
					  .style("left", xPos + "px")
					  .style("top", yPos  + "px");

				})
			
	/* tooltip */
	var tooltip = d3.select("#graph1")
						.append("div")
						.attr('class', 'tooltip')
						


	tooltip.append("p")
	//.attr("x", 15)
	//.attr("dy", "1.2em")
	.style("font-size", "1.25em")
	.attr("font-weight", "bold");

	
	/* color legend */		
    var legend = d3.select('svg')
				    .append("g")
				    .selectAll("g")
				    .data(colorScale.domain())
				    .enter()
				    .append('g')
				      .attr('class', 'legend')
				      .attr('transform', function(d, i) {
				        var height = containerHeight/9 - 10;
				        var x = containerWidth-200;
				        var y = i * height;
				        return 'translate(' + x + ',' + y + ')';
				    })
				    .style("fill-opacity", .5)
				    .attr("class", function(d, i) {  
  						return "source" + i;

					})
				    
				    .on("mouseover", function(d, i){
					
				    	graph1.selectAll(".source" + i).style("fill-opacity", 1)
				    	.style("font-weight", "bold")
				    	.attr("stroke-width", "2.5"); 

					})
					
					.on("mouseout", function(d, i){
						
				    	graph1.selectAll(".source" + i)
				    		  .style("fill-opacity", .5)
				    		  .style("font-weight", "normal")
				    		  .attr("stroke-width", "1");
					});


	legend.append('rect')
	    .attr('width', 50)
	    .attr('height', containerHeight/9 -10)
	    .style('fill', function(d, i)
	    	{
	    		return colors[i];
	    	});
	    
	       

	legend.append('text')
	    .attr('x', 60)
	    .attr('y', 30)
	    .text(function(d) { return d; })
	    .style('font-size', '20px');

	/* axis labels*/
	var xLabel = graph1.append("text")
						     .attr("text-anchor", "middle")
						     .attr("x", containerWidth/2)
						     .attr("y", containerHeight-10)
						     .style("font-size", "20px")
						     .text("Polarity");

	var yLabel = graph1.append("text")
							.attr("text-anchor", "middle")
						    .attr("y", 15)
						    .attr("x", -containerHeight/2)	
						    .attr("transform", "rotate(-90)")
						    .style("font-size", "20px")
						    .text("Subjectivity");
	/* graph1 title */
	graph1.append("text")
        .attr("x", (containerWidth / 2))             
        .attr("y", 25)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px") 
        .style("font-weight", "bold")
        .style("text-decoration", "underline")  
        .text("Polarity vs. Subjectivity");

/******************************************************************/

	/* Graph 2 */

	/* make data */
	var biggestCat = 0; /* used for scaling the y axis */
	var catCounts = [0,0,0,0,0,0];

	var jsonData2 = [];			
	var foxData2 = new Object();
	var nbcData2 = new Object();
	var wpData2 = new Object();
	var abcData2 = new Object();
	var bbData2 = new Object();
	var bfData2 = new Object();
	var cdData2 = new Object();
	var stData2 = new Object();

	var numHeadsPolitics = 0;
	var numHeadsTech = 0;
	var numHeadsSports = 0;
	var numHeadsEnv = 0;
	var numHeadsInternational = 0;
	var numHeadsMisc = 0;
	
	/*fox*/
	for (var i = 0; i < foxCats.length; i++) {
		if (foxCats[i] == "politics") {
			numHeadsPolitics++;
		}
		else if (foxCats[i] == "sports") {
			numHeadsSports++;
		}
		else if (foxCats[i] == "technology") {
			numHeadsTech++;
		}
		else if (foxCats[i] == "environment") {
			numHeadsEnv++;
		}
		else if (foxCats[i] == "international") {
			numHeadsInternational++;
		}
		else if (foxCats[i] == "miscellaneous") {
			numHeadsMisc++;
		}
		/*add data to fox json data unit*/
		foxData2.numHeads = foxNumHeads;
		foxData2.color = "red";
		foxData2.source = "Fox";
		foxData2.politics = numHeadsPolitics;
		foxData2.tech = numHeadsTech;
		foxData2.sports = numHeadsSports;
		foxData2.env = numHeadsEnv;
		foxData2.int = numHeadsInternational;
	 	foxData2.misc = numHeadsMisc;

	}
	numHeadsPolitics = 0;
	numHeadsTech = 0;
	numHeadsSports = 0;
	numHeadsEnv = 0;
	numHeadsInternational = 0;
	numHeadsMisc = 0;

	/*NBC*/
	for (var i = 0; i < nbcCats.length; i++) {
		if (nbcCats[i] == "politics") {
			numHeadsPolitics++;
		}
		else if (nbcCats[i] == "sports") {
			numHeadsSports++;
		}
		else if (nbcCats[i] == "technology") {
			numHeadsTech++;
		}
		else if (nbcCats[i] == "environment") {
			numHeadsEnv++;
		}
		else if (nbcCats[i] == "international") {
			numHeadsInternational++;
		}
		else if (nbcCats[i] == "miscellaneous") {
			numHeadsMisc++;
		}
		/*add data to nbc json data unit*/
		nbcData2.numHeads = nbcNumHeads;
		nbcData2.color = "orange";
		nbcData2.source = "NBC";
		nbcData2.politics = numHeadsPolitics;
		nbcData2.tech = numHeadsTech;
		nbcData2.sports = numHeadsSports;
		nbcData2.env = numHeadsEnv;
		nbcData2.int = numHeadsInternational;
	 	nbcData2.misc = numHeadsMisc;
	}

	numHeadsPolitics = 0;
	numHeadsTech = 0;
	numHeadsSports = 0;
	numHeadsEnv = 0;
	numHeadsInternational = 0;
	numHeadsMisc = 0;

	/*wp*/
	for (var i = 0; i < wpCats.length; i++) {
		if (wpCats[i] == "politics") {
			numHeadsPolitics++;
		}
		else if (wpCats[i] == "sports") {
			numHeadsSports++;
		}
		else if (wpCats[i] == "technology") {
			numHeadsTech++;
		}
		else if (wpCats[i] == "environment") {
			numHeadsEnv++;
		}
		else if (wpCats[i] == "international") {
			numHeadsInternational++;
		}
		else if (wpCats[i] == "miscellaneous") {
			numHeadsMisc++;
		}
		/*add data to wp json data unit*/
		wpData2.numHeads = wpNumHeads;
		wpData2.color = "lightblue";
		wpData2.source = "Washington Post";
		wpData2.politics = numHeadsPolitics;
		wpData2.tech = numHeadsTech;
		wpData2.sports = numHeadsSports;
		wpData2.env = numHeadsEnv;
		wpData2.int = numHeadsInternational;
	 	wpData2.misc = numHeadsMisc;
	}

 	numHeadsPolitics = 0;
	numHeadsTech = 0;
	numHeadsSports = 0;
	numHeadsEnv = 0;
	numHeadsInternational = 0;
	numHeadsMisc = 0;

	/*ABC*/
	for (var i = 0; i < abcCats.length; i++) {
		if (abcCats[i] == "politics") {
			numHeadsPolitics++;
		}
		else if (abcCats[i] == "sports") {
			numHeadsSports++;
		}
		else if (abcCats[i] == "technology") {
			numHeadsTech++;
		}
		else if (abcCats[i] == "environment") {
			numHeadsEnv++;
		}
		else if (abcCats[i] == "international") {
			numHeadsInternational++;
		}
		else if (abcCats[i] == "miscellaneous") {
			numHeadsMisc++;
		}
		/*add data to abc json data unit*/
		abcData2.numHeads = abcNumHeads;
		abcData2.color = "green";
		abcData2.source = "ABC";
		abcData2.politics = numHeadsPolitics;
		abcData2.tech = numHeadsTech;
		abcData2.sports = numHeadsSports;
		abcData2.env = numHeadsEnv;
		abcData2.int = numHeadsInternational;
	 	abcData2.misc = numHeadsMisc;
	}
	
	numHeadsPolitics = 0;
	numHeadsTech = 0;
	numHeadsSports = 0;
	numHeadsEnv = 0;
	numHeadsInternational = 0;
	numHeadsMisc = 0;

	/*bb*/
	for (var i = 0; i < bbCats.length; i++) {
		if (bbCats[i] == "politics") {
			numHeadsPolitics++;
		}
		else if (bbCats[i] == "sports") {
			numHeadsSports++;
		}
		else if (bbCats[i] == "technology") {
			numHeadsTech++;
		}
		else if (bbCats[i] == "environment") {
			numHeadsEnv++;
		}
		else if (bbCats[i] == "international") {
			numHeadsInternational++;
		}
		else if (bbCats[i] == "miscellaneous") {
			numHeadsMisc++;
		}
		/*add data to bb json data unit*/
		bbData2.numHeads = bbNumHeads;
		bbData2.color = "yellow";
		bbData2.source = "Breitbart";
		bbData2.politics = numHeadsPolitics;
		bbData2.tech = numHeadsTech;
		bbData2.sports = numHeadsSports;
		bbData2.env = numHeadsEnv;
		bbData2.int = numHeadsInternational;
	 	bbData2.misc = numHeadsMisc;
	}

	numHeadsPolitics = 0;
	numHeadsTech = 0;
	numHeadsSports = 0;
	numHeadsEnv = 0;
	numHeadsInternational = 0;
	numHeadsMisc = 0;

	/*Buzzfeed*/
	for (var i = 0; i < bfCats.length; i++) {
		if (bfCats[i] == "politics") {
			numHeadsPolitics++;
		}
		else if (bfCats[i] == "sports") {
			numHeadsSports++;
		}
		else if (bfCats[i] == "technology") {
			numHeadsTech++;
		}
		else if (bfCats[i] == "environment") {
			numHeadsEnv++;
		}
		else if (bfCats[i] == "international") {
			numHeadsInternational++;
		}
		else if (bfCats[i] == "miscellaneous") {
			numHeadsMisc++;
		}
		/*add data to bf json data unit*/
		bfData2.numHeads = bfNumHeads;
		bfData2.color = "pink";
		bfData2.source = "Buzzfeed";
		bfData2.politics = numHeadsPolitics;
		bfData2.tech = numHeadsTech;
		bfData2.sports = numHeadsSports;
		bfData2.env = numHeadsEnv;
		bfData2.int = numHeadsInternational;
	 	bfData2.misc = numHeadsMisc;
	}

	numHeadsPolitics = 0;
	numHeadsTech = 0;
	numHeadsSports = 0;
	numHeadsEnv = 0;
	numHeadsInternational = 0;
	numHeadsMisc = 0;

	/*China Daily*/
	for (var i = 0; i < cdCats.length; i++) {
		if (cdCats[i] == "politics") {
			numHeadsPolitics++;
		}
		else if (cdCats[i] == "sports") {
			numHeadsSports++;
		}
		else if (cdCats[i] == "technology") {
			numHeadsTech++;
		}
		else if (cdCats[i] == "environment") {
			numHeadsEnv++;
		}
		else if (cdCats[i] == "international") {
			numHeadsInternational++;
		}
		else if (cdCats[i] == "miscellaneous") {
			numHeadsMisc++;
		}
		
		/*add data to cd json data unit*/
		cdData2.numHeads = cdNumHeads;
		cdData2.color = "maroon";
		cdData2.source = "China Daily";
		cdData2.politics = numHeadsPolitics;
		cdData2.tech = numHeadsTech;
		cdData2.sports = numHeadsSports;
		cdData2.env = numHeadsEnv;
		cdData2.int = numHeadsInternational;
	 	cdData2.misc = numHeadsMisc;
	}
	numHeadsPolitics = 0;
	numHeadsTech = 0;
	numHeadsSports = 0;
	numHeadsEnv = 0;
	numHeadsInternational = 0;
	numHeadsMisc = 0;

	/*Sixth Tone*/
	for (var i = 0; i < stCats.length; i++) {
		if (stCats[i] == "politics") {
			numHeadsPolitics++;
		}
		else if (stCats[i] == "sports") {
			numHeadsSports++;
		}
		else if (stCats[i] == "technology") {
			numHeadsTech++;
		}
		else if (stCats[i] == "environment") {
			numHeadsEnv++;
		}
		else if (stCats[i] == "international") {
			numHeadsInternational++;
		}
		else if (stCats[i] == "miscellaneous") {
			numHeadsMisc++;
		}
		/*add data to st json data unit*/
		stData2.numHeads = stNumHeads;
		stData2.color = "blueViolet";
		stData2.source = "Sixth Tone";
		stData2.politics = numHeadsPolitics;
		stData2.tech = numHeadsTech;
		stData2.sports = numHeadsSports;
		stData2.env = numHeadsEnv;
		stData2.int = numHeadsInternational;
	 	stData2.misc = numHeadsMisc;
	}


 	numHeadsPolitics = 0;
	numHeadsTech = 0;
	numHeadsSports = 0;
	numHeadsEnv = 0;
	numHeadsInternational = 0;
	numHeadsMisc = 0;

	jsonData2.push(foxData2);
	jsonData2.push(nbcData2);
	jsonData2.push(wpData2);
	jsonData2.push(abcData2);
	jsonData2.push(bbData2);
	jsonData2.push(bfData2);
	jsonData2.push(cdData2);
	jsonData2.push(stData2);

	console.log(jsonData2);
	
	/*TO-DO: change data to look like a category access instead of news source access
	i.e. first node is politics...*/


	/*

	politics {
		sourceArray[fox, nbc, wp...]
		colorArray[red, green, lightblue...] #will be tied to source order
		valueArray[14, 4, 8...] #will be tied to source order

	}

	Turn this structure into JSON by replacing current json structure
	also make sure this will work by looking at videos online before changing it

	*/
	var categoryData = [];
	var politicsArray = [];
	var sportsArray = [];
	var intArray = [];
	var envArray = [];
	var techArray = [];
	var miscArray = [];


	/* count of headlines for each category */
	for (var i = 0; i < jsonData2.length; i++) {
			catCounts[0] += jsonData2[i].politics;
			catCounts[1] += jsonData2[i].sports;
			catCounts[2] += jsonData2[i].int;
			catCounts[3] += jsonData2[i].env;
			catCounts[4] += jsonData2[i].tech;
			catCounts[5] += jsonData2[i].misc;

			politicsArray.push(jsonData2[i].politics);
			sportsArray.push(jsonData2[i].sports);
			intArray.push(jsonData2[i].int);
			envArray.push(jsonData2[i].env);
			techArray.push(jsonData2[i].tech);
			miscArray.push(jsonData2[i].misc);
	}
	categoryData.push(politicsArray, sportsArray, intArray, envArray, techArray, miscArray);

	//console.log(categoryData);

	/* determine y axis scale using cat with most headlines*/
	for (var i = 0; i < catCounts.length; i++) {
		if (catCounts[i] > biggestCat) {
			biggestCat = catCounts[i];
		}
	}
	
	/* draw graph */
	var graph2 = d3.select('#graph2')
					.append("svg")
			    	.attr("width", '80%')
			    	.attr("height", '80%')
			    	.attr('viewBox','0 0 '+ containerWidth +' '+containerHeight)
			    	.attr('preserveAspectRatio','xMinYMin');
	/*.style("border", "1px solid black");*/

	/* Create Axes */
	var axisScaleX2 = d3.scaleBand()
                        .domain(categories)
                        .range([50,containerWidth-50]);

	var xAxis2 = d3.axisTop()
                   .scale(axisScaleX2);
 
    var xAxisGroup2 = graph2.append("g")
    						.attr("transform", `translate(0, ${containerHeight-30})`)
    						.call(xAxis2);

    var axisScaleY2 = d3.scaleLinear()
    					.domain([biggestCat, 0])
    					.range([50,containerHeight-60]);

    var yAxis2 = d3.axisRight()
    				.scale(axisScaleY2);

    var yAxisGroup2 = graph2.append("g")
    .attr("transform", "translate(30, 0)")
    .call(yAxis2);

    /* axis labels */
	var xLabel2 = graph2.append("text")
						     .attr("text-anchor", "middle")
						     .attr("x", containerWidth/2)
						     .attr("y", containerHeight-10)
						     .style("font-size", "20px")
						     .text("Headline Category");

	var yLabel2 = graph2.append("text")
							.attr("text-anchor", "middle")
						    .attr("y", 15)
						    .attr("x", -containerHeight/2)	
						    .attr("transform", "rotate(-90)")
						    .style("font-size", "20px")
						    .text("Number of Headlines");


	/* create visualization */
	graph2.selectAll(".bar")
        .data(jsonData2)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
           
            return axisScaleX2.bandwidth();
            
        })
        .attr("y", function (d) {
         
            return (containerHeight-60) - d.numHeads;
        })
        .attr("height", function (d) {
            
            return d.numHeads;
        })
        .attr("width", function (d){
        	return axisScaleX2.bandwidth();
        	
        })
        .style("fill", function(d){
			
			return d.color;
		});

        /* graph2 title */
        graph2.append("text")
		        .attr("x", (containerWidth / 2))             
		        .attr("y", 25)
		        .attr("text-anchor", "middle")  
		        .style("font-size", "36px") 
		        .style("font-weight", "bold")
		        .style("text-decoration", "underline")  
		        .text("Headlines per News Source Category");

}, function (error) {
    console.error('file loading error: ', error);
});

