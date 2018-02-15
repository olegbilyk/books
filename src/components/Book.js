import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'react-emotion'
import { loadBook } from '../AC'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import routers from '../routerConfig'
import { arrayToMap } from '../utils'
import Loader from './Loader'

const BookWrap = styled('div')`
  h6 {
    margin: 0 0 10px;
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

  small {
    font-size: 0.7em;
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

class Book extends Component {
  static propTypes = {
    book: PropTypes.shape({
      entities: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        pages: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        author: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          country: PropTypes.string.isRequired
        })
      }),
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      fail: PropTypes.bool.isRequired
    }),
    match: PropTypes.object.isRequired,
    loadBook: PropTypes.func.isRequired
  }

  componentDidMount () {
    const {book, loadBook, match} = this.props
    const bookId = match.params.book_id

    if (!book.loading) loadBook(bookId)
  }

  render () {
    const {book} = this.props
    const {title, pages, year, author} = book.entities

    const routersMap = arrayToMap(routers)

    if (book.loading) return <Loader />

    return (
      <BookWrap>
        <h6>
          {title}
        </h6>
        <p>
          <strong>Author: </strong><Link to={`${routersMap.authors.path}/${author.id}`}>{author.name}</Link>
          <small> / {author.country}</small>
        </p>
        <p>
          <strong>Pages: </strong>{pages}
        </p>
        <p>
          <strong>Year: </strong>{year}
        </p>
        <Link to={routersMap.books.path} className={LinkStyle} >Go to the full list of books</Link>
      </BookWrap>
    )
  }
}

export default connect(state => ({
  book: state.book
}), {loadBook})(Book)
