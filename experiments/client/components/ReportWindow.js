<List>
  <ListItemLink
    to='/reports/vulnerability'
    text='Vulnerability'
    icon={<WarningIcon />}
    badgeContent={vulnerableAssets.length ? vulnerableAssets.length : ''}
    badgeColor='error'
    inset
  />
</List>
