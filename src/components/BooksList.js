import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { loadAllBooks } from '../AC'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import routers from '../routerConfig'
import { arrayToMap } from '../utils'
import Loader from './Loader'

const Ul = styled('ul')`
  display: grid;
  grid-gap: 20px 30px;
  grid-template-columns: repeat(auto-fill, 330px);
  margin: 0;
  padding-left: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 35px;
    font-size: 20px;
    line-height: 1.24;

    ::before {
      content: '';
      position: absolute;
      top: 22px;
      left: 0;
      display: block;
      width: 20px;
      height: 2px;
      background: var(--color-primary-3) linear-gradient(90deg, var(--color-primary-3) 0%, var(--color-primary-2) 100%);
    }

    p {
      margin: 0;
    }

    small {
      display: block;
      margin-top: 5px;
      font-size: 0.7em;
    }
  }
`

class BooksList extends Component {
  static propTypes = {
    books: PropTypes.shape({
      entities: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          pages: PropTypes.number.isRequired,
          year: PropTypes.number.isRequired,
          author: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired
          })
        })
      ),
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      fail: PropTypes.bool.isRequired
    }),
    match: PropTypes.object.isRequired,
    loadAllBooks: PropTypes.func.isRequired
  }

  componentDidMount () {
    const {books, loadAllBooks} = this.props

    if (!books.loading && !books.loaded) loadAllBooks()
  }

  render () {
    const {books, match} = this.props

    const routersMap = arrayToMap(routers)

    const elements = books.entities.map((item) => (
      <li key={item.id}>
        <p>
          <Link to={`${match.path}/${item.id}`}>{item.title}</Link>
          <small>
            Author: <Link to={`${routersMap.authors.path}/${item.author.id}`}>{item.author.name}</Link>
          </small>
        </p>
      </li>
    ))

    if (books.loading) return <Loader />

    return (
      <Ul>
        {elements}
      </Ul>
    )
  }
}

export default connect(state => ({
  books: state.books
}), {loadAllBooks})(BooksList)
