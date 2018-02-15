import { FAIL, LOAD_ALL_BOOKS, START, SUCCESS } from '../constants'

export default (books = {
  entities: [{
    id: 0,
    title: '',
    pages: 0,
    year: 0,
    author: {
      id: 0,
      name: '',
      country: ''
    }
  }],
  loading: false,
  loaded: false,
  fail: false
}, action) => {
  const {type, data, status} = action

  switch (type) {
    case LOAD_ALL_BOOKS + START:
      return {...books, loading: true, loaded: false, fail: false}

    case LOAD_ALL_BOOKS + SUCCESS:
      if (status === 200) {
        const entities = data.reduce((acc, cur) => [...acc, {...cur, author: {...cur.author}}], [])

        return {...books, entities, loading: false, loaded: true, fail: false}
      } else if ((status === 400) || (status === 404)) {
        return {...books, loading: false, loaded: false, fail: true}
      }

      return {...books}

    case LOAD_ALL_BOOKS + FAIL:
      return {...books, loading: false, loaded: false, fail: true}
  }

  return books
}
