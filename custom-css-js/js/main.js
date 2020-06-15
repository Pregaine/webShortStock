
function init(){

    let inputData = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];

    Highcharts.setOptions({
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)']
                ]
            },
            borderWidth: 2,
            plotBackgroundColor: 'rgba(255, 255, 255, .9)',
            plotShadow: true,
            plotBorderWidth: 1
        }
    });


    var chart1 = new Highcharts.stockChart({
        chart: {
            renderTo: 'chartid',
        },

        title:{
            text: '標題'
        },

        xAxis: {
            type: 'datetime'
        },
        series: [{
            data: inputData,
            pointStart: Date.UTC(2010, 0, 1),
            pointInterval: 3600 * 1000 // one hour
        }]
    });


}



window.addEventListener('load',init);