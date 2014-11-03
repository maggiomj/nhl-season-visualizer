var directives = angular.module('NHLDataVizApp.directives', []);

directives.directive("seasonChart", function(DataLayer, TeamInfoStore) {

	var id = 'seasonChart' + new Date().getTime();
	var width = 7000;
	var height = 1000;
	var bubbleRadius = 12;
	var bubblePadding = 12;
	var controlBubbleRadius = 20;
	var margin = {
		top: 25,
		left: 25,
		right: 25,
		bottom: 25
	};
	
	// turn the TeamInfoStore into something d3 can manipulate
	var teamList = [];
	for(team in TeamInfoStore) {
		teamList.push(TeamInfoStore[team]);
	}
	
	// Helper Functions
	var removeSpaces = function(str) {
		return str.replace(/\s+/g, '');
	};
	
	var colorGameBubble = function (type) {
		switch(type) {
			case "Playoffs":
				return "red";
			default:
				return "blue";
		}
	};
	
	var getImageUrl = function (team) {
		if (team in TeamInfoStore) {
			return TeamInfoStore[team].imageUrl;
		}
		return "";
	};
	
	// End Helper Functions
	
	// Chart Setup (run once)
	var setup = function(scope) {
		// Setup controls
		var cont = d3.select("#"+id);
		
		var wCounter = 0;
		var eCounter = 0;
		
		var posControlBubble = function(d) {
			var toReturn;
			if(d.conference == "W") {
				toReturn = x(wCounter) + ", " + (margin.top + (2 * controlBubbleRadius) + 5);
				wCounter++;
			} else {
				toReturn = x(eCounter) + ", " + margin.top;
				eCounter++;
			}
			return toReturn;
		};
		
		var highlightGames = function(d, enable) {
			var team = d.name;
			var color = d.color;
			d3.selectAll('.node')
			  .selectAll('circle')
		      .filter(function(d) {return d.awayTeam == team || d.homeTeam == team })
			  .style("stroke-opacity", function() { return enable ? 1 : .5})
			  .style("stroke", function() { return enable ? color : colorGameBubble(d.gameType)});
		};		
		
		var x = d3.scale.linear().domain([0, teamList.length / 2]).range([margin.left, margin.left + (3*controlBubbleRadius * teamList.length / 2)]);
		
		var controlNodes = cont.append("g")
			.selectAll(".control-node")
			.data(teamList)
			.enter().append("g")
			.classed("control-node", true)
			.attr("transform", function(d, i) { return "translate(" + posControlBubble(d) + ")"; });
			
		controlNodes.append("title").text(function(d) { return d.name; });
		
		var circles = controlNodes.append("circle")
			.attr("r", function(d) { return controlBubbleRadius; })
			.style("fill", function(d) { return "url(#pattern-" + removeSpaces(d.name) + ")";})
			.style("stroke", function(d) {return d.color;})
			.style("stroke-opacity", .5)
			.attr("stroke-width", 2)
			.on("mouseover", function(d) {
				d3.select(this).style("stroke-opacity", 1);
				highlightGames(d, true);
			}).on("mouseout", function(d) {
				if(d3.select(this.parentNode).classed('selected-team') == false) {
					d3.select(this).style("stroke-opacity", .5);
					highlightGames(d, false);
				}
			}).on("click", function(d) {
				if(d3.select(this.parentNode).classed('selected-team') == false) {
					d3.select(this.parentNode).classed('selected-team', true);
					d3.select(this).style("stroke-opacity", 1);
					highlightGames(d, true);
				} else {
					d3.select(this.parentNode).classed('selected-team', false);
					d3.select(this).style("stroke-opacity", .5);
					highlightGames(d, false);
				}
			});
			
		var patterns = d3.select("#"+id)
			.append("defs")
			.selectAll("pattern")
			.data(teamList)
			.enter()
			.append("pattern")
			.attr('id', function(d) {return "pattern-" + removeSpaces(d.name);})
			.attr('patternUnits', 'userSpaceOnUse')
			.attr('x', 25)
			.attr('y', 25)
            .attr('width', 50)
            .attr('height', 50);
        
		patterns.append("image")
            .attr('width', 50)
            .attr('height', 50)
            .attr("xlink:href", function(d) {return getImageUrl(d.name)});
	};

	// Render Chart (run each time the data changes)
	var renderChart = function(data) {
	
		var getDate = function(d) {
			return new Date(d);
		};
		
		var formatGameLabel = function(d) {
			return d.awayTeam + " @ " + d.homeTeam;
		};
		
		var yPosDict = {};
		var calcYPos = function(d) {
			if(d.date in yPosDict) {
				yPosDict[d.date] += 2 * bubbleRadius + bubblePadding;
			} else {
				yPosDict[d.date] = bubbleRadius + bubblePadding + margin.top;
			}
			
			return yPosDict[d.date] ;
		};
		
		var startYear = getDate(data[data.length-1].date).getFullYear();
		var minDate = new Date(startYear, 9, 1);
		var maxDate = new Date(startYear + 1, 5, 30);
		var x = d3.time.scale().domain([minDate, maxDate]).range([margin.left, width - margin.right]);
		var xAxis = d3.svg.axis().scale(x).orient("top").tickFormat(d3.time.format("%b '%y"));
		
		// Update
		var svg = d3.select("#"+id);
		var content;
		
		// Handle axes
		if(svg.selectAll('.content')[0].length == 0) {
			content = svg.append("g")
				.attr("class", "content")
				.attr("transform", "translate(0, " + 4 * margin.top + ")");
			
			content.append("g").attr("class", "axis").call(xAxis).attr("transform", "translate(0, " + margin.top + ")");
		} else {
			// re-render axes
			svg.selectAll('.axis').call(xAxis);
			content = svg.select('.content');
		}
		
		var node = content.selectAll(".node").data(data, function(d) {return d.gameID});
				
		node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + x(getDate(d.date)) + "," + calcYPos(d) + ")"; })
			
		node.exit().remove();

		node.append("title").text(function(d) { return formatGameLabel(d)});

		var circles = node.append("circle")
			.attr("r", function(d) { return bubbleRadius; })
			.style("fill", "transparent")
			.style("stroke", function(d) { return colorGameBubble(d.gameType); })
			.style("stroke-opacity", .5)
			.attr("stroke-width", 2)
			.on("mouseover", function() {
				d3.select(this).style("stroke-opacity", 1);
			}).on("mouseout", function() {
				d3.select(this).style("stroke-opacity", .5);
			}).on("click", function() {
				var self = this;
				var nodes = d3.selectAll(".node")
				  .classed('selected-node', false);
				
				nodes.selectAll("circle")
				  .transition()
				  .duration(500)
				  .ease("elastic")
				  .attr("r", function(){ return bubbleRadius})
				  .style("stroke-width", 2);
				  
				d3.select(self)
				  .transition()
				  .duration(500)
				  .ease("elastic")
				  .attr("r", function() {return 3*bubbleRadius})
				  .style("stroke-width", 4);
				  
				setTimeout(function() {
					d3.select(self.parentNode).classed('selected-node', true);
				}, 500);
			});
			
		// Date Label
		node.append("text")
			.attr("dx", function(){return -2.2*bubbleRadius})
			.attr("dy", function(){return 12})
			.text(function(d){return d.date});
	};

	// load data using the DataLayer and render
	var loadAndRender = function(scope) {
		scope.loading = true;
		DataLayer.getSeason(scope.seasonID, function(data) {
			scope.loading = false;
			renderChart(data);
		});
	};

	// the directive
	return {
		restrict: "EA",
		template: "<svg width='" + width + "' height='" + height + "' id=" + id + "></svg>",
		link: function(scope, elem, attrs) {
			setup(scope);
			loadAndRender(scope);
			scope.$watch('seasonID', function() {
				loadAndRender(scope);
			});
		}
	};
});