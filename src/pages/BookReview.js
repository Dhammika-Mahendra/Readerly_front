import React, { useEffect, useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';
import { useLocation } from 'react-router-dom';
import Review from '../comp/review/Review';

const BookReview = () => {
    const location = useLocation();
    const { state } = location;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    

  return (
    <div>
        <h2>Review list</h2>
        {data.map((review) => (
            <Review key={review.id} user={review.user} review={review.review} rate={review.rate}/>
        ))}
    </div>
  )
}

export default BookReview