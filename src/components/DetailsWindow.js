// TODO: Rewrite from scratch to clean up logic
import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import AssetAttributesPanel from './AssetAttributesPanel2'
import AssetNameWithIcon from './AssetNameWithIcon'
import DetailsWindowTabs from './DetailsWindowTabs'
import SearchBox from './SearchBox'
import TaskDetails from './TaskDetails'
import {
  setSelection,
} from '../actions'
import {
  IsLayoutMobileContext,
} from '../contexts'
import {
  getIsViewing,
  getOverlayMode,
  getSelectedAsset,
  getSelectedTaskId,
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
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const isViewing = useSelector(getIsViewing)
  const overlayMode = useSelector(getOverlayMode)
  const selectedAsset = useSelector(getSelectedAsset)
  const temporaryAsset = useSelector(getTemporaryAsset)
  const asset = temporaryAsset ? temporaryAsset : selectedAsset
  const isLayoutMobile = useContext(IsLayoutMobileContext)

	const drawerProps = {
    overlayMode,  isFullScreen, isLayoutMobile, setIsWithDetails, isWithDetails,
  }

	return (
		<MyDrawer {...drawerProps}>
      <SearchBox
        updateInputTextFunc={setSearchInput}
        input={searchInput}
        isShowBackButton={asset}
        onBackButtonClick={() => { dispatch(setSelection({})) }}
      />
      { !asset && <DetailsWindowTabs /> }
      { asset &&
        <Box display='flex' flexDirection='column' flexGrow={1}
        style={{ overflow: 'hidden' }}
        >
          <AssetNameWithIcon
            asset={asset}
            showExpandButton={isLayoutMobile}
            expand={isFullScreen}
            setExpand={setIsFullScreen} isViewing={isViewing}
          />
          <Box flexGrow={1} style={{ overflowX: 'hidden', overflowY: 'auto' }}>
            <AssetAttributesPanel
              asset={asset}
              isDetailsWindowFullScreen={isFullScreen}
            />
          </Box>
        </Box>
      }
		</MyDrawer>
	)
}

export function MyDrawer(props) {
  const classes= useStyles()
  const { children, setIsWithDetails, isWithDetails, isLayoutMobile, isFullScreen } = props
  const anchor = isLayoutMobile ? 'bottom' : 'left'

  return (
    <div>
      <Drawer
        PaperProps={{
          className: clsx(
            classes.paper, {
            [classes.desktopPaper]: !isLayoutMobile,
            [classes.mobilePaperPreview]: !isFullScreen && isLayoutMobile,
            [classes.mobilePaperFullHeight]: isFullScreen && isLayoutMobile,
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
