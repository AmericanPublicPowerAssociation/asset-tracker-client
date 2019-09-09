import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { radialStyle, radialSemiCircle } from '../datasets/radialChartStyle'

class RadialChart extends Component {
  render() {
    const typeChart = this.props.type===1 ? radialStyle : this.props.type===2 ? radialSemiCircle : ""
    const aditionalStyle = { options: { ...typeChart, labels: this.props.data.labels, title: this.props.data.title, ...this.props.data.extra}}
    return (
      <>
        <Chart options={aditionalStyle.options} series={this.props.data.series} type="radialBar" height="380" />
      </>
    )
  }
}
export default RadialChart