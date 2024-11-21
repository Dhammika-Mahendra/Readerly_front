import React, { useEffect, useState } from 'react'
import Book from '../comp/Book';
import API_ENDPOINTS from '../constants/endpoint'
import { useNavigate } from 'react-router-dom';
import BookHeader from '../comp/BookHeader';

const Home = () => {

    const navigate = useNavigate();

    const handleClick = (data) => {
      navigate('/review', { state: data }); 
    };
  
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const apiUrl = API_ENDPOINTS.GET_ALL_BOOKS
  
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
        <BookHeader></BookHeader>
        {data.map((book) => (
            <Book key={book.id} id={book.id} name={book.name} author={book.author} rate={book.rate} handleClick={handleClick}/>
        ))}
    </div>
  )
}

export default Home