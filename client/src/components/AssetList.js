import React from 'react'

const ABC = [
	{'id': 'a', 'name': 'A'},
	{'id': 'b', 'name': 'B'},
	{'id': 'c', 'name': 'C'},
]

const AssetList = () => {
  return (
    <ul>{ABC.map(x => (x.id))}</ul>
  )
}

export default AssetList
