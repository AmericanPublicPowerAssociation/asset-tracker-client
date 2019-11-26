import React from 'react'
import { 
	ViewMode,
  type EditMode,
  RotateMode,
  TranslateMode,
	ModifyMode,
	DuplicateMode,
  DrawPointMode,
	DrawLineStringMode,
	DrawPolygonMode,
	DrawRectangleMode,
  DrawCircleFromCenterMode,
  CompositeMode
} from 'nebula.gl'


const availableModes = [
  {name: 'ViewMode', mode: ViewMode, image: ''},
  {name: 'Select tool', mode: '', image: ''},
  {name: 'Rotate', mode: RotateMode, image: ''},
  {name: 'Move', mode: TranslateMode, image: ''},
  {name: 'Modify', mode: ModifyMode, image: ''},
  {name: 'Draw Point', mode: DrawPointMode, image: ''},
  {name: 'Draw Line', mode: DrawLineStringMode, image: ''},
  {name: 'Draw Polygon', mode: DrawPolygonMode, image: ''},
  {name: 'Draw Rectangle', mode: DrawRectangleMode, image: ''},
  {name: 'Draw Circle', mode: DrawCircleFromCenterMode, image: ''},
]

function DrawModeList(props){
  const _handleClick = (e, mode) => {
    e.preventDefault()
    if (!mode) props.changeDrawMode('selection')
    else props.changeDrawMode(mode)
  }

  return (
    <div style={props.style} id='toolbar'>
      <div>
      {
        availableModes.map( (mode) => {
          const name = mode['name']
          return (
            <div
              key={name}
              style={{padding: '5px', border: '1px solid black', background: 'white', color: 'black'}}
              onClick={ (e) => _handleClick(e, mode['mode'])}
            >
              {name} {props.currentMode === mode['mode'] ? '*' : '' }
            </div>
          )
        })
      } 
      </div>
    </div>
  )
}

export default DrawModeList
