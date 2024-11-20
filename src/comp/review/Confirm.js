import React, { useState } from 'react'
import API_ENDPOINTS from '../../constants/endpoint';

const Confirm = ({id,setDeleteConfirmDisplay}) => {

    const [deleteResponseMessage, setDeleteResponseMessage] = useState("");

    const handleReviewDelete = async (e, id) => {
        const apiUrl = API_ENDPOINTS.POST_REVIEW+`/${id}`;
        e.preventDefault();
        try {
          const response = await fetch(apiUrl, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json", 
            }
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          setDeleteResponseMessage(`Success`);
    
        } catch (err) {
          setDeleteResponseMessage(`Error`);
        }
    
      };

  return (
    <div>
        <p>Are you sure you want to delete</p>
        <button onClick={(e)=>handleReviewDelete(e,id)}>Yes</button>
        <button onClick={()=>setDeleteConfirmDisplay(false)}>No</button>
    </div>
  )
}

export default Confirm