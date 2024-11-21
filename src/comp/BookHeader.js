import React, { useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';

const BookHeader = () => {

  const [display, setDisplay] = useState(false);

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [genere, setGenere] = useState("");

  const handleCancel=()=>{
    setDisplay(false);
    setBookName("");
    setAuthor("");
    setGenere("");
  }

  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    const apiUrl = API_ENDPOINTS.POST_BOOK;

    let formData = {
      id:0,
      name: bookName,
      author: author,
      genere: genere,
      rate :""
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
    <input type="text" placeholder="Search a book"/>
    <div style={{backgroundColor:'lightcoral', cursor:'pointer'}} onClick={()=>setDisplay(true)}>
      <h2>+</h2>
    </div>
    {display?  
      <div>
      <div>
        <input type="text" placeholder="book name" onChange={(e)=>setBookName(e.target.value)}/>
        <input type="text" placeholder="author" onChange={(e)=>setAuthor(e.target.value)}/>
        <input type="text" placeholder="genere" onChange={(e)=>setGenere(e.target.value)}/>
      </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>:''}
  </div>
  )
}

export default BookHeader