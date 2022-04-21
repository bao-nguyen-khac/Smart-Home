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
setTimeout(() => {
    tempArr.forEach(t => getAPITemp(t))
    humiArr.forEach(h => getAPIHumi(h))
    lightArr.forEach(l => getAPILight(l))
    gasArr.forEach(g => getAPIGas(g))
}, 1000)


const xValue = d => d.timestamp;
const xLabel = 'Time';
const yValue = d => d.temperature;
const yLabel = 'Temperature';
const margin = { left: 120, right: 30, top: 20, bottom: 120 };

const svg = d3.select('svg');
const width = svg.attr('width');
const height = svg.attr('height');
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
const xAxisG = g.append('g')
    .attr('transform', `translate(0, ${innerHeight})`);
const yAxisG = g.append('g');

xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 50)
    .text(xLabel);

yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y', -60)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

const xScale = d3.scaleTime();
const yScale = d3.scaleLinear();

const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickPadding(15)
    .ticks(5)
    .tickSize(-innerHeight);

const yTicks = 6;
const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(yTicks)
    .tickPadding(15)
    .tickSize(-innerWidth);

const line = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

const row = d => {
    d.timestamp = new Date(d.createdAt);
    d.temperature = +d.data;
    return d;
};
axios({
    method: 'GET',
    url: `/getTempLastHours`
})
    .then(data => {
        var result = data.data
        result.map(e => row(e))
        xScale
            .domain(d3.extent(result, xValue))
            .range([0, innerWidth]);

        yScale
            .domain(d3.extent(result, yValue))
            .range([innerHeight, 0])
            .nice(yTicks);
        g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 4)
            .attr('d', line(result));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    })

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
