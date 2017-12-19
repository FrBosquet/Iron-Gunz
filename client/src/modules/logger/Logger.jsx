import React from 'react'
import './style.css'

const Logger = ({logs}) =>
  <div className="logger">
    <h1 className="logger-title">Logger</h1>
    {logs.map(log => <div key={log}>{log}</div>)}
  </div>

export default Logger