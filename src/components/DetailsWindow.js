// TODO: Rewrite from scratch to clean up logic
import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import AssetAttributesPanel from './AssetAttributesPanel2'
import AssetNameWithLogo from './AssetNameWithLogo'
import AssetRisksPanel from './AssetRisksPanel2'
import AssetTasksPanel from './AssetTasksPanel2'
import DetailsWindowTabs from './DetailsWindowTabs'
import SearchBox from './SearchBox'
import {
  OVERLAY_MODE_ASSETS,
  OVERLAY_MODE_RISKS,
  OVERLAY_MODE_TASKS,
} from '../constants'
import {
  IsLayoutMobileContext,
} from '../contexts'
import {
  getIsViewing,
  getOverlayMode,
  getSelectedAsset,
  getTemporaryAsset,
} from '../selectors'


const useStyles = makeStyles(theme => ({
  paper: {
    overflow: 'hidden',
  },
  desktopPaper: {
    position: 'fixed',
    top: theme.spacing(6),
    left: theme.spacing(1),
    width: theme.spacing(34),
    maxHeight: 'calc(100vh - 108px)',
    borderRadius: theme.shape.borderRadius,
  },
  mobilePaperPreview: {
    maxHeight: '40vh',
  },
  mobilePaperFullHeight: {
    height: '100vh',
    maxHeight: '100vh',
  },
  drawerButton: {
    position: 'fixed',
    background: 'white',
    height: theme.spacing(6),
    width: theme.spacing(2),
    borderRadius: 0,
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'white',
    },
  },
  drawerButtonClose: {
    top: theme.spacing(12),
    left: theme.spacing(35),
  },
  drawerButtonOpen: {
    top: theme.spacing(12),
    left: theme.spacing(0),
  },
}))

export default function DetailsWindows({ isWithDetails, setIsWithDetails }) {
  const [expand, setExpand] = useState(false)
  const isViewing = useSelector(getIsViewing)
  const overlayMode = useSelector(getOverlayMode)
  const selectedAsset = useSelector(getSelectedAsset)
  const temporaryAsset = useSelector(getTemporaryAsset)
  const asset = temporaryAsset ? temporaryAsset : selectedAsset
  const isLayoutMobile = useContext(IsLayoutMobileContext)

  const DetailsPanel = {
    [OVERLAY_MODE_ASSETS]: AssetAttributesPanel,
    [OVERLAY_MODE_TASKS]: AssetTasksPanel,
    [OVERLAY_MODE_RISKS]: AssetRisksPanel,
  }[overlayMode]

	const props = { overlayMode,  expand, isLayoutMobile, setIsWithDetails, isWithDetails }
	return (
		<MyDrawer {...props}>
      <>
        <SearchBox />
        { asset
          ? <Box p={1} display='flex' flexDirection='column' flexGrow={1}
              style={{ overflow: 'hidden' }}
            >
              <AssetNameWithLogo asset={asset} showExpandButton={isLayoutMobile} expand={expand} setExpand={setExpand} isViewing={isViewing} />  
              <Box flexGrow={1} style={{ overflowX: 'hidden', overflowY: 'auto' }}>
                <DetailsPanel asset={asset} />
              </Box>
            </Box>
        : <DetailsWindowTabs /> }
      </>
		</MyDrawer>
	)
}

export function MyDrawer(props) {
  const classes= useStyles()
  const { children, setIsWithDetails, isWithDetails, isLayoutMobile, expand } = props
  const anchor = isLayoutMobile ? 'bottom' : 'left'

  return (
    <div>
      <Drawer
        PaperProps={{
          className: clsx(
            classes.paper, {
            [classes.desktopPaper]: !isLayoutMobile,
            [classes.mobilePaperPreview]: !expand && isLayoutMobile,
            [classes.mobilePaperFullHeight]: expand && isLayoutMobile,
            }),
        }}
        anchor={anchor}
        variant='persistent'
        open={isWithDetails}
      >
        {children}
      </Drawer>

      { isWithDetails && !isLayoutMobile  &&
        <Slide direction='right' in={isWithDetails} mountOnEnter unmountOnExit>
          <IconButton size='small' aria-label='close-drawer' disableRipple
            className={ clsx(classes.drawerButton, classes.drawerButtonClose) }
            onClick={() => setIsWithDetails(() => setIsWithDetails(false))}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Slide>
      }
      { !isWithDetails && !isLayoutMobile &&
        <IconButton size='small' aria-label='open-drawer' disableRipple
          className={clsx(classes.drawerButton, classes.drawerButtonOpen )}
          onClick={() => setIsWithDetails(() => setIsWithDetails(true))}
        >
          <ChevronRightIcon />
        </IconButton>
      }
    </div>
  )
}
