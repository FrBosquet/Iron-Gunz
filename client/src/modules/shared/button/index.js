import React from 'react'

export const Button = ({label, action}) => 
  <button
    className='button'
    onClick={action}
  >{label}</button>