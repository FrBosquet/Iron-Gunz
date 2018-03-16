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
  color: ${({ theme }) => theme.color.lightRose};
  width: 15%;
`

const ContentSpan = Span.extend`
  width: 85%;
  color: ${({theme}) => theme.color.lightGrey};
`

export const Message = ({author, content, timeStamp}) => (
  <div>
    <AuthorSpan>{author}:</AuthorSpan>
    <ContentSpan>{content}</ContentSpan>
  </div>
)