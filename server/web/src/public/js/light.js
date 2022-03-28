$(".box-icon-reload").click(function () {
    $('.box-icon-reload').addClass('active');
    $('.box-icon-reload').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass('active');
    });
});

const ledArr = ['smart-led-1', 'smart-led-2']
const getAPISmartLed = (e) => {
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': 'aio_Hfnz79nRupK7iPtcnyNb8ata7N4g'
        },
        url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${e}`
    }).then(data => {
        const checkInputJQ = $(`#${e}`)
        const iconLight = document.getElementById(`${e}`).parentNode.parentNode.querySelector('.icon-light')
        if (data.data.last_value == 1) {
            checkInputJQ.attr('checked', true)
            iconLight.classList.remove("light-off")
            iconLight.classList.add("light-on")
        } else {
            checkInputJQ.attr('checked', false)
            iconLight.classList.remove("light-on")
            iconLight.classList.add("light-off")
        }
    })
}

ledArr.forEach(element => {
    getAPISmartLed(element)
    document.querySelector(`#${element}`).addEventListener('change', (e) => {
        const value = e.target.checked ? 1 : 0;
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': 'aio_Hfnz79nRupK7iPtcnyNb8ata7N4g'
            },
            url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${element}/data`,
            data: JSON.stringify({ 'value': value })
        }).then(() => {
            const iconLight = document.getElementById(`${element}`).parentNode.parentNode.querySelector('.icon-light')
            if (value) {
                iconLight.classList.remove("light-off")
                iconLight.classList.add("light-on")
            } else {
                iconLight.classList.remove("light-on")
                iconLight.classList.add("light-off")
            }
        })
    })
})

document.querySelector('.box-icon-reload').addEventListener('click', () => {
    for(var element of ledArr) {
        getAPISmartLed(element)
    }
})

// setInterval(() => {
//     for(var element of ledArr) {
//         getAPISmartLed(element)
//     }
// }, 30000)