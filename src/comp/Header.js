import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from '../constants/colors'
function Header() {
  return (
    <div 
      style={{
        backgroundColor: Colors.HEADER_BG,
        position: 'fixed',
        width: '100%',
        height:'50px',
        top: 0,
        left :0,
        margin: '0px',
        padding: '0px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft:'20px'
      }}
    >
      <div 
        style={{
          width:'30px',
          height:'30px',
          backgroundImage: `url(/ico.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      >
      </div>
      <Typography variant="h5" style={{paddingLeft: '10px'}}>Readerly</Typography>
    </div>
  )
}

export default Header
