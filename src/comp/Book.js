import React from 'react'

const Book = ({name,author,rate}) => {
  return (
    <div 
        style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px'
        }}
    >
        <h3>{name}</h3>
        <h4>{author}</h4>
        <p>{rate}</p>
    </div>
  )
}

export default Book
