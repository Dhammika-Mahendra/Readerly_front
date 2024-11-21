import React from 'react'
import { Colors } from '../../constants/colors'
import { IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Review = ({id,userId,uId,review,rate,initDelete,initEdit}) => {


  return (
    <div
        style={{
            borderBottomWidth:'1px',
            borderBottomStyle:'solid',
            borderBottomColor:Colors.DIVIDER,
            padding: '10px',
            margin: '10px 10px 10px 10px',
            position:'relative'
        }}
    >
        <div>
            <p>{`by ${userId}`}</p>
            <Typography variant='p'>{review}</Typography>
        </div>
        {userId===uId?
            <div 
                style={{
                    cursor:'pointer',
                    position :'absolute',
                    top:'5px',
                    right:'2px'

                }}
            >
                <IconButton onClick={()=>initEdit(id,review,rate)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={()=>initDelete(id)}>
                    <DeleteForeverIcon />
                </IconButton>
        </div>:''}
    </div>
  )
}

export default Review