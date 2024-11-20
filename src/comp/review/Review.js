import React from 'react'

const Review = ({user,review,rate}) => {
  return (
    <div
        style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'lightgray'
        }}
    >
        <h4>{user}</h4>
        <p>{review}</p>
        <p>{rate}</p>
    </div>
  )
}

export default Review