export const CONTENT_PADDING = 24

export const INFORMATION_DRAWER_WIDTH = 512
export const FILTER_LIST_DRAWER_WIDTH = 256

export const ADD_ASSET = 'ADD_ASSET'
export const UPDATE_ASSET = 'UPDATE_ASSET'

export const HIGHLIGHT_ASSET = 'HIGHLIGHT_ASSET'

export const ADD_SELECTED_ASSET_TYPE = 'ADD_SELECTED_ASSET_TYPE'
export const REMOVE_SELECTED_ASSET_TYPE = 'REMOVE_SELECTED_ASSET_TYPE'
export const TOGGLE_SELECTED_ASSET_TYPE = 'TOGGLE_SELECTED_ASSET_TYPE'
export const SET_SELECTED_ASSET_TYPES = 'SET_SELECTED_ASSET_TYPES'

export const ASSET_TYPES = [
  {id: '0', name: 'Station'},
  {id: '1', name: 'Substation', children: [
    {id: '1.1', name: 'Transmission'},
    {id: '1.2', name: 'Distribution'},
    {id: '1.X', name: 'Other'},
  ]},
  {id: '2', name: 'Power Quality', children: [
    {id: '2.1', name: 'Capacitor'},
    {id: '2.2', name: 'Regulator'},
    {id: '2.3', name: 'Booster'},
    {id: '2.X', name: 'Other'},
  ]},
  {id: '3', name: 'Switch', children: [
    {id: '3.1', name: 'Fuse'},
    {id: '3.2', name: 'Breaker'},
    {id: '3.3', name: 'Recloser'},
    {id: '3.4', name: 'Interrupter'},
    {id: '3.5', name: 'Sectionalizer'},
    {id: '3.6', name: 'Relay'},
    {id: '3.X', name: 'Other'},
  ]},
  {id: '4', name: 'Transformer', children: [
    {id: '4.1', name: 'Distribution'},
    {id: '4.X', name: 'Other'},
  ]},
  {id: '5', name: 'Meter', children: [
    {id: '5.1', name: 'Residential'},
    {id: '5.2', name: 'Commercial'},
    {id: '5.3', name: 'Industrial'},
    {id: '5.X', name: 'Other'},
  ]},
  {id: '6', name: 'Line'},
  {id: '7', name: 'Pole'},
  {id: '8', name: 'Busbar'},
  {id: '9', name: 'Control', children: [
    {id: '9.1', name: 'PLC'},
    {id: '9.2', name: 'Microcontroller'},
    {id: '9.X', name: 'Other'},
  ]},
  {id: 'X', name: 'Other'},
]
export const ASSET_TYPE_BY_ID = ASSET_TYPES.reduce((obj, item) => {
  obj[item.id] = item
  return obj
}, {})
export const ASSET_BY_ID ={
  'station1': {'name': 'Station 1', 'typeId': '0'},
  'station2': {'name': 'Station 2', 'typeId': '0'},
  'substation1': {'name': 'Substation 1', 'typeId': '1'},
  'substation2': {'name': 'Substation 2', 'typeId': '1'},
  'quality1': {'name': 'Power Quality 1', 'typeId': '2'},
  'quality2': {'name': 'Power Quality 2', 'typeId': '2'},
  'switch1': {'name': 'Switch 1', 'typeId': '3'},
  'switch2': {'name': 'Switch 2', 'typeId': '3'},
  'transformer1': {'name': 'Transformer 1', 'typeId': '4'},
  'transformer2': {'name': 'Transformer 2', 'typeId': '4'},
  'meter1': {'name': 'Meter 1', 'typeId': '5'},
  'meter2': {'name': 'Meter 2', 'typeId': '5'},
  'line1': {'name': 'Line 1', 'typeId': '6'},
  'line2': {'name': 'Line 2', 'typeId': '6'},
  'pole1': {'name': 'Pole 1', 'typeId': '7'},
  'pole2': {'name': 'Pole 2', 'typeId': '7'},
  'busbar1': {'name': 'Busbar 1', 'typeId': '8'},
  'busbar2': {'name': 'Busbar 2', 'typeId': '8'},
  'control1': {'name': 'Control 1', 'typeId': '9'},
  'control2': {'name': 'Control 2', 'typeId': '9'},
  'other1': {'name': 'Other 1', 'typeId': 'X'},
  'other2': {'name': 'Other 2', 'typeId': 'X'},
}
