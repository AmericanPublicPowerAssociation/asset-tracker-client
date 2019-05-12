toggleTheme = () => {
this.setState({isDark: !this.state.isDark})}

return (
<main className={classNames(classes.main, {
})}>
  <Paper className={classes.paper}>
    <Route exact path='/' render={() => (
      <TableWindowContainer
        onSelect={this.openInformationDrawer}
      />
    )} />
    <Route exact path='/maps' render={() => (
      <MapWindow
        onSelect={this.openInformationDrawer}
      />
    )} />
  {/*
    <Route exact path='/circuits' render={() => (
      <CircuitWindow
        onSelect={this.openInformationDrawer}
      />
    )} />
  */}
    <Route exact path='/reports/vulnerability' render={() => (
      <VulnerabilityReportWindowContainer />
    )} />
  </Paper>
</main>
<InformationDrawer
  open={isInformationDrawerOpen}
  onClose={this.closeInformationDrawer}
/>
