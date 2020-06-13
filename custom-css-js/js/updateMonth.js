let chartMonth;

function init() {
    let ori_update = document.getElementById('ori_chart');
    ori_update.addEventListener('click', getAjaxDataMonth);
}

function doUpdateMonth(inputData) {

    console.log('inputData__',inputData);

    const form = document.forms[ 'form1' ];    // 取得 name 屬性為 form 的表單
    const name = form.elements.input_Value.value;  // 取得 elements 集合中 name 屬性為 name 的值
    
    chartMonth = new Highcharts.stockChart( 'monthPic', {
        title: {
            text: '月線 '
        },

        rangeSelector: {
            buttons: [

            {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 0,
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

function getAjaxDataMonth() {

    let formData = new FormData( document.getElementById("form1") );
    let xhr = new XMLHttpRequest( );

    console.log( "xhr.onload" );

    xhr.onload = function () {

        if (xhr.status == 200) {

            if (xhr.responseText == "error") {
                alert("Error");
            }
            else {

                // console.log(xhr.responseText);
                // console.log('test xhr.responseText');

                var getResponseText = JSON.parse( xhr.responseText );

                console.log( getResponseText );   
               
		        doUpdateMonth( getResponseText );

                // return;
            }
        }
        else {

            alert(xhr.status);
        }
    }

    xhr.open('POST', './custom-css-js/getMonth.php', true);
    xhr.send(formData);
}

window.addEventListener('load', init);