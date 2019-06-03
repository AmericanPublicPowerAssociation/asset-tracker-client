const TIMEOUT = 500;


export const APIget = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(assets)
      }, TIMEOUT)
    })
}


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
