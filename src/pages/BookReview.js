import React, { useEffect, useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';
import { useLocation } from 'react-router-dom';
import Review from '../comp/review/Review';
import ReviewForm from '../comp/review/ReviewForm';
import Confirm from '../comp/review/Confirm';

const BookReview = () => {
    const location = useLocation();
    const { state } = location;

    //fetch reviews data=========================
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Review form================================
    const [display, setDisplay] = useState(false);

    //Delete review==============================
    const [deleteId, setDeleteId] = useState("");
    const [deleteConfirmDisplay, setDeleteConfirmDisplay] = useState(false);
  
    useEffect(() => {
      const apiUrl = API_ENDPOINTS.GET_REVIEWS_BY_BOOK_ID+`/${state}`;
  
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    //review deletetion-------------------------
    const initReviewDelete = (id) => {
        setDeleteId(id);
        setDeleteConfirmDisplay(true);
    }

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    

  return (
    <div>
        <div 
            style={{
                display:'flex',
                justifyContent:'space-between',
                backgroundColor:'lightgrey',
                width:'80%',
            }}
        >
            <h2>Review list</h2>
            {!display?<div style={{backgroundColor:'lightcyan',cursor:'pointer'}} onClick={()=>setDisplay(true)}>
                <h2>+</h2>
            </div>:''}
        </div>
        {display?<ReviewForm bookId={state} setDisplay={setDisplay}></ReviewForm>:''}

        {data.map((review) => (
            <Review key={review.id} id={review.id} user={review.user} review={review.review} rate={review.rate} initDelete={initReviewDelete}/>
        ))}

        {deleteConfirmDisplay?<Confirm id={deleteId} setDeleteConfirmDisplay={setDeleteConfirmDisplay}></Confirm>:''}
    </div>
  )
}

export default BookReview