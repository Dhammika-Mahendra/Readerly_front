import React, { useEffect, useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';
import { extractIdFromToken } from '../constants/validation';
import { Button, TextField } from '@mui/material';

const BookHeader = ({data,setFilteredData}) => {

  const [display, setDisplay] = useState(false);

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [genere, setGenere] = useState("");

  const [searchdata, setSearchData] = useState("");

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
      name: bookName,
      author: author,
      genre: genere,
      rate :""
    }

    if(extractIdFromToken()==null){
      console.log('please login first');
      return;
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

  const filterData = () => {
    setFilteredData(data.filter(
      (book)=>
        book.name.toLowerCase().includes(searchdata.toLowerCase())||
        book.author.toLowerCase().includes(searchdata.toLowerCase())
      ));
  }

  useEffect(()=>{
    filterData();
  },[searchdata])

  return (
    <div 
      style={{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems: 'center',
        width:'100%',
        position:'fixed',
        top:'50px',
        margin:0,
        backgroundColor:'lightgreen'
      }}
    >
        <div 
          style={{
            display:'flex',
            justifyContent:'flex-end',
            alignSelf:'flex-end'
          }}
        >

        <TextField type="text" size="small" label="Search by Title / Author" onChange={(e)=>setSearchData(e.target.value)} sx={{width:'250px'}}></TextField>
        <Button variant="text" onClick={()=>setDisplay(true)}>Text</Button>

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