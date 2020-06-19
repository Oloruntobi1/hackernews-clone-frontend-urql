import React  from 'react'
import { useMutation } from "urql"
import { POST_MUTATION } from "../mutations/post-mutation"

export const CreateLink = props => {
    const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');

  const [state, executeMutation] = useMutation(POST_MUTATION);

  const postMutation = React.useCallback(() => {
    executeMutation({ url, description }).then(() => {
      props.history.push('/new/1');
    });
  }, [url, description, executeMutation, props.history]);

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
      <button
        disabled={state.fetching}
        onClick={postMutation}
      >
        Submit
      </button>
    </div>
  );
};

// export default CreateLink