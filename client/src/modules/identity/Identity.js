import React from 'react'
import { Wrapper, Button } from '../shared'
import { Field } from 'redux-form'

const Identity = ({setIdentity, unsetIdentity, formNickname, validatedNickname}) =>
  <Wrapper width='50%'>
    {!validatedNickname ?
      <div>
        <h1>Identity</h1>
        <form onSubmit={e=> e.preventDefault()}>
          <label htmlFor="nickname">Nickname:</label>
          <Field name="nickname" component="input" type="text" />
        </form>
        { formNickname && <Button onClick={setIdentity}>Send</Button> }
      </div> :
      <div>
        <h1>{ validatedNickname }</h1>
        <Button back onClick={unsetIdentity}>Unidentify</Button>
      </div>
    }
  </Wrapper>

export default Identity