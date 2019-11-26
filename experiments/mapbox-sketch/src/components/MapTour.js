import React from 'react'
import Tour from 'reactour'


const steps = [
  {
    selector: '#mapSketch',
    content: 'This is your map canvas. You can draw shapes, lines, and points.',
  },
  {
    selector: '#toolbar',
    content: 'This is the toolbar that will be used to perform different draw actions.'
  }, 
  {
    selector: '#mapSketch',
    content: "Let's try to draw a point."
  },
  {
    selector: '#toolbar',
    content: 'Click on Draw Point.'
  },
  {
    selector: '#mapSketch',
    content: 'Draw a point on the map by clicking in the map. After clicking, you will notice that the point was created and colored gray.'
  },
  {
    selector: '#mapSketch',
    content: "Let's try to draw a line."
  },
  {
    selector: '#toolbar',
    content: 'Click on Draw Line'
  },
  {
    selector: '#mapSketch',
    content: 'Draw a line by clicking on the map. Click on View Mode in the toolbar to finish drawing the line.'
  },
  {
    selector: '#mapSketch',
    content: 'Notice that the Draw Line Mode also draws points.'
  },
  {
    selector: '#mapSketch',
    content: "Let's modify a point."
  },
  {
    selector: '#mapSketch',
    content: 'In order to modify a shape, line, or point. The object needs to be selected.'
  },
  {
    selector: '#toolbar',
    content: 'There are two ways to select items.'
  },
  {
    selector: '#toolbar',
    content: 'You can select one item in View Mode and multiple items with the Select Tool.'
  },
  {
    selector: '#mapSketch',
    content: 'Select item(s)'
  },
  {
    selector: '#toolbar',
    content: 'Click on move.'
  },
  {
    selector: '#mapSketch',
    content: 'Click and hold the item and move cursor.'
  }
]

function TourGuide({ current, content, totalSteps, gotoStep, close }){
  return (
    <div style={{
      background: 'white',
      width: '350px',
      padding: 0
    }}>
      <div style={{textAlign: 'center', backgroundColor: '#931621', color: 'white', padding: '1px'}}>
        <h1>Map Sketch Tour</h1>
      </div> 
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{backgroundColor: '#326771', color: 'white', padding: '3px'}}>
          <ul style={{listStyle: 'none', padding: ' 0 2px'}}>
            <li>Create</li>
            <li>Modify</li>
            <li>Delete</li>
          </ul>
        </div>
        <div style={{flexGrow: '3'}}>
          <h2 style={{textAlign: 'center'}}>Main</h2>
        </div>
      </div>
      <div style={{textAlign: 'center'}}>
        <span>prev</span>
        <span>|</span>
        <span>next</span>
      </div>
    </div>
  )  
}

function MapTour(props){
  return (
    <>
    <Tour 
      steps={steps}
      isOpen={props.openDemo}
      onRequestClose={() => props.toggleDemo()}/>
    </>
  )
}

export default MapTour
