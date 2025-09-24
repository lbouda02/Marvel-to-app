import React from 'react'

function NumberOfCharacters({ characters }) {
  const count = characters.length

  if (count === 0) {
    return <p>There is no character</p>
  }

  return <p>There is {count} character{count > 1 ? 's' : ''}</p>
}

export default NumberOfCharacters
