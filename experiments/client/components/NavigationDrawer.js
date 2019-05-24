class NavigationDrawer extends PureComponent {
  render() {
    const {
			classes,
      onClose,
      vulnerableAssets,
      ...etc
    } = this.props
    return (
      <Drawer
        onClose={onClose}
        {...etc}
      >
        <List>
          <List
            component='div'
            disablePadding
          >
            <ListItemLink
              to='/reports/vulnerability'
              text='Vulnerability'
              icon={<WarningIcon />}
              badgeContent={vulnerableAssets.length ? vulnerableAssets.length : ''}
              badgeColor='error'
              inset
            />
          </List>
        </List>
      </Drawer>
    )
  }
}
