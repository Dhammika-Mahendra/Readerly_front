import React from 'react'

const Book = ({id,name,author,rate,handleClick}) => {
  return (
    <div 
        style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            cursor: 'pointer',
        }}
        onClick={()=>handleClick(id)}
    >
        <h3>{name}</h3>
        <h4>{author}</h4>
        <p>{rate}</p>
    </div>
  )
}

export default Book
