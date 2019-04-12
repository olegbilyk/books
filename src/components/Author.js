import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { loadAuthor, loadAuthorBook } from '../AC'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import routers from '../routerConfig'
import { arrayToMap } from '../utils'
import Loader from './Loader'

const Ul = styled('ul')`
  margin: 0;
  padding-left: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 35px;

    ::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      margin-top: -1px;
      width: 20px;
      height: 2px;
      background: var(--color-primary-3) linear-gradient(90deg, var(--color-primary-3) 0%, var(--color-primary-2) 100%);
    }

    small {
      display: block;
      margin-top: 5px;
      font-size: 0.7em;
    }

    + li {
      margin-top: 10px;
    }
  }
`

const AuthorWrap = styled('div')`
  h5 {
    margin: 15px 0 5px;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-primary-3);
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  strong {
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--color-primary);
  }
`

const LinkStyle = css`
  margin-top: 50px;
  color: var(--color-link-hover);

  :hover,
  :focus {
    color: var(--color-link);
  }

  :active {
    color: var(--color-link-active);
  }
`

class Author extends Component {
  static propTypes = {
    author: PropTypes.shape({
      entities: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
      }),
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      fail: PropTypes.bool.isRequired
    }),
    authorBook: PropTypes.shape({
      entities: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired
        })
      ),
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      fail: PropTypes.bool.isRequired
    }),
    match: PropTypes.object.isRequired,
    loadAuthor: PropTypes.func.isRequired,
    loadAuthorBook: PropTypes.func.isRequired
  }

  componentDidMount () {
    const {author, authorBook, loadAuthor, loadAuthorBook, match} = this.props
    const authorId = match.params.author_id

    if (!author.loading) loadAuthor(authorId)
    if (!authorBook.loading) loadAuthorBook(authorId)
  }

  render () {
    const {author, authorBook} = this.props
    const {name, country} = author.entities

    const routersMap = arrayToMap(routers)

    const el = authorBook.entities.map(item => (
      <li key={item.id}>
        <p><Link to={`${routersMap.books.path}/${item.id}`}>{item.title}</Link></p>
      </li>
    ))

    if (author.loading) return <Loader />

    return (
      <AuthorWrap>
        <div>
        <p>
          <strong>Author: </strong>{name}
        </p>
        <p>
          <strong>Country: </strong>{country}
        </p>
        </div>
        <div>
        <h5>Books:</h5>
        <Ul>
          {el}
        </Ul>
        </div>
        <Link to={routersMap.authors.path} className={LinkStyle}>Go to the full list of authors</Link>
      </AuthorWrap>
    )
  }
}

export default connect(state => ({
  author: state.author,
  authorBook: state.authorBook
}), {loadAuthor, loadAuthorBook})(Author)
