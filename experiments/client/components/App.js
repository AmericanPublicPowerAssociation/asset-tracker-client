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

<InformationDrawer
  open={isInformationDrawerOpen}
  onClose={this.closeInformationDrawer}
/>
