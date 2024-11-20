import React from 'react'

const Review = ({id,user,review,rate,initDelete}) => {


  return (
    <div
        style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'lightgray'
        }}
    >
        <div>
            <h4>{user}</h4>
            <p>{review}</p>
            <p>{rate}</p>
        </div>
        <div style={{cursor:'pointer'}} onClick={()=>initDelete(id)}>
            <h4>x</h4>
        </div>
    </div>
  )
}

export default Review