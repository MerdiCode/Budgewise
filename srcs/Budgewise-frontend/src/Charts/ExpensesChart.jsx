import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts'

import axios from "axios";


class Expenses extends Component {





  constructor(props) {

    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",

          toolbar: {
            show: false,
          },


        },

        colors: ['#4A628A']
        ,

        xaxis: {
          tickPlacement: 'between',

          type: 'category',
          categories: []
        }
      },
      series: [
        {
          name: "series-1",
          data: [0, 0, 0, 0, 0, 0, 0]

        },

      ]

      ,

    };


  }

  async componentDidMount() {
    await this.loadDailyData();
  }

  loadDailyData = async () => {
    let days = [0, 0, 0, 0, 0, 0, 0];
    const daily = await axios.get(
      "https://gorgeous-actually-hydrangea.glitch.me/users/getDailyExpenses/",
      { withCredentials: true }
    );
    const dailyArr = daily.data;

    dailyArr.forEach((value) => {
      days[(Number(value.day) + 3) % 7] = value.Data;
    });

    this.setState({
      series: [
        {
          name: "Daily",
          data: days,
        },
      ],
    });

    ApexCharts.exec("basic-bar", "updateOptions", {
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    });
  };



  changeOptions = async (val) => {
   
    let days = [0, 0, 0, 0, 0, 0, 0];
    let weeks = [0, 0, 0, 0, 0];
    let month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let year = [0, 0, 0, 0, 0, 0, 0];
    let daily = await axios.get('https://gorgeous-actually-hydrangea.glitch.me/users/getDailyExpenses/', { withCredentials: true });
    let weekly = await axios.get('https://gorgeous-actually-hydrangea.glitch.me/users/getWeeklyExpenses/', { withCredentials: true });
    let monthly = await axios.get('https://gorgeous-actually-hydrangea.glitch.me/users/getMonthlyExpenses/', { withCredentials: true });
    let yearly = await axios.get('https://gorgeous-actually-hydrangea.glitch.me/users/getYerlyExpenses/', { withCredentials: true });

    let dailyArr = daily.data;
    let weeklyArr = weekly.data;
    let monthlyArr = monthly.data
    let YearlyArr = yearly.data
    dailyArr.forEach((value) => {
      days[(Number(value.day) + 3) % 7] = value.Data;
    });


    weeklyArr.forEach((value) => {
      weeks[Math.floor(Number(value.day) / 7)] = value.Data;
    });

    monthlyArr.forEach((value) => {
      month[value.month - 1] = value.Data;
    });
    YearlyArr.forEach((value) => {
      year[0] = value.Data;
    });


    const dailySeries = [
      {
        name: "Daily",
        data: days,
      }
    ];

    const weeklySeries = [
      {
        name: "Weekly",
        data: weeks,
      }
    ];
    const MonthlySeries = [
      {
        name: "Monthly",
        data: month,
      }
    ];
    const YearlySeries = [
      {
        name: "Monthly",
        data: year,
      }
    ];
    switch (val.target.value) {
      case 'Daily':
        ApexCharts.exec('basic-bar', 'updateOptions', {
          xaxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          },
        });
        this.setState({
          series: dailySeries,
        });
        break;
     
        case 'Weekly':
        ApexCharts.exec('basic-bar', 'updateOptions', {
          xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
          },
        });
        this.setState({
          series: weeklySeries,
        });
        break;
      
        case 'Monthly':
        ApexCharts.exec('basic-bar', 'updateOptions', {
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        });
        this.setState({


          series: MonthlySeries,
        });
        break;
    
        case 'Yearly':
        ApexCharts.exec('basic-bar', 'updateOptions', {
          xaxis: {
            categories: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
          },
        });
        this.setState({
          series: YearlySeries,
        });
        break;
        default:
            ApexCharts.exec('basic-bar', 'updateOptions', {
          xaxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          },
        });
        this.setState({
          series: dailySeries,
        });
        break;
    }
  }


  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <div className="d-flex  align-items-center mt-4 mb-2" >
              <select onChange={this.changeOptions} className="p-1 addGoal" name="" id="">
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option></select>

              <p className="mb-0 ms-1" style={{ color: '#B9E5E8' }}>Expenses</p>
            </div>
            <Chart
              options={this.state.options}

              series={this.state.series}
              type="bar"
              width="100%"
              height={'250px'}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Expenses;