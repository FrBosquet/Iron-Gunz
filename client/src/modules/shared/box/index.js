import React from 'react'
import './style.css'

export const Box = ({ children, width = '100%' }) =>
  <div className='box' style={{width: `calc(${width} - 42px)`}}>
    { children }
  </div>