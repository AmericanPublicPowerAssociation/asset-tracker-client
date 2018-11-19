import React, {Component} from 'react';

import {Row, Col, Panel} from 'react-bootstrap';


class AssetDetails extends Component {
  render() {
    const {asset} = this.props;
    let details = ''
    if (asset) {
      details = (
        <div className='asset-details'>
          <h5>Vendor</h5>
          <p>{asset.vendor}</p>
          <h5>Product</h5>
          <p>{asset.product}</p>
          <h5>Version</h5>
          <p>{asset.version}</p>
          <h5>ID</h5>
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
