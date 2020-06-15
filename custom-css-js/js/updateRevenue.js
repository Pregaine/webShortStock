var seriesOptions = [];

let chartRevenue;

var currentRevenue = Array();
var lastRevenue = Array();
var last3Revenue = Array();
var last5Revenue = Array();
var last8Revenue = Array();

function init() {

    let ori_update = document.getElementById( 'ori_chart' );
    ori_update.addEventListener( 'click', getAjaxDataRevenue );
}

/**
 * Create the chart when all data is loaded
 * @returns {undefined}
 */
function createChart() {

    const form = document.forms[ 'form1' ];             // 取得 name 屬性為 form 的表單
    const stockName = form.elements.input_Value.value;  // 取得 elements 集合中 name 屬性為 name 的值

    Highcharts.stockChart('container', {

    chart: {
        renderTo: 'container',
        plotBorderWidth: 2,
        alignTicks: false,
        animation: false,
        plotBorderColor: '#2D2D2D',
        events: {
            load: function () {
                $.each(this.legend.allItems, function (i, item) {
                    var $check = $(item.checkbox),
                        left = parseFloat($check.css('left')),
                        label = item.legendItem,
                        static = 60;
                    $check.css({
                        left: (left - label.bBox.width - static) + 'px'
                    });
                });
            }
        }
    },

    credits: {
        enabled: false
    },
    legend: {
        enabled: true,
        //floating: true,
        //verticalAlign: 'top',
        //align: 'left',
        //x: 5,
        borderWidth: 0,
        itemDistance:20
    },
    scrollbar: {
        enabled: false
    },
    rangeSelector: {
        enabled: false,
        inputEnabled: false
    },
    navigator: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    title: {
        text: stockName + '月營收分析比較圖',
        verticalAlign: 'top',
        y: 20
    },
        
    subtitle: {
        text: '嗨投資 highstock ',
        verticalAlign: 'top',
        align: 'right',
        x: -30,
        y: 20
    },

    plotOptions: {
        column: {
            animation: false,
            pointPadding: 0
        },
        line: {
            lineWidth: 1,
            marker: {
                enabled: false,
                states: { hover: { enabled: true, radius: 4 } }
            }
        },
        series: {
            showCheckbox: true,
            events: {
                checkboxClick: function (event) {
                    if (event.checked) {
                        this.show();
                        //this.legendSymbol.show();
                    } else {
                        this.hide();
                        //this.legendSymbol.hide();
                    }
                },
                legendItemClick: function () {
                    return false;
                }
            }
        }
    },

    xAxis: {
        tickPixelInterval: 200,
        type: 'datetime',
        labels: {
            formatter: function () { return Highcharts.dateFormat('%Y/%m', this.value); }
        }
    },

    yAxis: [{
        title: { text: '' },
        labels: {
            formatter: function () { return Highcharts.numberFormat(this.value, 0); }
        }
        }, {
        opposite: true,
        gridLineWidth: 0,
        title: { text: '' }
        }, {
        opposite: true,
        gridLineWidth: 0,
        title: { text: '' }
    }],

    tooltip: {
        shared: true,
        borderWidth: 0,
        backgroundColor: '#2d2d2d',
        crosshairs: false,
        formatter: function () {
            return this.points.reduce(function (s, point) {
                return s + '<br/><span style="color:' + point.series.color + '">' + 
                           point.series.name + '</span><b style="color:#FFF">: ' + 
                           Highcharts.numberFormat( point.y, 0 ) + ' 千元</b>';
            }, '<b style="color:#FFF">' + Highcharts.dateFormat( '%Y/%m', this.x ) + '</b>');
        },
    },

    series: [{
        type: 'column',
        name: '單月營收',
        
        data: currentRevenue,
        color: '#5597EF', 
        selected: true,
        // tooltip: {
        //     xDateFormat: '%Y-%m',
        //     crosshairs: false,
        //     borderWidth: 0,
        //     backgroundColor: '#2d2d2d',
        //     shared: true,
        //     valueDecimals: 0,
        // }
        }, {
        // type: 'column',
        name: '去年同月營收',
        data: lastRevenue,
        color: '#FFC85B',
        selected: true,
        // tooltip: {
        //     valueDecimals: 0,
        //     crosshairs: false,
        //     borderWidth: 0,
        //     backgroundColor: '#2d2d2d',
        //     shared: true,
        // }
        }, {
        name: '前3年同月營收平均',
        data: last3Revenue,
        color: '#D56600',
        selected: true,
        // tooltip: {
        //     valueDecimals: 0,
        //     crosshairs: false,
        //     borderWidth: 0,
        //     backgroundColor: '#2d2d2d',
        //     shared: true,
        // }
        }, {
        name: '前5年同月營收平均',
        data: last5Revenue,
        color: '#ffcc99',
        selected: true,
        // tooltip: {
        //     valueDecimals: 0,
        //     crosshairs: false,
        //     borderWidth: 0,
        //     backgroundColor: '#2d2d2d',
        //     shared: true,
        // }
        }, {
        name: '前8年同月營收平均',
        data: last8Revenue,
        yAxis: 1,
        color: '#66ff66',
        selected: true,
        // tooltip: {
        //     valueDecimals: 0,
        //     crosshairs: false,
        //     borderWidth: 0,
        //     backgroundColor: '#2d2d2d',
        //     shared: true,
        // }
        }]
    }); 
}

function getAjaxDataRevenue() {

    let formData = new FormData( document.getElementById("form1") );
    let xhr = new XMLHttpRequest();

    var getResponseText;

    console.log("xhr.onload");

    xhr.onload = function () {

        if (xhr.status == 200) {

            if (xhr.responseText == "error") {
                alert("Error");
            }
            else {

                console.log( xhr.responseText );  

                getResponseText = JSON.parse( xhr.responseText );

                console.log( getResponseText );

                for( var i = 0; i < getResponseText.length; i ++ ) {

                    currentRevenue.push( [ getResponseText[ i ][ 0 ], getResponseText[ i ][ 1 ] ] )
                    lastRevenue.push( [ getResponseText[ i ][ 0 ], getResponseText[ i ][ 2 ] ] )
                    last3Revenue.push( [ getResponseText[ i ][ 0 ], getResponseText[ i ][ 3 ] ] )
                    last5Revenue.push( [ getResponseText[ i ][ 0 ], getResponseText[ i ][ 4 ] ] )
                    last8Revenue.push( [ getResponseText[ i ][ 0 ], getResponseText[ i ][ 5 ] ] )
                }

                console.log( currentRevenue );

                createChart( );

		// doUpdate( getResponseText );
            }
        }
        else {

            alert(xhr.status);
        }
    }

    xhr.open( 'POST', '/custom-css-js/callPython.php', true );
    xhr.send( formData );
}

window.addEventListener( 'load', init );
