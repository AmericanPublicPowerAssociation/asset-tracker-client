const TRANSPARENT_BLACK = [0, 0, 0, 128]
const TRANSPARENT_WHITE = [255, 255, 255, 128]
const TRANSPARENT_CYAN = [0, 255, 255, 128]
// const TRANSPARENT_MAGENTA = [255, 0, 255, 128]
const SOMEWHAT_TRANSPARENT_BLACK = [0, 0, 0, 160]
const SOMEWHAT_TRANSPARENT_WHITE = [255, 255, 255, 160]
const SOMEWHAT_TRANSPARENT_CYAN = [0, 255, 255, 160]
const SOMEWHAT_TRANSPARENT_MAGENTA = [255, 0, 255, 160]
// const SOLID_BLACK = [0, 0, 0, 255]
// const SOLID_WHITE = [255, 255, 255, 255]
// const SOLID_CYAN = [0, 255, 255, 255]
// const SOLID_MAGENTA = [255, 0, 255, 255]

export const COLORS_BY_MAP_STYLE_NAME = {
  dark: {
    active: 'white',
    inactive: 'gray',
    asset: TRANSPARENT_WHITE,
    assetHighlight: SOMEWHAT_TRANSPARENT_WHITE,
    assetSelect: SOMEWHAT_TRANSPARENT_MAGENTA,
    bus: TRANSPARENT_CYAN,
    busHighlight: SOMEWHAT_TRANSPARENT_CYAN,
  },
  street: {
    active: 'black',
    inactive: 'gray',
    asset: TRANSPARENT_BLACK,
    assetHighlight: SOMEWHAT_TRANSPARENT_BLACK,
    assetSelect: SOMEWHAT_TRANSPARENT_MAGENTA,
    bus: TRANSPARENT_CYAN,
    busHighlight: SOMEWHAT_TRANSPARENT_CYAN,
  },
  satellite: {
    active: 'white',
    inactive: 'gray',
    asset: TRANSPARENT_WHITE,
    assetHighlight: SOMEWHAT_TRANSPARENT_WHITE,
    assetSelect: SOMEWHAT_TRANSPARENT_MAGENTA,
    bus: TRANSPARENT_CYAN,
    busHighlight: SOMEWHAT_TRANSPARENT_CYAN,
  },
}
