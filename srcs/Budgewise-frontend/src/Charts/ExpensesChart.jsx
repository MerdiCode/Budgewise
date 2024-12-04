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
          categories: ["Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",]
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

  changeOptions = async (val) => {
    let days = [0, 0, 0, 0, 0, 0, 0];
    let weeks = [0, 0, 0, 0, 0];
    let month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let year = [0, 0, 0, 0, 0, 0, 0];

    // Fetch data for different time periods
    let daily = await axios.get('https://backendbudgewise.onrender.com/users/getDailyExpenses/', { withCredentials: true });
    let weekly = await axios.get('https://backendbudgewise.onrender.com/users/getWeeklyExpenses/', { withCredentials: true });
    let monthly = await axios.get('https://backendbudgewise.onrender.com/users/getMonthlyExpenses/', { withCredentials: true });
    let yearly = await axios.get('https://backendbudgewise.onrender.com/users/getYerlyExpenses/', { withCredentials: true });

    let dailyArr = daily.data;
    let weeklyArr = weekly.data;
    let monthlyArr = monthly.data;
    let YearlyArr = yearly.data;

    // Fill the data arrays with the fetched values
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
      },
    ];

    const weeklySeries = [
      {
        name: "Weekly",
        data: weeks,
      },
    ];

    const MonthlySeries = [
      {
        name: "Monthly",
        data: month,
      },
    ];

    const YearlySeries = [
      {
        name: "Yearly",
        data: year,
      },
    ];

    // Set the categories based on the selected option
    let categories = [];
    switch (val.target.value) {
      case 'Daily':
        categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.setState({ series: dailySeries });
        break;

      case 'Weekly':
        categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
        this.setState({ series: weeklySeries });
        break;

      case 'Monthly':
        categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.setState({ series: MonthlySeries });
        break;

      case 'Yearly':
        categories = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];
        this.setState({ series: YearlySeries });
        break;

      default:
        categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.setState({ series: dailySeries });
        break;
    }

    // After updating the state, we update the chart options
    this.setState(
      (prevState) => ({
        options: {
          ...prevState.options,
          xaxis: {
            categories,
          },
        },
      }),
      () => {
        // Update the chart using ApexCharts after state is updated
        ApexCharts.exec('basic-bar', 'updateOptions', {
          xaxis: {
            categories: categories,
          },
        });
      }
    );
  };



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