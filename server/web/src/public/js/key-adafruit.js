var keyAdafruit = "";
axios({
    method: 'GET',
    url: `/key-adafruit`
})
    .then(data => {
        keyAdafruit = data.data
    })

const socket = io();