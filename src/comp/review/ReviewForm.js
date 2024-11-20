import React, { useState } from 'react'
import API_ENDPOINTS from '../../constants/endpoint';

const ReviewForm = ({setDisplay,bookId,userId}) => {

  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    const apiUrl = API_ENDPOINTS.POST_REVIEW;

    const formData = {
      bookId: bookId,
      userId: "673dbb54384db807afd147dc",
      rate: rate,
      review: review,
    }
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setResponseMessage(`Success`);

    } catch (err) {
      setResponseMessage(`Error`);
    }

  };

  return (
    <div>
      <div>
        <h5>Write your review here</h5>
        <input type="text" placeholder="Your name" onChange={(e)=>setReview(e.target.value)}/>
        <input type="number" placeholder="Rate" onChange={(e)=>setRate(e.target.value)}/>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={()=>setDisplay(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default ReviewForm
