import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { Text, Badge } from "@chakra-ui/react";

class ApexChart extends React.Component {

    
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name:'bitcoin ₹',
                data: props.data || []
            }],
            options: {
                chart: {
                    id: 'area-datetime',
                    type: 'area',
                    height: props.height || 230,
                    zoom: {
                        autoScaleYaxis: true
                    },
                    grid: {
                        show: false,      // you can either change hear to disable all grids
                        xaxis: {
                            lines: {
                                show: false  //or just here to disable only x axis grids
                            }
                        },
                        yaxis: {
                            lines: {
                                show: false //or just here to disable only y axis
                            }
                        },
                    },
                    toolbar: {
                        show: false, // Hide the toolbar
                    }
                },
                annotations: {
                    yaxis: [{
                        y: 30,
                        borderColor: '#999'

                    }],
                    xaxis: [{
                        x: props.data.length > 0 ? props.data[0].x : 0, // Set initial x value
                        borderColor: '#999',
                        yAxisIndex: 0,
                        label: {
                            show: false
                        },
                        grid: {
                            show: false
                        }
                    }]
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                    style: 'hollow',
                },
                gridLines: {
                    show: false, // Hide x-axis grid lines
                },
                xaxis: {
                    type: 'datetime',
                    min: props.data.length > 0 ? props.data[0].x : 0, // Set initial min x value
                    tickAmount: 6,
                    labels: {
                        show: false, // Hide x-axis labels
                    },
                    axisBorder: {
                        show: false, // Hide x-axis border
                    },
                    axisTicks: {
                        show: false, // Hide x-axis ticks
                    },
                },
                yaxis: {
                    show: 'false',
                    grid: {
                        show: 'false'
                    },
                    gridLines: {
                        show: false, // Hide x-axis grid lines
                    },
                    labels: {
                        show: false, // Hide x-axis labels
                    },
                    axisBorder: {
                        show: false, // Hide x-axis border
                    },
                    axisTicks: {
                        show: false, // Hide x-axis ticks
                    },

                },
                tooltip: {
                    x: {
                        format: 'dd MMM yyyy'
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100]
                    }
                },
            },
        };
    }

    updateData(timeline) {
        const currentDate = new Date();
        let startDate, endDate;

        const newData = this.props.data.filter(point => point.x >= startDate.getTime() && point.x <= endDate.getTime());

        this.setState({
            selection: timeline,
            series: [{
                data: newData
            }],
            options: {
                ...this.state.options,
                annotations: {
                    ...this.state.options.annotations,
                    xaxis: [{
                        ...this.state.options.annotations.xaxis[0],
                        x: newData.length > 0 ? newData[0].x : 0,
                    }]
                },
                xaxis: {
                    ...this.state.options.xaxis,
                    min: newData.length > 0 ? newData[0].x : 0,
                }
            }
        });

        ApexCharts.exec(
            'area-datetime',
            'zoomX',
            startDate.getTime(),
            endDate.getTime()
        );
    }

    render() {
        return (
            <div>
                <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={this.props.height} />
                    
                </div>
               
            </div>
        );
    }
}

export default ApexChart;
