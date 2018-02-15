import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer/index'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'
import api from '../middlewares/api'

const enhancer = compose(
  applyMiddleware(routerMiddleware(history), api)
)

const store = createStore(reducer, {}, enhancer)

export default store
