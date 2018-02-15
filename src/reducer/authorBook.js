import { LOAD_AUTHOR_BOOK, START, SUCCESS, FAIL } from '../constants'

export default (authorBook = {
  entities: [{
    id: 0,
    title: '',
    country: ''
  }],
  loading: false,
  loaded: false,
  fail: false
}, action) => {
  const {type, data, status} = action

  switch (type) {
    case LOAD_AUTHOR_BOOK + START:
      return {...authorBook, loading: true, loaded: false, fail: false}

    case LOAD_AUTHOR_BOOK + SUCCESS:
      if (status === 200) {
        const entities = data.reduce((acc, cur) => [...acc, {...cur}], [])

        return {...authorBook, entities, loading: false, loaded: true, fail: false}
      } else if ((status === 400) || (status === 404)) {
        return {...authorBook, loading: false, loaded: false, fail: true}
      }

      return {...authorBook}

    case LOAD_AUTHOR_BOOK + FAIL:
      return {...authorBook, loading: false, loaded: false, fail: true}
  }

  return authorBook
}
