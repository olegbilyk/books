import { FAIL, LOAD_AUTHOR, START, SUCCESS } from '../constants'

export default (author = {
  entities: {
    id: 0,
    name: '',
    country: ''
  },
  loading: false,
  loaded: false,
  fail: false
}, action) => {
  const {type, data, status} = action

  switch (type) {
    case LOAD_AUTHOR + START:
      return {...author, loading: true, loaded: false, fail: false}

    case LOAD_AUTHOR + SUCCESS:
      if (status === 200) {
        return {...author, entities: {...data}, loading: false, loaded: true, fail: false}
      } else if ((status === 400) || (status === 404)) {
        return {...author, loading: false, loaded: false, fail: true}
      }

      return {...author}

    case LOAD_AUTHOR + FAIL:
      return {...author, loading: false, loaded: false, fail: true}
  }

  return author
}
