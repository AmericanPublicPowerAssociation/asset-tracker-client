const TRANSPARENT_BLACK = [0, 0, 0, 128]
const TRANSPARENT_WHITE = [255, 255, 255, 128]
const SOLID_CYAN = [0, 255, 255, 255]
const PINK = [245, 0, 87]
const TRANSPARENT_PINK = [245, 0, 97, 128]

export const COLORS_BY_MAP_STYLE_NAME = {
  dark: {
    active: 'white',
    inactive: 'gray',
    isSelectedLine: PINK,
    isSelectedFill: TRANSPARENT_PINK,
    asset: TRANSPARENT_WHITE,
    bus: SOLID_CYAN,
  },
  street: {
    active: 'black',
    inactive: 'gray',
    isSelectedLine: PINK,
    isSelectedFill: TRANSPARENT_PINK,
    asset: TRANSPARENT_BLACK,
    bus: SOLID_CYAN,
  },
  satellite: {
    active: 'white',
    inactive: 'gray',
    isSelectedLine: PINK,
    isSelectedFill: TRANSPARENT_PINK,
    asset: TRANSPARENT_WHITE,
    bus: SOLID_CYAN,
  },
}
