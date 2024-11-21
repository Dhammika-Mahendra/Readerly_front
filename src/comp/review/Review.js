import React from 'react'

const Review = ({id,user,review,rate,initDelete,initEdit}) => {


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
        <div style={{cursor:'pointer'}}>
            <h4 onClick={()=>initDelete(id)}>x</h4>
            <h4 onClick={()=>initEdit(id,review,rate)}>/</h4>
        </div>
    </div>
  )
}

export default Review