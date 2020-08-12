// TODO: Review from scratch

import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {
  getRisksByAssetId,
  getSelectedRiskIndex,
  setSelectedRiskIndex,
} from 'asset-report-risks'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import AssetName from './AssetName'
import {
  IsLayoutMobileContext,
} from '../contexts'
import {
  getAssetTypeByCode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  noRisks: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  sidePadding: {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
  },
}))

export default function AssetRisksPanel({
  asset,
  isDetailsWindowExpanded,
  setIsDetailsWindowExpanded,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name
  const risksByAssetId = useSelector(getRisksByAssetId)
  const risks = risksByAssetId[assetId] || []
  const selectedRiskIndex = useSelector(getSelectedRiskIndex)
  const isLayoutMobile = useContext(IsLayoutMobileContext)

  return (
    <>
      <List component='div' disablePadding>
        <ListItem component='div' disableGutters style={{ flex: '0 0 auto', padding: '10px' }}>
          <Tooltip title={assetTypeName} placement='left'>
            <ListItemIcon>
              <AssetTypeSvgIcon assetTypeCode={assetTypeCode} />
            </ListItemIcon>
          </Tooltip>

          <ListItemText>
            <AssetName asset={asset} isFullScreen={isDetailsWindowExpanded} setIsFullScreen={setIsDetailsWindowExpanded} />
          </ListItemText>
        </ListItem>

        {
          (!isLayoutMobile && risks.length === 0) ?
            <Typography disableGutter variant='h6' className={clsx(classes.noRisks, classes.sidePadding)}>
              No risks to show
            </Typography>
          :
          risks.map((risk, riskIndex) => {
            const meterCount = risk.meterCount
            const isHighlighted = risk.vulnerabilityUri === selectedRiskIndex

            return (
              <Card
                className={clsx({ highlighted: isHighlighted }, classes.sidePadding)}
                onClick={() => dispatch(setSelectedRiskIndex(risk.vulnerabilityUri))}
              >
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    <Link
                      target='_blank'
                      rel='noopener noreferrer'
                      href={'//' + risk.vulnerabilityUrl}
                    >
                      {risk.vulnerabilityUri}
                    </Link>
                  </Typography>
                  <Typography color='textSecondary'>
                    threat score = {risk.threatScore}<br />
                    meter count = {meterCount}
                  </Typography>
                  <Typography variant='body2' component='p'>
                    {risk.threatDescription}
                  </Typography>
                </CardContent>
              </Card>
            )
          })
        }
      </List>
      {isLayoutMobile && !isDetailsWindowExpanded &&
        <div className="mobile-risk-summary">
          <Typography>{risks.length} risks</Typography>
        </div> }
    </>
  )
}
