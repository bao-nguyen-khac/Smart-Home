$(".box-icon-reload").click(function () {
    $('.box-icon-reload').addClass('active');
    $('.box-icon-reload').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass('active');
    });
});
const tempArr = ['smart-temp-1']
const humiArr = ['smart-humi-1']
const lightArr = ['smart-light-sensor-1']
const gasArr = ['smart-light-sensor-1']
const getAPITemp = (e) => {
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': `${keyAdafruit}`
        },
        url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${e}`
    }).then(data => {
        document.querySelector('.temp-number').innerHTML = `+${data.data.last_value} °C`;
    })
}
const getAPIHumi = (e) => {
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': `${keyAdafruit}`
        },
        url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${e}`
    }).then(data => {
        document.querySelector('.humi-number').innerHTML = `${data.data.last_value} %`;
    })
}
const getAPILight = (e) => {
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': `${keyAdafruit}`
        },
        url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${e}`
    }).then(data => {
        document.querySelector('.light-number').innerHTML = `${Math.floor(data.data.last_value / 10.24)} %`;
    })
}
const getAPIGas = (e) => {
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': `${keyAdafruit}`
        },
        url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${e}`
    }).then(data => {
        document.querySelector('.gas-number').innerHTML = `${Math.floor(data.data.last_value / 10.24)} %`;
    })
}
tempArr.forEach(t => getAPITemp(t))
humiArr.forEach(h => getAPIHumi(h))
lightArr.forEach(l => getAPILight(l))
gasArr.forEach(g => getAPIGas(g))
setInterval(() => {
    for (var element of tempArr) {
        getAPITemp(element)
    }
    for (var element of humiArr) {
        getAPIHumi(element)
    }
    for (var element of lightArr) {
        getAPILight(element)
    }
    for (var element of gasArr) {
        getAPIGas(element)
    }
}, 30000)