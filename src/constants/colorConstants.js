const TRANSPARENT_BLACK = [0, 0, 0, 128]
const TRANSPARENT_WHITE = [255, 255, 255, 128]
const SOLID_CYAN = [0, 255, 255, 255]

export const COLORS_BY_MAP_STYLE_NAME = {
  dark: {
    active: 'white',
    inactive: 'gray',
    assets: TRANSPARENT_WHITE,
    buses: SOLID_CYAN,
  },
  street: {
    active: 'black',
    inactive: 'gray',
    assets: TRANSPARENT_BLACK,
    buses: SOLID_CYAN,
  },
  satellite: {
    active: 'white',
    inactive: 'gray',
    assets: TRANSPARENT_WHITE,
    buses: SOLID_CYAN,
  },
}
