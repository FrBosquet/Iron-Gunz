import React from 'react'
import './style.css'

export const Box = ({ children, width = '100%', className = '' }) =>
  <div className={`box ${className}`} style={{width: `calc(${width} - 42px)`}}>
    { children }
  </div>