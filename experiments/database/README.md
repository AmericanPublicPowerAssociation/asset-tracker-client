# Examples

    asset_type
        pole
        meter
            residential meter
            commercial meter
            industrial meter
        line
            overhead line
            underground line
        switch
            circuit breaker
            recloser
            relay
        busbar
        transformer
        substation
        station
            photovoltaic power station

# Tables

    organization
        id
        name
        member_organizations
    user
        id
        organization_id
        name
        email
        role
    vendor
        id
        name
    product
        id
        vendor_id
        name
    product_version
        id
        product_id
        version
    asset_type
        id
        name
    asset_subtype
        id
        type_id
        parent_id
        name
    asset
        id
        organization_id
        type_id
        subtype_id
        vendor_id
        product_id
        version_id
        parent_id
        name
        geometry
        properties
        connected_assets
    asset_connection
        l_asset_id
        r_asset_id
