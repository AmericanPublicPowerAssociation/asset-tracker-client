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
  {id: 'p', name: 'Pole'},
  {id: 'l', name: 'Line'},
  {id: 'm', name: 'Meter', children: [
    {id: 'mr', name: 'Residential'},
    {id: 'mc', name: 'Commercial'},
    {id: 'mi', name: 'Industrial'},
    {id: 'mX', name: 'Other'}]},
  {id: 't', name: 'Transformer', children: [
    {id: 'td', name: 'Distribution'},
    {id: 'tp', name: 'Power'},
    {id: 'tX', name: 'Other'}]},
  {id: 'x', name: 'Switch', children: [
    {id: 'xf', name: 'Fuse'},
    {id: 'xb', name: 'Breaker'},
    {id: 'xc', name: 'Recloser'},
    {id: 'xi', name: 'Interrupter'},
    {id: 'xs', name: 'Sectionalizer'},
    {id: 'xr', name: 'Relay'},
    {id: 'xX', name: 'Other'}]},
  {id: 'q', name: 'Power Quality', children: [
    {id: 'qc', name: 'Capacitor'},
    {id: 'qr', name: 'Regulator'},
    {id: 'qb', name: 'Booster'},
    {id: 'qX', name: 'Other'}]},
  {id: 'c', name: 'Control', children: [
    {id: 'cp', name: 'PLC'},
    {id: 'cm', name: 'Microcontroller'},
    {id: 'cX', name: 'Other'}]},
  {id: 'b', name: 'Busbar'},
  {id: 'o', name: 'Storage'},
  {id: 'g', name: 'Generator'},
  {id: 's', name: 'Substation', children: [
    {id: 'sd', name: 'Distribution'},
    {id: 'st', name: 'Transmission'},
    {id: 'sX', name: 'Other'}]},
  {id: 'S', name: 'Station'},
  {id: 'X', name: 'Other'},
]
export const ASSET_TYPE_BY_ID = ASSET_TYPES.reduce((obj, item) => {
  obj[item.id] = item
  return obj
}, {})
export const SELECTED_ASSET_TYPE_IDS = ['l']
export const DEFAULT_ASSET_TYPE_ID = 'p'

export const ASSET_BY_ID = {
/*
  : {name: 'station'},
  generator
  storage
  switch
  : {substation},
  busbar
  switch
  control
  quality
  transformer
  line
  pole
  transformer
  meter
*/
}
export const SORTED_ASSET_IDS = Object.keys(ASSET_BY_ID)
