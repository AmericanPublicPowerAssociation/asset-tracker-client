import React, {Component} from 'react';

import {Row, Col, Panel} from 'react-bootstrap';


class AssetDetails extends Component {
  render() {
    const {asset} = this.props;
    let details = ''
    if (asset) {
      details = (
        <div className='asset-details'>
          <h2>Vendor</h2>
          <p>{asset.vendor}</p>
          <h2>Product</h2>
          <p>{asset.product}</p>
          <h2>Version</h2>
          <p>{asset.version}</p>
          <h2>ID</h2>
          <p>{asset.id}</p>
        </div>
      )
    }
    return (
      <Row>
        <Col lg={12}>
          <Panel>
            <Panel.Heading><h1>Asset</h1></Panel.Heading>
            <Panel.Body>
                {details}
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default AssetDetails;
