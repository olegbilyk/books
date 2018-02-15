import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

const NotFound = styled('div')`
  text-align: center;

  h2 {
    margin-bottom: 65px;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--color-primary);
  }
`

function NotFoundPage () {
  return (
    <NotFound>
      <h2>Sorry, but page was not found</h2>
      <Link to='/'>Back to home</Link>
    </NotFound>
  )
}

export default NotFoundPage
