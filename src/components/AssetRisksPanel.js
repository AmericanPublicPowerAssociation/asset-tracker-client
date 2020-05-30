import React from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
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
  getAssetTypeByCode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    background: 'rgba(0, 0, 0, 0.08)',
  },
}))

export default function AssetRisksPanel({ asset }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name
  const risksByAssetId = useSelector(getRisksByAssetId)
  const risks = risksByAssetId[assetId] || []
  const selectedRiskIndex = useSelector(getSelectedRiskIndex)
  const selectedRiskAssetId = selectedRiskIndex.assetId
  const selectedRiskVulnerabilityUri = selectedRiskIndex.vulnerabilityUri

  return (
    <List component='div' disablePadding>
      <ListItem component='div' disableGutters>
        <Tooltip title={assetTypeName} placement='left'>
          <ListItemIcon>
            <AssetTypeSvgIcon assetTypeCode={assetTypeCode} />
          </ListItemIcon>
        </Tooltip>

        <ListItemText>
          <AssetName asset={asset} />
        </ListItemText>
      </ListItem>

      {risks.map(risk => {
        const meterCount = risk.meterCount
        const highlight = (risk.assetId === selectedRiskAssetId &&
          risk.vulnerabilityUri === selectedRiskVulnerabilityUri)

        return (
          <Card
            classes={{ root: highlight && classes.root }}
            onClick={ () => dispatch(setSelectedRiskIndex(risk.assetId, risk.vulnerabilityUri))}
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
      })}
    </List>
  )
}
