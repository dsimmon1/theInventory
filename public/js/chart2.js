$(document).ready(function() {



    var data = [];

    function createChart() {
        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 300 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);

        var svg = d3.select("#chartTwo").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.product; }));
        y.domain([0, d3.max(data, function(d) { return d.val; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.product); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.val); })
            .attr("height", function(d) { return height - y(d.val); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("rect").transition()
            .duration(750)
            .delay(function(d, i) { return i * 10; })
            .attr("r", function(d) { return Math.sqrt(d * 1000); });

    }

    function getData() {
        $.get("/api/favorites", function(response) {
            for (var i = 0; i < response.length; i++) {
                var quantity = response[i].quantity;
                var description = response[i].description;
                data.push({ product: description, val: quantity });
            }
            createChart();
            console.log(data);
        });
    }




    getData();


});