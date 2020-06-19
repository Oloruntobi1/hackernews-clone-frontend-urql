import React, { useState, useCallback } from 'react'
import { useMutation } from "urql"
import { POST_MUTATION } from "../mutations/post-mutation"

export const CreateLink = props => {
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')



    const [ state, executeMutation ] = useMutation(POST_MUTATION)

   
  
//   const submit = useCallback(() => {
//     // ... you'll implement this 🔜




const submit = useCallback(() => {
   
    executeMutation({ url, description })
  }, [executeMutation, url, description])
  



  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button  disabled={state.fetching} onClick={submit}>
        Submit
      </button>
    </div>
  )
}

// export default CreateLink