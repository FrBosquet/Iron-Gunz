import React from 'react'
import './style.css'
import { Box } from '../shared'

const Logger = ({logs}) =>
  <Box width='50%'>
    <h1 className="logger-title">Logger</h1>
    {logs.map(log => <div key={log}>{log}</div>)}
  </Box>

export default Logger