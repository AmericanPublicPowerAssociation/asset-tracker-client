import React, { createContext, useMemo, useState } from 'react'
import {
  makeAssetId,
} from '../routines'

export const EditableMapContext = createContext({
  editingAssetId: makeAssetId(),
  resetEditingAssetId: () => {},
})

export function EditableMapContextProvider({ children }) {
  // !!!
  const [editingAssetId, setEditingAssetId] = useState(makeAssetId())
  const contextValue = useMemo(() => ({
    editingAssetId,
    resetEditingAssetId: () => setEditingAssetId(makeAssetId()),
  }), [
    editingAssetId,
    setEditingAssetId,
  ])
  console.log('EditableMapContext', editingAssetId)
  return (
    <EditableMapContext.Provider value={contextValue}>
      {children}
    </EditableMapContext.Provider>
  )
}
