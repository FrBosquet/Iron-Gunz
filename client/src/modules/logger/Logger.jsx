import React from 'react'
import './style.css'
import Box from '../shared/box'

const Logger = ({logs}) =>
  <Box>
    <h1 className="logger-title">Logger</h1>
    {logs.map(log => <div key={log}>{log}</div>)}
  </Box>

export default Logger