    const value = event.target.value.trim()

    let errorText = ''
    if (!value.length) {
      errorText = 'cannot be empty'
    }
