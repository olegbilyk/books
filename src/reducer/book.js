import { FAIL, LOAD_BOOK, START, SUCCESS } from '../constants'

export default (book = {
  entities: {
    id: 0,
    title: '',
    pages: 0,
    year: 0,
    author: {
      id: 0,
      name: '',
      country: ''
    }
  },
  loading: false,
  loaded: false,
  fail: false
}, action) => {
  const {type, data, status} = action

  switch (type) {
    case LOAD_BOOK + START:
      return {...book, loading: true, loaded: false, fail: false}

    case LOAD_BOOK + SUCCESS:
      if (status === 200) {
        return {...book, entities: {...data, author: {...data.author}}, loading: false, loaded: true, fail: false}
      } else if ((status === 400) || (status === 404)) {
        return {...book, loading: false, loaded: false, fail: true}
      }

      return {...book}

    case LOAD_BOOK + FAIL:
      return {...book, loading: false, loaded: false, fail: true}
  }

  return book
}
