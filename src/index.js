import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider, Client, dedupExchange, fetchExchange, subscriptionExchange } from "urql"
import { cacheExchange } from "@urql/exchange-graphcache"
import { BrowserRouter } from "react-router-dom"
import { getToken } from "./token"
import { FEED_QUERY } from "./queries/feed-query"
import { SubscriptionClient } from "subscriptions-transport-ws"


const subscriptionClient = new SubscriptionClient(
  "ws://localhost:4000",
  {
    reconnect: true,
    connectionParams: {
      authToken: getToken()
    }
  }
);


const cache = cacheExchange({
  updates: {
    Mutation: {
      post: ({ post }, _args, cache) => {
        const variables = { first: 10, skip: 0, orderBy: "createdAt_DESC" };
        cache.updateQuery({ query: FEED_QUERY, variables }, data => {
          if (data !== null) {
            data.feed.links.unshift(post);
            data.feed.count++;
            return data;
          } else {
            return null;
          }
        });
      }
    },
    Subscription: {
      newLink: ({ newLink }, _args, cache) => {
        const variables = { first: 10, skip: 0, orderBy: 'createdAt_DESC' }
        cache.updateQuery({ query: FEED_QUERY, variables }, data => {
          if (data !== null) {
            data.feed.links.unshift(newLink)
            data.feed.count++
            return data
          } else {
            return null
          }
        })
      }
    }
  }
})


const client = new Client({
  url: "http://localhost:4000",
  fetchOptions: () => {
    const token = getToken()
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    }
  },
  exchanges: [dedupExchange, cache, fetchExchange, subscriptionExchange({
    forwardSubscription: operation => subscriptionClient.request(operation)
  })]
})


ReactDOM.render(
  <BrowserRouter>
     <Provider value={client}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  </BrowserRouter>
 
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
