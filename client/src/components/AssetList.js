import React from 'react'

const ABC = [
	{'id': 'a', 'name': 'A'},
	{'id': 'b', 'name': 'B'},
	{'id': 'c', 'name': 'C'},
]

const AssetList = () => {
  return ( {ABC.map(x => <b>({x.id})</b>} )
}

export default AssetList
