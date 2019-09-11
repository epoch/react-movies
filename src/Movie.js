import React from 'react'

export default function Movie(props) {
  return (
    <div onClick={() => props.onRemove(props.data.imdbID)}>
      <h2>{props.data.Title}</h2>
      <p>{props.data.Year}</p>
    </div>
  )
}