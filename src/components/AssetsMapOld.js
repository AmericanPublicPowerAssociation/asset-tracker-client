  function handleBusesGeoJsonClick(info, event) {
    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      setLineBusId(busId)
      // If we already started a line,
      if (selectedAssetIndexes.length) {
        // End the line
        changeSketchMode(SKETCH_MODE_ADD, busId)
      }
    } else {
      if (info.picked) {
        const busIndex = info.index
        setSelectedBusIndexes([busIndex])
      }
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Delete') {
      if (focusingAssetId && sketchMode.startsWith(SKETCH_MODE_EDIT)) {
        openDeleteAssetDialog()
      }
    }
  }

/*
*    and we clicked on a bus
*       add a connection to that bus
*        show snackbar
*    and we did not click on a bus
*       add a connection to a new bus
* if we are ending the line
*    and we clicked on a bus
*       add a connection to that bus
*       end the connection
*        clear selected asset indexes
*        show snackbar
*/
