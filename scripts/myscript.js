$(function(){
      $('#world-map').vectorMap({map: 'world_mill'});
    });
  
    
        /*Tooltips*/
        $(function () {
  $('[data-toggle="popover"]').popover({
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><!--h4 class="popover-title"></h4--><div class="popover-content"></div></div>'
      
  });
})
        
        /* bar graph*/
       var data = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{   label: '2015',
            backgroundColor:'white',
			fillColor : "#f23",
			strokeColor : "green",
			data : [65,59,90,81,56,55,40]
		},
		{     
            label:'2016',
            backgroundColor:'blue',
			fillColor : "yellow",
			strokeColor : "#ddd",
			data : [28,48,40,19,96,27,100]
		},
        {     
            label:'2016',
            backgroundColor:'grey',
			fillColor : "yellow",
			strokeColor : "#ddd",
			data : [68,98,60,25,80,27,70]
		}
	]
};
        var ctx = $('#myChart');
        barchart =  new Chart(ctx,{
            type: "bar",
            data: data
    });
    /*  circle bars*/

        
 var chartData = {
    "barCircleWeb":[
        {"index":0.3, "value":31588490, "fill":"#231F20", "label":"WebMD Health"},
        {"index":0.4, "value":26260662, "fill":"#403437", "label":"Everyday Health"},
        {"index":0.5, "value":24263463, "fill":"#53363C", "label":"Livestrong.com"},
        {"index":0.6, "value":12795112, "fill":"#5E2C3A", "label":"About.com Health Section"},
        {"index":0.7, "value":11959167, "fill":"#660E34", "label":"Healthline"},
        {"index":0.8, "value":10408917, "fill":"#7D3A4D", "label":"HealthGrades"},
        {"index":0.9, "value":10317462, "fill":"#96606B", "label":"Yahoo! Health"},
        {"index":1,   "value":9765589,  "fill":"#B28A91", "label":"Lifescript.com"},
        {"index":1.1, "value":7734964,  "fill":"#D3BCBF", "label":"Health.com"},
        {"index":1.2, "value":7504000 , "fill":"#EDE4E5", "label":"Drugs.com"}
    ]
};

function drawBarCircleChart(data,target,values,labels){
    var w = 300,
        h = 300,
        size = data[0].value * 1.15,
        radius = 200,
        sectorWidth = .1,
        radScale = 25,
        sectorScale = 1.45,
        target = d3.select(target),
        valueText = d3.select(values),
        labelText = d3.select(labels);


    var arc = d3.svg.arc()
        .innerRadius(function(d,i){return (d.index/sectorScale) * radius + radScale; })
        .outerRadius(function(d,i){return ((d.index/sectorScale) + (sectorWidth/sectorScale)) * radius + radScale; })
        .startAngle(Math.PI)
        .endAngle(function(d) { return Math.PI + (d.value / size) * 2 * Math.PI; });
    
    var path = target.selectAll("path")
        .data(data);

    //TODO: seperate color and index from data object, make it a pain to update object order
    path.enter().append("svg:path")
        .attr("fill",function(d,i){return d.fill})
        .attr("stroke","#D1D3D4")
        .transition()
        .ease("elastic")
        .duration(1000)
        .delay(function(d,i){return i*100})
        .attrTween("d", arcTween);
        
    valueText.selectAll("tspan").data(data).enter()
        .append("tspan")
        .attr({
            x:50,
            y:function(d,i){return i*14},       
            "text-anchor":"end"
        })
        .text(function(d,i){return data[i].value});
    
    labelText.selectAll("tspan").data(data).enter()
        .append("tspan")
        .attr({
            x:0,
            y:function(d,i){return i*14}
        })
        .text(function(d,i){return data[i].label});

    function arcTween(b) {
        var i = d3.interpolate({value: 0}, b);
        return function(t) {
            return arc(i(t));
        };
    }
}

// Animation Queue
setTimeout(function(){drawBarCircleChart(chartData.barCircleWeb,"#circleBar-web-chart","#circleBar-web-values","#circleBar-web-labels")},500);


d3.select("#circleBar-web-icon")
    .transition()
    .delay(500)
    .duration(500)
    .attr("opacity","1");
d3.select("#circleBar-web-text")
    .transition()
    .delay(750)
    .duration(500)
    .attr("opacity","1");

d3.select("#circleBar-web-clipLabels")
    .transition()
    .delay(600)
    .duration(1250)
    .attr("height","150");

d3.select("#circleBar-mobile-icon")
    .transition()
    .delay(800)
    .duration(500)
    .attr("opacity","1");
d3.select("#circleBar-mobile-text")
    .transition()
    .delay(1050)
    .duration(500)
    .attr("opacity","1");
d3.select("#circleBar-mobile-clipLabels")
    .transition()
    .delay(900)
    .duration(1250)
    .attr("height","150");
        


//small map //    
        
        /*GEOLOCATION*/
    
      
L.mapbox.accessToken = 'pk.eyJ1Ijoic2F0aXp6IiwiYSI6ImNpdW16amVlZDAwMGsyb256ZzZnbzdnOTMifQ.3ud7i-T6aTk3SkMpCerbhg';

var map = L.mapbox.map('map', 'mapbox.dark');

var myLayer = L.mapbox.featureLayer().addTo(map);

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation
if (!navigator.geolocation) {
    $.innerHTML = 'Geolocation is not available';
} else {
        map.locate();
}

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);

    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

   
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    $.innerHTML = 'Position could not be found';
});
        /* simple line arrow*/
           
