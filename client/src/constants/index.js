export const CONTENT_PADDING = 24

export const INFORMATION_DRAWER_WIDTH = 240
export const FILTER_LIST_DRAWER_WIDTH = 240

export const ADD_ASSET = 'ADD_ASSET'

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
