import React, { useEffect, useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';
import { useLocation } from 'react-router-dom';
import Review from '../comp/review/Review';
import ReviewForm from '../comp/review/ReviewForm';
import Confirm from '../comp/review/Confirm';
import { extractIdFromToken } from '../constants/validation';

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

    //Edit review================================
    const [editId, setEditId] = useState("");
    const [editReview, setEditReview] = useState("");
    const [editRate, setEditRate] = useState("");
    const [editMode, setEditMode] = useState(false);

    //login check===============================
    const [uId, setUId] = useState(extractIdFromToken());
  
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

    //review edit-------------------------------
    const initEdit = (id,review,rate) => {
        setEditId(id);
        setEditReview(review);
        setEditRate(rate);
        setEditMode(true);
        setDisplay(true);
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
        {display&&!editMode?<ReviewForm editMode={editMode} bookId={state} setDisplay={setDisplay} setEditMode={setEditMode} rate={0} review="" reviewId=""></ReviewForm>:''}
        {display&&editMode?<ReviewForm editMode={editMode} bookId={state} setDisplay={setDisplay} setEditMode={setEditMode} rate={editRate} review={editReview} reviewId={editId}></ReviewForm>:''}

        {data.map((review) => (
            <Review key={review.id} id={review.id} userId={review.userId} uId={uId} review={review.review} rate={review.rate} initDelete={initReviewDelete} initEdit={initEdit}/>
        ))}

        {deleteConfirmDisplay?<Confirm id={deleteId} setDeleteConfirmDisplay={setDeleteConfirmDisplay}></Confirm>:''}
    </div>
  )
}

export default BookReview