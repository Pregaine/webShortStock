let chart;

function init() {
    
    let ori_update = document.getElementById('ori_chart');

    ori_update.addEventListener('click', getAjaxData);
}

function doUpdate(inputData) {

    console.log('inputData__',inputData);

    const form = document.forms[ 'form1' ];    // 取得 name 屬性為 form 的表單
    const name = form.elements.input_Value.value;  // 取得 elements 集合中 name 屬性為 name 的值
    
    chart = new Highcharts.stockChart('myKLinePic', {
        title: {
            text: '周線 '
        },

        rangeSelector: {
            buttons: [

            {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'ytd',
                text: 'YTD'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                                 
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 6,
            inputEnabled: false
        },

        series: [{
            name: name,
            type: 'candlestick',
            data: inputData,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });

    console.log('do upDate chart.series');
}


function getAjaxData() {

    let formData = new FormData(document.getElementById("form1"));
    let xhr = new XMLHttpRequest();

    console.log("xhr.onload");

    xhr.onload = function () {

        if (xhr.status == 200) {

            if (xhr.responseText == "error") {
                alert("Error");
            }
            else {

                var getResponseText = JSON.parse( xhr.responseText );

                console.log( getResponseText );   
               
		        doUpdate( getResponseText );
            }
        }
        else {

            alert(xhr.status);
        }
    }

    xhr.open('POST', './custom-css-js/getResult.php', true);
    xhr.send(formData);
}

window.addEventListener('load', init);