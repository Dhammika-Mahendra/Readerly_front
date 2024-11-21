import React from 'react'

const Review = ({id,userId,uId,review,rate,initDelete,initEdit}) => {


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
            <p>{review}</p>
            <p>{rate}</p>
        </div>
        {userId===uId?<div style={{cursor:'pointer'}}>
            <h4 onClick={()=>initDelete(id)}>x</h4>
            <h4 onClick={()=>initEdit(id,review,rate)}>/</h4>
        </div>:''}
    </div>
  )
}

export default Review