import React from 'react'
import { useQuery } from 'urql'
import {Link }from './Link'
import { FEED_SEARCH_QUERY } from "../queries/feed-search-query"

const Search = () => {
//   const [filter, setFilter] = React.useState('')

//   const search = React.useCallback(() => {}, []);
//   const links = []

const [filter, setFilter] = React.useState('')

const [result, executeQuery] = useQuery({
    query: FEED_SEARCH_QUERY,
    variables: { filter },
    pause: true,
  })

  const search = React.useCallback(() => {
    executeQuery();
  }, [executeQuery]);
  
  const links = result.data ? result.data.feed.links : [];
  
  return (
    <div>
      <div>
        Search
        <input
          type='text'
          onChange={e => setFilter(e.target.value)}
        />
        <button onClick={search}>search</button>
      </div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  )
}

export default Search