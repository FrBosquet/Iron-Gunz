import React from 'react'
import { PhosporScreen, Wrapper } from '../shared'

const Logger = ({logs}) =>
  <Wrapper width='50%'>
    <h1 className="logger-title">Logger</h1>
    <PhosporScreen>
      {logs.map(log => <div key={log}>{log}</div>)}
    </PhosporScreen>
  </Wrapper>

export default Logger