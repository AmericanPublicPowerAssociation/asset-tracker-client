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
            circuit breaker switch
            recloser switch
            relay switch
        busbar
        transformer
        substation

# Tables

    utility
        id
        identifier
        name
    user
        id
        identifier
        utility_id
        name
        email
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
    asset_subtype
        id
        type_id
        parent_id
        name
    asset
        id
        identifier
        utility_id
        type_id
        subtype_id
        vendor_id
        product_id
        version_id
        parent_id
        name
        geometry
        properties
        connections
    asset_connection
        l_asset_id
        r_asset_id
