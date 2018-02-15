import React from 'react'
import Book from './components/Book'
import BooksList from './components/BooksList'
import Author from './components/Author'
import AuthorList from './components/AuthorList'
import ErrorPage from './components/ErrorPage'
import NotFoundPage from './components/NotFoundPage'

const routers = [
  {
    name: 'books',
    path: '/books',
    isExact: true,
    title: 'A list of books',
    component: BooksList,
  },
  {
    name: 'booksId',
    path: '/books/:book_id',
    isExact: false,
    title: 'Book\'s info',
    component: Book,
  },
  {
    name: 'authors',
    path: '/authors',
    isExact: true,
    title: 'List of Authors',
    component: AuthorList,
  },
  {
    name: 'authorsId',
    path: '/authors/:author_id',
    isExact: false,
    title: 'Author\'s page',
    component: Author,
  },
  {
    name: 'error',
    path: '/error',
    isExact: true,
    title: 'Error Page :(',
    component: ErrorPage,
  },
  {
    name: 'notFound',
    path: '*',
    isExact: false,
    title: '(o_O)',
    component: NotFoundPage,
  }
]

export default routers