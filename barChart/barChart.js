BarChart = function(options){ 
	var self, 
	defaults={
		el: "body",
		width:960,
		height : 500,
   		barWidth : 50,
    		bottom:20
	};
	this.settings={};
	$.extend( this.settings, defaults, options );
  this.draw=function(dataset){

    var 
    width = this.settings.width,
    height = this.settings.height,
    barWidth = this.settings.barWidth,
    bottom=this.settings.bottom;

    var x = d3.scaleLinear()
    .domain([0, dataset.length+1])
    .range([barWidth / 2, width - barWidth / 2]);

    var y = d3.scaleLinear()
    .domain([0, Math.max.apply(Math, dataset)])
    .range([height, 0]);

    
    var svg = d3.select("body")
      .append("svg")
      .attr("height", height)
      .attr("width", width);

      //Bars
      svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("x",-barWidth / 2)
          .attr("width", barWidth)
          .attr("height", function(d){
            return height-y(d);
           })
          .attr("y", function(d){return (y(d)-bottom);})
          .attr("transform", function(d) { 
            return "translate(" + x(d) + ",0)"; 
          });


	svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("x",-barWidth / 2)
          .attr("width", barWidth)
          .attr("height", function(d){
            return height-y(d);
           })
          .attr("y", function(d){return (y(d)-bottom);})
          .attr("transform", function(d) { 
            return "translate(" + x(d) + ",0)"; 
          });


      //Axis
      var xAxis = d3.axisBottom()
      .scale(x);

      var yAxis = d3.axisLeft()
      .scale(y);


      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,"+(height-bottom)+")")
      .call(xAxis);

      svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+(barWidth / 2)+","+(-bottom)+")")
      .call(yAxis);
  }
}
