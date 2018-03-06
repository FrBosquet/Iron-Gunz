import React from 'react'
import styled from 'styled-components'

const Span = styled.span`
  box-sizing: border-box;
  padding: 5px;
  display: inline-block;
`

const AuthorSpan = Span.extend`
  overflow-x: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  color: magenta;
  width: 15%;
`

const ContentSpan = Span.extend`
  width: 75%;
  color: wheat;
`

const TimestampSpan = Span.extend`
  width: 10%;
`

export const Message = ({author, content, timeStamp}) => (
  <div key={`${author + content + timeStamp}`}>
    <AuthorSpan>{author}:</AuthorSpan>
    <ContentSpan>{content}</ContentSpan>
    <TimestampSpan>{timeStamp}</TimestampSpan>
  </div>
)