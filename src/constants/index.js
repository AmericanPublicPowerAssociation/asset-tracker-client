export * from './mapConstants'
export * from './assetConstants'

export const USER_NAME = 'Alex Hofmann'

export const TASKS = [{
  id: 1,
  name: 'Reset Meter',
  status: 0,
}]

export const RISKS = [{
  id: 1,
  assetId: 4,
  name: 'Open Port',
  meterCount: 5,
}, {
  id: 2,
  assetId: 5,
  name: 'Voltage Too High',
  meterCount: 2,
}]

// Specify tooltip delay in milliseconds
export const TOOLTIP_DELAY = 500

export const SKETCHING_MODE_SELECT = 'select'
export const SKETCHING_MODE_ADD = 'add'
export const SKETCHING_MODE_CONNECT = 'connect'
export const SKETCHING_MODE_EDIT = 'edit'
