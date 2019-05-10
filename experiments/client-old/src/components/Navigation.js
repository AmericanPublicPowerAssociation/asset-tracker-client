  return (
      <Navbar className={editMode ? 'editing': '' } fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Asset Tracker</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer onClick={preventDefault} to="/assets">
              <NavItem eventKey={1}>
                Assets
              </NavItem>
            </LinkContainer>
            <LinkContainer onClick={preventDefault} to="#">
              <NavItem eventKey={2}>
                Reports
              </NavItem>
            </LinkContainer>
            <LinkContainer onClick={preventDefault} to="#">
              <NavItem eventKey={3}>
                Alerts
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer onClick={preventDefault} to="#">
              <NavItem eventKey={4}>
                Alex
              </NavItem>
            </LinkContainer>
            <LinkContainer onClick={preventDefault} to="#">
              <NavItem eventKey={5}>
                <Button bsStyle="primary">Sign Out</Button>
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
