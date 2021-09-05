
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  }
  catch (error) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState)
  }
  catch (error) {
    return 'state not serializable'
  }
}

export const saveAuthCred = (authRef, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(authRef, serializedState)
  }
  catch (error) {
    return 'state not serializable'
  }
}

export const loadAuthCred = (authRef) => {
  try {
    const serializedState = localStorage.getItem(authRef)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  }
  catch (error) {
    return undefined
  }
}

export const removeCred = (authRef) => {
  try {
    const serializedState = localStorage.getItem(authRef)
    if (serializedState === null) {
      return undefined
    }
    localStorage.removeItem(authRef)
  } catch (error) {

  }
}