import { FAIL, LOAD_ALL_AUTHORS, START, SUCCESS } from '../constants'

export default (authors = {
  entities: [{
    id: 0,
    name: ''
  }],
  loading: false,
  loaded: false,
  fail: false
}, action) => {
  const {type, data, status} = action

  switch (type) {
    case LOAD_ALL_AUTHORS + START:
      return {...authors, loading: true, loaded: false, fail: false}

    case LOAD_ALL_AUTHORS + SUCCESS:
      if (status === 200) {
        const entities = data.reduce((acc, cur) => [...acc, {id: cur.id, name: cur.name}], [])

        return {...authors, entities, loading: false, loaded: true, fail: false}
      } else if ((status === 400) || (status === 404)) {
        return {...authors, loading: false, loaded: false, fail: true}
      }

      return {...authors}

    case LOAD_ALL_AUTHORS + FAIL:
      return {...authors, loading: false, loaded: false, fail: true}
  }

  return authors
}
