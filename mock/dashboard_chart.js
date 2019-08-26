function chart(method) {
    let res = null
    switch (method) {
    case 'GET':
        res = {
            title: {
                text: "ECharts示例"
            },
            tooltip: {},
            xAxis: {
                data: [
                    "衬衫",
                    "羊毛衫",
                    "雪纺衫",
                    "裤子",
                    "高跟鞋",
                    "袜子"
                ]
            },
            yAxis: {},
            series: [
                {
                    name: "销量",
                    type: "bar",
                    data: [20, 40, 30, 55, 30, 60]
                }
            ]
        };
        break;
    default:
        res = null
        break;
    }
    return res
}

module.exports = chart