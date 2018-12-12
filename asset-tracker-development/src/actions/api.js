const scheme = 'http';
const port = 5000
const hostname = '18.212.160.114'
export const api_base_url = `${scheme}://${hostname}:${port}`

export const APIsearch = (filters) => {
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
  }

export const APIdeleteAsset = (id) => {
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
  }

export const APIaddAsset = (asset) => {
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
  }

export const APIeditAsset = (asset) => {
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
  }
