function draw(selection){
    var xy0, 
        path, 
        keep = false, 
        line = d3.svg.line()
                 .x(function(d){ return d[0]; })
                 .y(function(d){ return d[1]; });

    selection
        .on('mousedown', function(){ 
            keep = true;
            xy0 = d3.mouse(this);
            path = d3.select('svg')
                     .append('path')
                     .attr('d', line([xy0, xy0]))
                     .style({'stroke': 'black', 'stroke-width': '1px'});
        })
        .on('mouseup', function(){ 
            keep = false; 
        })
        .on('mousemove', function(){ 
            if (keep) {
                Line = line([xy0, d3.mouse(this).map(function(x){ return x - 1; })]);
                console.log(Line);
                path.attr('d', Line);
            }
        });
}
