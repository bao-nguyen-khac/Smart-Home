// $(".box-icon-reload").click(function () {
//     $('.box-icon-reload').addClass('active');
//     $('.box-icon-reload').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
//         $(this).removeClass('active');
//     });
// });
const doorArr = [{
    name: 'smart-door-1',
    private: 'smart-doorprivate-1'
}]
const getAPISmartDoor = (e) => {
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': `${keyAdafruit}`
        },
        url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${e}`
    }).then(data => {
        if (data.data.last_value == 1) {
            document.querySelector('.icon-site').innerHTML = '<i class="fas fa-door-open"></i>'
        } else {
            document.querySelector('.icon-site').innerHTML = '<i class="fas fa-door-closed"></i>'
        }
    })
}
const getAPISmartDoorPrivate = (e) => {
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': `${keyAdafruit}`
        },
        url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${e}`
    }).then(data => {
        const checkInputJQ = $(`#${e}`)
        if (data.data.last_value == 1) {
            checkInputJQ.attr('checked', true)
        } else {
            checkInputJQ.attr('checked', false)
        }
    })
}
setTimeout(() => {
    doorArr.forEach(element => {
        getAPISmartDoor(element.name)
        getAPISmartDoorPrivate(element.private)
        document.querySelector(`#${element.private}`).addEventListener('change', (e) => {
            const value = e.target.checked ? 1 : 0;
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-AIO-Key': `${keyAdafruit}`
                },
                url: `https://io.adafruit.com/api/v2/baonguyenkhac/feeds/${element.private}/data`,
                data: JSON.stringify({ 'value': value })
            })
        })
    })
}, 1000);

document.querySelector('.box-icon-reload').addEventListener('click', () => {
    for (var element of doorArr) {
        getAPISmartDoor(element.name)
        getAPISmartDoorPrivate(element.private)
    }
})

socket.on('doorChange', data => {
    if (data.data == 1) {
        document.querySelector('.icon-site').innerHTML = '<i class="fas fa-door-open"></i>'
    } else {
        document.querySelector('.icon-site').innerHTML = '<i class="fas fa-door-closed"></i>'
    }
})