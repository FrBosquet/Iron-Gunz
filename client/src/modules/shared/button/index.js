import React from 'react'

export const Button = ({label, action, type = 'button'}) => 
  <button
    className='button'
    type={type}
    onClick={action}
  >{label}</button>