import React from 'react'
import { render } from 'react-dom'
import Page from './components/Page'
import store from './store/index'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import history from './history'

// render(<Provider store={store}><Router history={history}><Page /></Router></Provider>, document.getElementById('app'))
render(<Provider store={store}><Page /></Provider>, document.getElementById('app'))
