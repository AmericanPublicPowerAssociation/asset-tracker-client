import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  getAssetTypeByCode,
} from '../selectors'

export default function AssetRisksPanel({
  asset,
  isDetailsWindowExpanded,
  isMobileScreen,
  setIsDetailsWindowExpanded,
}) {
  const dispatch = useDispatch()
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name
  const risksByAssetId = useSelector(getRisksByAssetId)
  const risks = risksByAssetId[assetId] || []
  const selectedRiskIndex = useSelector(getSelectedRiskIndex)

  return (
    <>
      <List component='div' disablePadding>
        <ListItem component='div' disableGutters>
          <Tooltip title={assetTypeName} placement='left'>
            <ListItemIcon>
              <AssetTypeSvgIcon assetTypeCode={assetTypeCode} />
            </ListItemIcon>
          </Tooltip>

          <ListItemText>
            <AssetName asset={asset} expand={isDetailsWindowExpanded} setExpand={setIsDetailsWindowExpanded} />
          </ListItemText>
        </ListItem>

        {
          !isMobileScreen &&
          risks.map((risk, riskIndex) => {
            const meterCount = risk.meterCount
            const isHighlighted = riskIndex === selectedRiskIndex

            return (
              <Card
                className={clsx({ highlighted: isHighlighted })}
                onClick={() => dispatch(setSelectedRiskIndex(riskIndex))}
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
      { isMobileScreen && !isDetailsWindowExpanded &&
        <div className="mobile-risk-summary">
          <Typography>{risks.length} risks</Typography>
        </div> }
    </>
  )
}
