import React, { useState } from 'react'
import API_ENDPOINTS from '../../constants/endpoint';
import { extractIdFromToken } from '../../constants/validation';

const ReviewForm = ({editMode,setDisplay,setEditMode,bookId,userId,rate,review,reviewId}) => {

  const [rateData, setRateData] = useState(rate);
  const [reviewData, setReviewData] = useState(review);
  const [responseMessage, setResponseMessage] = useState("");

  const handleCancel = () => {
    setDisplay(false);
    setEditMode(false);
  }

  const handleSubmit = async (e) => {
    const apiUrl = !editMode?API_ENDPOINTS.POST_REVIEW:API_ENDPOINTS.POST_REVIEW+`/${reviewId}`;

    let formData = {
      rate: rateData,
      review: reviewData,
    }
    const uId=extractIdFromToken()
    if(uId==null){
      console.log('please login first');
      return;
    }
    if(!editMode){
      formData.bookId= bookId;
      formData.userId= uId;
    }

    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: editMode?"PUT":"POST", 
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
        <input type="text"  value={reviewData} placeholder="Your name" onChange={(e)=>setReviewData(e.target.value)}/>
        <input type="number" value={rateData} placeholder="Rate" onChange={(e)=>setRateData(e.target.value)}/>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default ReviewForm
