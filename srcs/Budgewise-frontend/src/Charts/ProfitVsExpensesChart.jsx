import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";



class ProfVsExp extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "donut", // Chart ID for manual updates
                    type: "donut",
                },
                labels: ["Profit", "Expenses"], // Customize labels
                colors: ["#2d9423", "#8a2d2d"], // Customize colors
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    position: "bottom",
                },
            },
            series: [ 50, 50], // Initial data as a flat array
        };
    }

    
    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.props.series}
                            type="donut"
                            width="100%"
                            height="220px"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfVsExp;