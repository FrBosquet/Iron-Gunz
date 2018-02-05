import React from 'react'
import './style.css'
import { Wrapper } from '../shared'

const Logger = ({logs}) =>
  <Wrapper width='50%'>
    <h1 className="logger-title">Logger</h1>
    <Wrapper className="green-phospor">
      {logs.map(log => <div key={log}>{log}</div>)}
    </Wrapper>
  </Wrapper>

export default Logger