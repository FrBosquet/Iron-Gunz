import React from 'react'
import { Box, Button } from '../shared'
import { Field } from 'redux-form'

const Identity = ({setIdentity, unsetIdentity, formNickname, validatedNickname}) =>
  <Box width='50%'>
    {!validatedNickname ?
      <div>
        <h1>Identity</h1>
        <form onSubmit={e=> e.preventDefault()}>
          <label htmlFor="nickname">Nickname:</label>
          <Field name="nickname" component="input" type="text" />
        </form>
        { formNickname && <Button action={setIdentity} label="Enviar" /> }
      </div> :
      <div>
        <h1>{ validatedNickname }</h1>
        <Button label="unidentify" action={unsetIdentity}/>
      </div>
    }
  </Box>

export default Identity