/*
    Apply this function to a D3 selection to make it draggable.
*/

function draggable(){
    // Global draggables dict
    if (!('dd' in window)) {
        window.dd = {};
    }
    
    var id = 'dd-' + h.randomString();
    
    // "Register" the new draggable element:
    dd[id] = {
        'on': false,
        'tx': 0, 
        'ty': 0, 
        'x0': null,
        'x1': null, 
        'y0': null, 
        'y1': null
    }
    
    var selection = this instanceof d3.selection ? this : d3.select(this);
    
    selection
        .on('mousedown', function(){ 
            console.log(id);
            dd[id].on = true; 
            dd[id].x0 = d3.event.clientX;
            dd[id].y0 = d3.event.clientY;
        })
        .on('mouseup', function(){ dd[id].on = false; })
        .on('mousemove', function() {
            if (dd[id].on) {
                if (dd[id].x1 != null) {
                    dd[id].x0 = dd[id].x1;
                    dd[id].y0 = dd[id].y1;
                }
                dd[id].x1 = d3.event.clientX; 
                dd[id].y1 = d3.event.clientY;
                dd[id].tx = dd[id].tx + (dd[id].x1 - dd[id].x0);
                dd[id].ty = dd[id].ty + (dd[id].y1 - dd[id].y0);
                d3.select(this)
                    .attr('transform', 'translate(' + dd[id].tx + ',' + dd[id].ty + ')');
            };
        });
}
