import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  IsLayoutMobileContext,
} from '../contexts'

export default function App() {
  const isLayoutMobile = useMediaQuery('(max-width:599px)')
  return (
    <IsLayoutMobileContext.Provider value={isLayoutMobile}>
    </IsLayoutMobileContext.Provider>
  )
}
