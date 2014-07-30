function contextMenu() {
    var itemHeight = 20,
        itemWidth, 
        itemMargin = 10, 
        items = [], 
        style = {
            'rect': {
                'mouseout': {
                    'fill': 'rgb(244,244,244)', 
                    'stroke': 'white', 
                    'stroke-width': '1px'
                }, 
                'mouseover': {
                    'fill': 'rgb(200,200,200)'
                }
            }, 
            'text': {
                'fill': 'steelblue', 
                'font-size': '10'
            }
        }; 
    
    function menu(x, y) {
        d3.select('.context-menu').remove();

        // Set itemWidth automatically:
        d3.select('svg').selectAll('tmp')
            .data(items).enter()
            .append('text')
            .text(function(d){ return d; })
            .style(style.text)
            .attr('x', -1000)
            .attr('y', -1000)
            .attr('class', 'tmp');
        var w = d3.selectAll('.tmp')[0]
                  .map(function(x){ return x.getBBox().width; });
        itemWidth = d3.max(w) + 2 * itemMargin;
        d3.selectAll('.tmp').remove();

        // Draw the menu
        d3.select('svg')
            .append('g').attr('class', 'context-menu')
            .selectAll('tmp')
            .data(items).enter()
            .append('g').attr('class', 'menu-entry')
            .on('mouseover', function(){ 
                d3.select(this).select('rect').style(style.rect.mouseover) })
            .on('mouseout', function(){ 
                d3.select(this).select('rect').style(style.rect.mouseout) });
        
        d3.selectAll('.menu-entry')
            .append('rect')
            .attr('x', x)
            .attr('y', function(d, i){ return y + (i * itemHeight); })
            .attr('width', itemWidth)
            .attr('height', itemHeight)
            .style(style.rect.mouseout);
        
        d3.selectAll('.menu-entry')
            .append('text')
            .text(function(d){ return d; })
            .attr('x', x)
            .attr('y', function(d, i){ return y + (i * itemHeight); })
            .attr('dy', itemHeight * .8) // TODO
            .attr('dx', itemMargin)
            .style(style.text);

        // Other interactions
        d3.select('body')
            .on('click', function() {
                d3.select('.context-menu').remove();
            });

    }
    
    menu.items = function(e) {
        if (!arguments.length) return items;
        for (i in arguments) items.push(arguments[i]);
        return menu;
    }
    
    menu.width = function(x) {
        if (!arguments.length) return itemWidth;
        itemWidth = x;
        return menu;
    }

    return menu;
}

/*

contextMenuItemModel() {
    return {
        'extensible': false,
        'function': null, 
        'name': null
    }
}

*/
