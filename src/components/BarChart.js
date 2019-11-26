import React, { Component } from 'react'
import Chart from "react-apexcharts";
import { barChartStyle, barChartColumnStyle } from "../datasets/barChartStyle";

class BarChart extends Component {
  render() {
    const {data, type, title} = this.props
    const series =data.series
    const aditionalStyle = type=="column" ?  {options: {...barChartColumnStyle.options, xaxis: { categories: data.categories, labels: {show: true}}, yaxis: {title: {text: data.title}}}} : {options: {...barChartStyle.options} }
    return (
      <div>
        <Chart options={aditionalStyle.options} series={series} type="bar" width="100%" height="320"></Chart> 
      </div>
    )
  }
}

export default BarChart