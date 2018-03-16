import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'

export const Form = styled.form`
  background: ${({theme}) => theme.color.darkGrey};
  border: none;
`

Form.displayName = 'Form'

export const ChatForm = Form.extend`
  display: flex;
  justify-content: stretch;
`

ChatForm.displayName = 'ChatForm'

export const Input = ({...props}) => <Field {...props} placeholder='Type message here' style={{
  width: '100%',
  backgroundColor: '#111311',
  border: 'none',
  color: '#999c99',
  padding: '2px',
  fontFamily: '"Share Tech Mono", monospace'
}}/>
