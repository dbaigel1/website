// /*
// Created by Daniel Baigel
// to run locally -- python -m SimpleHTTPServer


// /*get data*/
var dataFile = d3.csv("flat_file.csv"); //converts csv data to json
dataFile.then(function (data) {

	foxData = [];
	foxIndex = 0
//     /*gets rid of blank rows*/
    for(var i = 0; i < data.length; i++) {
     	if(data[i]["Headline"] === undefined || data[i]["Headline"] == "") {
     		data.splice(i, 1);
     		i--;
     	}
     	//testing
     	else if(data[i]["NewsSourceName"] == "Fox"){
     		foxData[foxIndex] = data[i];
     		foxIndex++;

     	}
     }
     console.log(data);
     console.log(foxData);


//     /* set size of graph */
    var containerWidth = 1000; //eventually make responsive 
    var containerHeight = 500;
    
    var sourcesSet = new Set();
    for (var i = 0; i < data.length; i++) {
    	sourcesSet.add(data[i].NewsSourceName);
    }

	var newsSources = Array.from(sourcesSet);//["Fox", "NBC", "Washington Post", "ABC", "Breitbart", "Buzzfeed", "China Daily", "Sixth Tone", "Target"]; /* contains order of newssources */
	var colors = ["#757575", 
				  "#f44336", 
				  "#ff9800", 
				  "#03a9f4", 
				  "#009688", 
				  "#cddc39", 
				  "#ec407a", 
				  "#3f51b5", 
				  "#9c27b0"];
	var newsSourcesNoTarget = ["Fox", "NBC", "Wash Post", "ABC", "Breitbart", "BuzzFeed", "China Daily", "Sixth Tone"];
	var categories = ["Politics", "Sports", "International", "Environment", "Technology", "Miscellaneous"];

	
	/* Put data into buckets for viz use, use d3 nesting to group by source name */
	//data points: avg polarity, avg subj, num headlines, source name

  	var finalData = d3.nest()
					  .key(function(d) { return d.NewsSourceName; })
					  .rollup(function(v) {  //v is the array of values
					  	return {
							numHeads: v.length,
						    avgSubj: d3.mean(v, function(d) { return d.Subjectivity; }),
						    avgPolarity: d3.mean(v, function(d) { return d.Polarity; })
						  }; })
  					  .entries(data);
  	

  	/* round polarity and subjectivity values */
  	for (var i = 0; i < finalData.length; i++) {
		finalData[i].value.avgPolarity = Number(finalData[i].value.avgPolarity.toFixed(2));
		finalData[i].value.avgSubj = Number(finalData[i].value.avgSubj.toFixed(2));  
	}

// 	/* Graphs */
	
// 	/* Graph 1 */

 	var graph1 = d3.select('#graph1').append("svg")
 			    .attr("width", '80%')
 			    .attr("height", '80%')
 			    .attr('viewBox','0 0 '+ containerWidth +' '+containerHeight)
 			    .attr('preserveAspectRatio','xMinYMin');
 			    //.style("border", "1px solid black");

// 			    /*.select() returns a graph object. Once you .append("svg") to the graph,
// 			    that becomes the new object*/

// 	/* Create Axes */
	
	/* Create Axes Ranges */
	var avgPols = []; 
	
	for (var i = 0; i < finalData.length; i++) {
		avgPols.push(finalData[i].value.avgPolarity);
	}

 	var polRange = d3.extent(avgPols);

 	var avgSubjs = []; 

	for (var i = 0; i < finalData.length; i++) {
		avgSubjs.push(finalData[i].value.avgSubj);
	}

 	var subjRange = d3.extent(avgSubjs);
 	
 	/* setup y-axis range */
 	var tempSubj = subjRange[0];
 	subjRange[0] = subjRange[1];
 	subjRange[1] = tempSubj; 



 	/* Gives a little padding on each side of graph */
 	polRange[0] -= 0.1;
 	polRange[1] += 0.1;
 	subjRange[0] += 0.1;
 	subjRange[1] = 0;

 	/* count number of headlines */
 	var allHeadlineCounts = []; 
	for (var i = 0; i < finalData.length; i++) {
		allHeadlineCounts.push(finalData[i].value.numHeads);
	}
 	var headlineRange = d3.extent(allHeadlineCounts);

	var axisScaleX = d3.scaleLinear()
                       .domain(polRange)
                       //.domain([mostMinP-0.1,mostMaxP +0.1]) /*max domain -1 to 1*/
                       .range([50,containerWidth-50]);

	var xAxis = d3.axisTop()
                  .scale(axisScaleX);
 
    var xAxisGroup = graph1.append("g")
    					   .attr("transform", `translate(0, ${containerHeight-30})`)
    					   .attr("class", "x-axis")
    					   .call(xAxis);

    var axisScaleY = d3.scaleLinear()
    				   .domain(subjRange)
    				   .range([50,containerHeight-60]);

    var yAxis = d3.axisRight()
    				.scale(axisScaleY);

    var yAxisGroup = graph1.append("g")
    .attr("transform", "translate(30, 0)")
    .attr("class", "y-axis")
    .call(yAxis);

// 	/*color legend*/
	var colorScale = d3.scaleBand() //for when you want to make barcharts
    					.domain(newsSources)
    					.range(colors);

    var colorScale2 = d3.scaleOrdinal()
    					.domain(newsSources)
    					.range(colors); //for graph


    var radiusScale = d3.scaleLinear()
    					.domain(headlineRange)
    					.range([20, 30]);					

    //for click function later on
    var clicked = false;
//     /*the data you pass in should be in data space, not pixel space. scale the data in the function */
// 	/* add data elements */
	graph1.selectAll("circle")
				.data(finalData)  //everything you want to render but not scaled yet
				.enter() //when data is added to code after enter
				.append("circle")
				.attr("cx", function(d, i) {
				
 					return axisScaleX(d.value.avgPolarity);
					
				})
 				.attr("cy", function(d, i) {
					
					return axisScaleY(d.value.avgSubj)
				})
				.attr("r", function(d){
					
					return radiusScale(d.value.numHeads);	
				})
				.style("fill", function(d, i){
					
					return colorScale2(d.key);
				})
				.style("fill-opacity", .5)
				.style("stroke", "black")
				.attr("class", function(d, i) {  
  					
  					return "source" + i; 

				})
				.on("mouseover", function(d, i){
					tooltip
					.style("display", null)
					.style("background-color", colorScale2(d.key));


					graph1.selectAll(".source" + i)
						  .transition()
    					  .duration(800)
    					  .ease(d3.easeLinear)
						  .style("fill-opacity", 1)
						  .style("font-weight", "bold")
						  .attr("stroke-width", "2.5");

				})
				.on("mouseout", function(d, i){
					
					tooltip.style("display", "none");

					graph1.selectAll(".source" + i)
						  .transition()
    					  .duration(800)
    					  .ease(d3.easeLinear)
						  .style("fill-opacity", .5)
						  .style("font-weight", "normal")
						  .attr("stroke-width", "1");
				})
				.on("mousemove", function(d){
				
					var xPos = d3.event.pageX;
					var yPos = d3.event.pageY;


					//tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
					if (d.key == "Target") {
						tooltip.select("p").text(d.key);
						tooltip.style("background-color", "gray")
								.style("width", 60+"px")
								.style("height", 60+"px")
								.style("text-align", "center")
								.style("border", "2px solid black");
					
					}
					else {
						tooltip.select("p").html(d.key + "<br>" 
							+ "Headlines: " + d.value.numHeads  
							+ " Polarity: " + d.value.avgPolarity + 
							" Subjectivity: " + d.value.avgSubj);

						tooltip.style("width", 170+"px")
								.style("height", 120+"px")
								.style("text-align", "left")
								.style("border", "2px solid black")
								.transition()
    					  .duration(600)
    					  .ease(d3.easeLinear)
    					  .style("background-color", colorScale2(d.key));


					}

					d3.select('.tooltip')
					  .style("left", xPos + "px")
					  .style("top", yPos  + "px");

				})
				/* TESTING ON CLICK*/
				/*TODO: add scales for axes*/
				.on("click", function(d, i) {
					console.log(d);
					console.log(i);
					clickedD = d.key;
					clicked = !clicked;

					if (clicked == true){
						graph1.selectAll("circle").remove();	
						graph1.selectAll("circle")
							.data(data)
							.enter() //when data is added to code after enter
							.append("circle")
							.attr("cx", function(d, i) {
			
								if (d.NewsSourceName==clickedD) {
									return axisScaleX(d.Polarity);
								}
								else {
									return null;
								}	
							
							})
							.attr("cy", function(d, i) {
							
								if (d.NewsSourceName==clickedD) {
									return axisScaleY(d.Subjectivity);
								}
								else {
									return null;
								}	
							
							})
							.attr("r", function(d){
							return 10;
							//return radiusScale(d.value.numHeads);	
							})
							.style("fill", function(d, i){
							
							return colorScale2(d.NewsSourceName);
							})
							.style("fill-opacity", .5)
							.style("stroke", "black")
							.attr("class", function(d, i) {  
			  					
			  					return "source" + i; 

							})
							.on("mouseover", function(d, i){
					tooltip.style("display", null);
					tooltip.style("background-color", colorScale2(d.key));

					graph1.selectAll(".source" + i)
						  .transition()
    					  .duration(800)
    					  .ease(d3.easeLinear)
						  .style("fill-opacity", 1)
						  .style("font-weight", "bold")
						  .attr("stroke-width", "2.5");

				})
				.on("mouseout", function(d, i){
					
					tooltip.style("display", "none");

					graph1.selectAll(".source" + i)
						  .transition()
    					  .duration(800)
    					  .ease(d3.easeLinear)
						  .style("fill-opacity", .5)
						  .style("font-weight", "normal")
						  .attr("stroke-width", "1");
				})
				.on("mousemove", function(d){
				
					var xPos = d3.event.pageX;
					var yPos = d3.event.pageY;


					//tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
					if (d.key == "Target") {
						tooltip.select("p").text(d.key);
						tooltip.style("background-color", "gray")
								.style("width", 60+"px")
								.style("height", 60+"px")
								.style("text-align", "center")
								.style("border", "2px solid black");
					
					}
					else {
						tooltip.select("p").html(d.NewsSourceName + "<br>"  
							+ " Polarity: " + d.Polarity + 
							" Subjectivity: " + d.Subjectivity);

						tooltip.style("background-color", colorScale2(d.NewsSourceName))
								.style("width", 170+"px")
								.style("height", 120+"px")
								.style("text-align", "left")
								.style("border", "2px solid black");


					}

					d3.select('.tooltip')
					  .style("left", xPos + "px")
					  .style("top", yPos  + "px");

				})
					}
				})
				

	
//});	
			
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
	    .attr("font-family", "Josefin Slab, serif")
	    .style('font-size', '18px');

	/* axis labels*/
	var xLabel = graph1.append("text")
						     .attr("text-anchor", "middle")
						     .attr("x", containerWidth/2)
						     .attr("y", containerHeight-10)
						     .style("font-size", "20px")
						     .attr("font-family", "Josefin Slab, serif")
						     .text("Polarity");

	var yLabel = graph1.append("text")
							.attr("text-anchor", "middle")
						    .attr("y", 15)
						    .attr("x", -containerHeight/2)	
						    .attr("transform", "rotate(-90)")
						    .style("font-size", "20px")
						    .attr("font-family", "Josefin Slab, serif")
						    .text("Subjectivity");
	/* graph1 title */
	graph1.append("text")
        .attr("x", (containerWidth / 2))             
        .attr("y", 25)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px") 
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .attr("font-family", "Josefin Slab, serif")  
        .text("Polarity vs. Subjectivity");
})
// /******************************************************************/

