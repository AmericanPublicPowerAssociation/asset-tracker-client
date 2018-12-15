const scheme = 'http';
const port = 5000
const hostname = '18.212.160.114'
export const api_base_url = `${scheme}://${hostname}:${port}`
const TIMEOUT = 500;
const ASSETTYPES = {
  Pole: 1,
  Meter: 2,
  Line: 3,
  Switch: 4,
  Busbar: 5,
  Transformer: 6,
  Substation: 7,
  Station: 8,
  Other: 0,
}

let assets = [{
  "id": 0,
  "lat": 40.796092,
  "lng": -73.961454,
  "name": "Bus 0",
  "product": "Emergency Stop Relay",
  "type_id": ASSETTYPES['Switch'],
  "vendor": "schneider-electric",
  "version": "XPSAC5121"
  }, {
  "id": 1,
  "lat": 40.695178,
  "lng": -73.84433,
  "name": "Bus 1",
  "product": "TeSys D Contactor",
  "type_id": ASSETTYPES['Meter'],
  "vendor": "schneider-electric",
  "version": "LC1D09G7"
  }, {
  "id": 2,
  "lat": 40.681711,
  "lng": -73.837683,
  "name": "Bus 2",
  "product": "3-phase monitor",
  "type_id": ASSETTYPES['Meter'],
  "vendor": "siemens",
  "version": "3UG4512-1AR20"
  }, {
  "id": 3,
  "lat": 40.79502,
  "lng": -73.94425,
  "name": "Bus 3",
  "product": "Thermistor Relay 2",
  "type_id": ASSETTYPES['Switch'],
  "vendor": "siemens",
  "version": "3RN10131BW10"
  }, {
  "id": 4,
  "lat": 40.799075,
  "lng": -73.951822,
  "name": "Bus 4",
  "product": "relay",
  "type_id": ASSETTYPES['Meter'],
  "vendor": "General Electric",
  "version": "RL4RA031TJ"
  }, {
  "id": 5,
  "lat": 40.697418,
  "lng": -73.836345,
  "name": "Bus 5",
  "product": "reed switch",
  "type_id": ASSETTYPES['Switch'],
  "vendor": "General Electric",
  "version": "104PXC01"
}];


export const APIsearch = (filters) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const filterProduct = filters.name || '';
        const namePattern = new RegExp(`.*${filterProduct}.*`, 'i')
        const search_results = assets.filter((a) => {
          return a.name.match(namePattern) && (filters.type_ids.length === 0 || filters.type_ids.some((t) =>a.type_id === parseInt(t)))
        })
        res(search_results)
      }, TIMEOUT)
    })
    /*
    const url = Object.entries(filters).reduce((url, f) => {
      return url + `${f[0]}=${f[1]}&`
    }, `${api_base_url}/search?`);
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then((data) => {
        const {filteredAssets} = JSON.parse(data);
        return filteredAssets
      })
      */
  }

export const APIdeleteAsset = (id) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        let valid = false
        const oldLength = assets.length;
        assets = assets.filter((a) => a.id !== id)
        if (assets.length < oldLength)
          valid = true;
        res({sucess: valid})
      }, TIMEOUT)
    })
    /*
    return fetch(`${api_base_url}/delete-asset`, {
      method: 'DELETE',
      body: JSON.stringify({id})
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then((data) => {
        // TODO: handle case for failure
        if (!data.success) {
          throw Error(data.message);
        }
      })
      */
  }

export const APIaddAsset = (asset) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        asset.id = assets.length;
        assets = assets.concat([asset])
        res({asset_id: asset.id})
      }, TIMEOUT)
    })
    /*
    return fetch(`${api_base_url}/add-asset`, {
      method: 'POST',
      body: JSON.stringify({asset})
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then((data) => {
        // TODO: handle case for failure
        const {asset_id} = JSON.parse(data);
        return asset_id
      })
      */
  }

export const APIeditAsset = (asset) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        assets = assets.map((a) =>
          a.id === asset.id ? asset : a)
        res({asset_id: asset.id})
      }, TIMEOUT)
    })
    /*
    return fetch(`${api_base_url}/edit-asset`, {
      method: 'POST',
      body: JSON.stringify({asset})
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res
      })
      */
  }

export const APIgetCenter = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(JSON.stringify({
          lat: 40.7440823333333,
          lng: -73.8959806666667
        }))
      }, TIMEOUT)
    })
}
