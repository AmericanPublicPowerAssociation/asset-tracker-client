import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

export function usePickableLayer() {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleLayerClick(info) {
      const assetId = info.object.properties.id
      console.log('handleLayerClick', assetId)
    },
  }), [dispatch])
}

export function useEditableLayer() {
}

export function useInterpretableLayer() {
}
