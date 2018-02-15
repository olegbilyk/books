import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import books from './books'
import book from './book'
import authors from './authors'
import author from './author'
import authorBook from './authorBook'

export default combineReducers({router: routerReducer, books, book, authors, author, authorBook})
