import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core'
import RadialChart from './RadialChart';
import BarChart from './BarChart';

class SummaryWindow extends PureComponent {
  render() {
    const chart1 = {
      labels: ['On Target', 'Vulnerable', 'Off Target'],
      series: [17, 5, 2],
      title: {
        text:"Lorem Ipsum",
        style: {
          fontSize: '18px'
        }
      }
    }
   
    const chart2 = {
      series: [73],
      labels: ['Lorem Ipsum'],
      extra:{
        stroke:{
          dashArray: 4,
        }
      },
      title: {
        text:"Number of devices safe under your territory",
        align: 'right',
        style: {
          fontSize: '18px'
        }
      }
    }

    const chart3 = {
      series: [{
        name: 'Update Available',
        data: [1]
      }, {
        name: 'Missconections',
        data: [0]
      }, {
        name: 'Hacked',
        data: [3]
      }],
    }

    const chart4 = {
      series: [{
        name: 'On Target',
        data: [4]
      }, {
        name: 'Vulnerable',
        data: [1]
      }, {
        name: 'Off Target',
        data: [1]
      }],
    }

    const chart5 = {
      series: [{
        name: 'On Target',
        data: [1]
      }, {
        name: 'Vulnerable',
        data: [0]
      }, {
        name: 'Off Target',
        data: [0]
      }],
    }
    
    return (
      <>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6} lg={6}>
            <RadialChart data={chart1} type={1} title="Lorem Ipsum"/>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <RadialChart data={chart2} type={2}/>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <BarChart data={chart3} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <BarChart data={chart4} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <BarChart data={chart5} />
          </Grid>
        </Grid>
      </>
    )
  }

}


export default SummaryWindow