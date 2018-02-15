import React from 'react'
import styled from 'react-emotion'
import {Link} from 'react-router-dom'

const Error = styled('div')`
  text-align: center;

  h2 {
    margin-bottom: 65px;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--color-primary);
  }
`

function ErrorPage () {
  return (
    <Error>
      <h2>Service is temporary unavailable</h2>
      <Link to='/' >Back to home</Link>
    </Error>
  )
}

export default ErrorPage
