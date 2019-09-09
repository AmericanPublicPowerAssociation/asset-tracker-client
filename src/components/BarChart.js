import React, { Component } from 'react'
import Chart from "react-apexcharts";
import { barChartStyle } from "../datasets/barChartStyle";

class BarChart extends Component {
  render() {
    const series = this.props.data.series
    const aditionalStyle = {options: {...barChartStyle.options} }
    return (
      <div>
        <Chart options={aditionalStyle.options} series={series} type="bar" width="100%"></Chart>
      </div>
    )
  }
}

export default BarChart