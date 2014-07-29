function contextMenu() {
    var itemHeight = 20,
        itemWidth = 100,
        items = ['item'], 
        itemStyle = {
            'fill': 'rgb(244,244,244)', 
            'stroke': 'white', 
            'stroke-width': '1px'
        };
    
    function menu(x, y) {
        d3.select('svg')
            .append('g').attr('class', 'context-menu')
            .selectAll('tmp')
            .data(items).enter().append('g').attr('class', 'menu-entry');
        d3.selectAll('.menu-entry')
            .append('rect')
            .attr('x', x)
            .attr('y', function(d, i){ return y + (i * itemHeight); })
            .attr('width', itemWidth)
            .attr('height', itemHeight)
            .style(itemStyle);
        d3.selectAll('.menu-entry')
            .append('text')
            .text(function(d){ return d; })
            .attr('x', x)
            .attr('y', function(d, i){ return y + (i * itemHeight); })
            .attr('dy', itemHeight * .8) // TODO
            .attr('dx', itemHeight / 2);
    }
    
    menu.items = function(e) {
        if (!arguments.length) return items;
        for (i in arguments) items.push(arguments[i]);
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
