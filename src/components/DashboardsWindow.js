import React, { PureComponent } from 'react'
import { Grid, Card, CardContent, Button, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import {
  VulnerabilitiesCard,
} from 'asset-vulnerability-report'


class DashboardsWindow extends PureComponent {
  render() {
    return (
      <>
        <Grid container spacing={16}>
          <Grid item  xs={6} md={2} xl={2}>
            <VulnerabilitiesCard />
          </Grid>
          <Grid item  xs={6} md={2} xl={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h6">
                  Summary
                  </Typography>
                <Button
                  component={Link}
                  to="/summary">View</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }
}


export default DashboardsWindow
