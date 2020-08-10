// TODO: Review from scratch

import React, { useContext } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import {
  getRisksByAssetId,
  getSelectedRiskIndex,
  setSelectedRiskIndex,
} from 'asset-report-risks'
import {
  IsLayoutMobileContext,
} from '../contexts'

export default function AssetRisksPanel({
  asset,
  isDetailsWindowExpanded,
  setIsDetailsWindowExpanded,
}) {
  const dispatch = useDispatch()
  const assetId = asset.id
  const risksByAssetId = useSelector(getRisksByAssetId)
  const risks = risksByAssetId[assetId] || []
  const selectedRiskIndex = useSelector(getSelectedRiskIndex)
  const isLayoutMobile = useContext(IsLayoutMobileContext)

  return (
    <>
      <List component='div' disablePadding>
        {
          (!isLayoutMobile && risks.length === 0) ?
            <Typography variant='h5' component='h2'>
              No risks to show
              </Typography>
          :
          risks.map((risk, riskIndex) => {
            const meterCount = risk.meterCount
            const isHighlighted = risk.vulnerabilityUri === selectedRiskIndex

            return (
              <Card
                className={clsx({ highlighted: isHighlighted })}
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
