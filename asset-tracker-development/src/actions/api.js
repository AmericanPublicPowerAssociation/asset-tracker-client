export const APIsearch = (filters) => {
    const url = Object.entries(filters).reduce((url, f) => {
      return url + `${f[0]}=${f[1]}&`
    }, `http://18.212.1.167:5000/search?`);
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
  }

export const APIdeleteAsset = (id) => {
    return fetch(`http://18.212.1.167:5000/delete-asset`, {
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
  }

export const APIaddAsset = (asset) => {
    return fetch(`http://18.212.1.167:5000/add-asset`, {
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
  }

export const APIeditAsset = (asset) => {
    return fetch(`http://18.212.1.167:5000/edit-asset`, {
      method: 'POST',
      body: JSON.stringify({asset})
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res
      })
  }
