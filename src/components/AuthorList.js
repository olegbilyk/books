import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { loadAllAuthor } from '../AC'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const Ul = styled('ul')`
  display: grid;
  grid-gap: 20px 30px;
  grid-template-columns: repeat(auto-fill, 340px);
  margin: 0;
  padding-left: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 35px;

    ::before {
      content: '';
      position: absolute;
      top: 15px;
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

class AuthorList extends Component {
  static propTypes = {
    authors: PropTypes.shape({
      entities: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        })
      ),
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      fail: PropTypes.bool.isRequired
    }),
    match: PropTypes.object.isRequired,
    loadAllAuthor: PropTypes.func.isRequired
  }

  componentDidMount () {
    const {authors, loadAllAuthor} = this.props

    if (!authors.loading && !authors.loaded) loadAllAuthor()
  }

  render () {
    const {authors, match} = this.props

    const elements = authors.entities.map((item) => (
      <li key={item.id}>
        <p>
          Author: <Link to={`${match.path}/${item.id}`}>{item.name}</Link>
        </p>
      </li>
    ))

    if (authors.loading) return <Loader />

    return (
      <Ul>
        {elements}
      </Ul>
    )
  }
}

export default connect(state => ({
  authors: state.authors
}), {loadAllAuthor})(AuthorList)
