 //transition code for clicking on graph and seeing all headlines

 .on("click", function(d) {
                	//update axis ranges
                	
                	var totalPols = [];
                	var totalSubjs = [];
                	var currIndex = 0;
                	var allHeads = [];

                	for (var i = 0; i < data.length; i++) {
                		if (d.key == data[i].NewsSourceName){
                			totalPols[currIndex] = Number(data[i].Polarity).toFixed(2);
                			totalSubjs[currIndex] = Number(data[i].Subjectivity).toFixed(2);
                			allHeads[i] = data[i].Headline;
                			currIndex++;
                		} 
                	}
          			console.log(totalPols);



                	var polRange2 = d3.extent(totalPols);
             
               
                	var subjRange2 = d3.extent(totalSubjs);
                	console.log(polRange2);	
                	console.log(subjRange2);


				                	/* setup y-axis range */
				 	var tempSubj2 = subjRange2[0];
				 	subjRange2[0] = subjRange2[1];
				 	subjRange2[1] = tempSubj2; 



				 	/* Gives a little padding on each side of graph */
				 	polRange2[0] -= 0.1;
				 	polRange2[1] += 0.1;
				 	subjRange2[0] += 0.1;
				 	subjRange2[1] = 0;


                	var axisScaleX2 = d3.scaleLinear()
					                       .domain(polRange2)
					                       .range([50,containerWidth-50]);

						var xAxis2 = d3.axisTop()
					                  .scale(axisScaleX2);
					 
					    // var xAxisGroup2 = graph1.append("g")
					    // 					   .attr("transform", `translate(0, ${containerHeight-30})`)
					    // 					   .transition()
         //                    				   .duration(100)
					    // 					   .call(xAxis2);

					    var axisScaleY2 = d3.scaleLinear()
					    				   .domain(subjRange2)
					    				   .range([50,containerHeight-60]);

					    var yAxis2 = d3.axisRight()
					    				.scale(axisScaleY2);

					    // var yAxisGroup2 = graph1.append("g")
					    // .transition()
         //                .duration(100)
					    // .attr("transform", "translate(30, 0)")
					    // .call(yAxis2);

                    // Update circles
                    graph1.selectAll("circle")
                        .data(data)  // Update with new data
                        .transition()  // Transition from old to new
                        .duration(1000)  // Length of animation
                        // .each("start", function() {  // Start animation
                        //     d3.select(this)  // 'this' means the current element
                        //         .attr("fill", "red")  // Change color
                        //         .attr("r", 5);  // Change size
                        // })
                        // .delay(function(d, i) {
                        //     return i / data.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
                        // })
                        //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
                        .attr("cx", function(d) {
                            console.log(d.Polarity);
                            return axisScaleX2(d.Polarity);  // Circle's X
                        })
                        .attr("cy", function(d) {
                            return axisScaleY2(d.Subjectivity);  // Circle's Y
                        })
                        // .each("end", function() {  // End animation
                        //     d3.select(this)  // 'this' means the current element
                        //         .transition()
                        //         .duration(500)
                        //         .attr("fill", "black")  // Change color
                        //         .attr("r", 2);  // Change radius
                        // });

                         // Update X Axis
                        graph1.select(".x-axis")
                            .transition()
                            .duration(1000)
                            .attr("transform", `translate(0, ${containerHeight-30})`)
                            .call(xAxis2);

                        // Update Y Axis
                        graph1.select(".y-axis")
                            .transition()
                            .duration(100)
                            .attr("transform", "translate(30, 0)")
                            .call(yAxis2);