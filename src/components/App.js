import React, { useState } from 'react'
import AssetsMap from './AssetsMap'
import UsersWindow from './UsersWindow'
import OptionsWindow from './OptionsWindow'
import DetailsWindow from './DetailsWindow'
import {
  IS_WITH_DETAILS,
} from '../constants'
import './App.css'

export default function App() {
  const [isWithDetails, setIsWithDetails] = useState(IS_WITH_DETAILS)
  return (
    <div>
      <AssetsMap />
      <UsersWindow />
      <OptionsWindow
        isWithDetails={isWithDetails}
        setIsWithDetails={setIsWithDetails}
      />
      <DetailsWindow
        isWithDetails={isWithDetails}
      />
    </div>
  )
}
