import { SUCCESS, FAIL, START } from '../constants'
import { replace } from 'react-router-redux'

export default store => next => action => {
  const {callAPI, type, ...rest} = action

  if (!callAPI) return next(action)

  next({...rest, type: type + START})

  fetch(callAPI)
    .then(response => response.json().then(data => next({...rest, type: type + SUCCESS, data, status: response.status})))
    .catch(error => {
      store.dispatch(replace('/error'))
      return next({...rest, type: type + FAIL, error})
    })

  next(action)
}
