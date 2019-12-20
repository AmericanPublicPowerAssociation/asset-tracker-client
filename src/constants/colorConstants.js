const TRANSPARENT_BLACK = [0, 0, 0, 170]
const TRANSPARENT_WHITE = [255, 255, 255, 170]
const SOLID_YELLOW = [255, 255, 0, 255]

export const COLORS_BY_MAP_STYLE_NAME = {
  dark: {
    button: 'white',
    feature: TRANSPARENT_WHITE,
    bus: SOLID_YELLOW,
  },
  street: {
    button: 'black',
    feature: TRANSPARENT_BLACK,
    bus: SOLID_YELLOW,
  },
  satellite: {
    button: 'white',
    feature: TRANSPARENT_WHITE,
    bus: SOLID_YELLOW,
  },
}
