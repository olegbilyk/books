import { LOAD_ALL_AUTHORS, LOAD_ALL_BOOKS, LOAD_BOOK, LOAD_AUTHOR, LOAD_AUTHOR_BOOK } from '../constants'

export function loadAllBooks () {
  return {
    type: LOAD_ALL_BOOKS,
    callAPI: 'api/books'
  }
}

export function loadBook (booksId) {
  return {
    type: LOAD_BOOK,
    callAPI: `/api/books/${booksId}`,
    payload: {booksId}
  }
}

export function loadAllAuthor () {
  return {
    type: LOAD_ALL_AUTHORS,
    callAPI: '/api/authors'
  }
}

export function loadAuthor (authorId) {
  return {
    type: LOAD_AUTHOR,
    callAPI: `/api/authors/${authorId}`,
    payload: {authorId}
  }
}

export function loadAuthorBook (authorId) {
  return {
    type: LOAD_AUTHOR_BOOK,
    callAPI: `/api/authors/${authorId}/books`,
    payload: {authorId}
  }
}
