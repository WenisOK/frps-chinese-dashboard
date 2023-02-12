import Humanize from "humanize-plus"
import echarts from "echarts/lib/echarts"

import "echarts/theme/macarons"
import "echarts/lib/chart/bar"
import "echarts/lib/chart/pie"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"

function DrawTrafficChart(elementId, trafficIn, trafficOut) {
    let myChart = echarts.init(document.getElementById(elementId), 'macarons');
    myChart.showLoading()

    let option = {
        title: {
            text: '流量监控',
            subtext: '今日',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(v) {
                return Humanize.fileSize(v.data.value) + " (" + v.percent + "%)"
            }
        },
        series: [{
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: trafficIn,
                name: '流量输入'
            }, {
                value: trafficOut,
                name: '流量输出'
            }, ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    myChart.setOption(option);
    myChart.hideLoading()
}

function DrawProxyChart(elementId, serverInfo) {
    if (serverInfo.proxy_type_count.tcp == null) {
        serverInfo.proxy_type_count.tcp = 0
    }
    if (serverInfo.proxy_type_count.udp == null) {
        serverInfo.proxy_type_count.udp = 0
    }
    if (serverInfo.proxy_type_count.http == null) {
        serverInfo.proxy_type_count.http = 0
    }
    if (serverInfo.proxy_type_count.https == null) {
        serverInfo.proxy_type_count.https = 0
    }
    if (serverInfo.proxy_type_count.stcp == null) {
        serverInfo.proxy_type_count.stcp = 0
    }
    if (serverInfo.proxy_type_count.xtcp == null) {
        serverInfo.proxy_type_count.xtcp = 0
    }
    let myChart = echarts.init(document.getElementById(elementId), 'macarons')
    myChart.showLoading()

    let option = {
        title: {
            text: '代理数量',
            subtext: '当前',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(v) {
                return v.data.value
            }
        },
        series: [{
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: serverInfo.proxy_type_count.tcp,
                name: 'TCP'
            }, {
                value: serverInfo.proxy_type_count.udp,
                name: 'UDP'
            }, {
                value: serverInfo.proxy_type_count.http,
                name: 'HTTP'
            }, {
                value: serverInfo.proxy_type_count.https,
                name: 'HTTPS'
            }, {
                value: serverInfo.proxy_type_count.stcp,
                name: 'STCP'
            }, {
                value: serverInfo.proxy_type_count.xtcp,
                name: 'XTCP'
            }],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    myChart.setOption(option);
    myChart.hideLoading()
}

// 7 days
function DrawProxyTrafficChart(elementId, trafficInArr, trafficOutArr) {
    let params = {
        width: '600px',
        height: '400px'
    }

    let myChart = echarts.init(document.getElementById(elementId), 'macarons', params);
    myChart.showLoading()

    trafficInArr = trafficInArr.reverse()
    trafficOutArr = trafficOutArr.reverse()
    let now = new Date()
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6)
    let dates = new Array()
    for (let i = 0; i < 7; i++) {
        dates.push(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate())
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    }

    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(data) {
                let html = ''
                if (data.length > 0) {
                    html += data[0].name + '<br/>'
                }
                for (let v of data) {
                    let colorEl = '<span style="display:inline-block;margin-right:5px;' +
                        'border-radius:10px;width:9px;height:9px;background-color:' + v.color + '"></span>';
                    html += colorEl + v.seriesName + ': ' + Humanize.fileSize(v.value) + '<br/>'
                }
                return html
            }
        },
        legend: {
            data: ['流量输入', '流量输出']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: dates
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: function(value) {
                    return Humanize.fileSize(value)
                }
            }
        }],
        series: [{
            name: '流量输入',
            type: 'bar',
            data: trafficInArr
        }, {

            name: '流量输出',
            type: 'bar',
            data: trafficOutArr
        }]
    };
    myChart.setOption(option);
    myChart.hideLoading()
}

export {
    DrawTrafficChart,
    DrawProxyChart,
    DrawProxyTrafficChart
}
