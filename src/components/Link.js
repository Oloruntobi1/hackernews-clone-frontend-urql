import React from "react"
import { getToken } from '../token'
import { timeDifferenceForDate } from '../dates'
import { useMutation } from 'urql'
import { VOTE_MUTATION } from "../mutations/vote-mutation"

export const Link = ({index, link}) => {
    const isLoggedIn = !!getToken()
    

    const [state, executeMutation] = useMutation(VOTE_MUTATION);

    const upvote = React.useCallback(() => {
      if (!state.fetching) {
        executeMutation({ linkId: link.id });
      }
    }, [state.fetching, executeMutation, link.id]);
      
    
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{index + 1}.</span>
          {isLoggedIn && (
            <div className="ml1 gray f11" onClick={upvote}>
              ▲
            </div>
          )}
        </div>
        <div className="ml1">
          <div>
            {link.description} ({link.url})
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy
              ? link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        </div>
      </div>
    )
  }