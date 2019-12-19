import React, { useEffect } from 'react'
import { Grid, LinearProgress, Typography, Box, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import RadialChart from './RadialChart';

const useStyles = makeStyles(theme => ({
  root:{
    padding: theme.spacing(2)
  },
  progress: {
    margin: theme.spacing(2),
  },
  paper: {
    minHeight:120,
    width: '100%',
    padding: theme.spacing(2),
    borderLeft: '10px solid #d24848',
    color:'#333',
    background: 'linear-gradient(to bottom, #eeeeee 0%,#cccccc 100%)',
    textShadow: '2px 2px 5px rgba(0,0,0,.2)',
    Typography:{
      color: '#333',
    }
  },
 
}));



export default function SummaryWindow(props) {
    const classes = useStyles();
    const {dashboards, refreshDashboards} = props
    const assetPercent = dashboards.getIn(['risks','impactedAssetPercent'])
    const meterPercent = dashboards.getIn(['risks','downstreamMeterPercent'])
    const riskCount = dashboards.getIn(['risks','riskCount'])
    const assetCount = dashboards.getIn(['risks','impactedAssetCount'])
    const meterCount = dashboards.getIn(['risks','downstreamMeterCount'])
    const threatScore = dashboards.getIn(['risks','aggregatedThreatScore'])
    const threatDescription = dashboards.getIn(['risks','greatestThreatDescription'])
    useEffect(() => {
      refreshDashboards()
    }, [refreshDashboards])
    const chart1 = {
      labels: ['Asset Percent'],
      extra:{
        stroke:{
          dashArray: 4,
        }
      },
      title: {
        text:"Asset Percent",
        align: 'center',
        style: {
          fontSize: '18px'
        }
      }
    }
    const chart2 = {
      labels: ['Stream Meter'],
      extra:{
        stroke:{
          dashArray: 4,
        }
      },
      title: {
        text:"Stream Meter",
        align: 'center',
        style: {
          fontSize: '18px'
        }
      }
    }
    
    return (
      <>
        <Grid container spacing={5} className={classes.root} >
          <Grid item xs={12} md={3} lg={3}>
            <Box color="text.primary">
              <Paper className={classes.paper} align="center">
                <Typography variant='h3'>
                  {riskCount}
                </Typography>
                <Typography variant='h6' color='inherit'>
                  Risks Count
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Box color="text.primary">
              <Paper className={classes.paper} align="center"> 
                  <Typography variant='h3'>
                    {meterCount}
                  </Typography>
                  <Typography variant='h6' color='inherit'>
                    Meter Count
                  </Typography>
              </Paper>
            </Box>     
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Box color="text.primary">
              <Paper className={classes.paper} align="center"> 
                  <Typography variant='h3'>
                    {assetCount}
                  </Typography>
                  <Typography variant='h6' color='inherit'>
                    Impacted Asset
                  </Typography>
              </Paper>
            </Box>  
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Box color="text.primary">
              <Paper className={classes.paper} align="center"> 
                  <Typography variant='h3'>
                    {threatScore}
                  </Typography>
                  <Typography variant='h6' color='inherit'>
                    Threat Score
                  </Typography>
              </Paper>
            </Box>  
          </Grid>
          <Grid xs={12} md={12} lg={12} item>
            <Box color="text.primary">
              <Paper className={classes.paper}> 
                  <Typography variant='h6'>
                    Threat Description
                  </Typography>
                  <Typography variant='body1' align="justify">
                    {threatDescription}
                  </Typography>
              </Paper>
            </Box>  
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            { assetPercent!=null ?
                (<RadialChart data={chart1} series={[assetPercent]} type={2}/>)
              :
                ( <LinearProgress color="secondary" />)
            }
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            { meterPercent!=null ?
                (<RadialChart data={chart2} series={[meterPercent]} type={2}/>)
              :
                ( <LinearProgress color="secondary" />)
            }
          </Grid>
          
        </Grid>
      </>
    )
  }