import translateFeature from '@turf/transform-translate'
import {
  BUS_DISTANCE_IN_KILOMETERS_BY_CODE,
  MINIMUM_BUS_ID_LENGTH,
} from '../constants'
import {
  getRandomId,
} from '../macros'

export function makeBusId() {
  return getRandomId(MINIMUM_BUS_ID_LENGTH)
}
