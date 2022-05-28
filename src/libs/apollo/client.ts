import {
  ApolloClient,
  ApolloLink, HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'

const config = {
  url: 'https://api-dev.foodstyles.com/graphql',
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMxLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjUzNzQ3MzQ2LCJleHAiOjE2NTQzNTIxNDZ9.E2ev4kkmSIxA6igc4W2GgFjgDdV6dqQbdNZWVbiiK-vUnim8TzOrzMclArSdHO0QRBg_nGimOlqL3elxtgGV4_yBExzU6rx78ev3CvU8hwULMQbwYFlrRB5MonWhIsOWzgcA4sGhkjv1rgjTrk3vwy8g0MATrxhkCriaCSqVg1JuF198Bv2EVXbzSB58rFJIG9zj7nWBACrOnmBeJCfERAxcjS1b0Cq6zktxD-0Xnesr5gJJTEr1Gdvem9yYuKkCN-aZOZy63HfESKTWr7IoE4ovSttELGNizKU65FlIB-YzX5Xt2OJhZchG3IB1M7VQnLj3Rt85lvtZ6IMWmv3oJA'
}

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log(
      `${networkError.message ||
      `Error occurred: ${networkError.message}`
      }`
    )
  }
})

// Create an http link:
const getHttpLink = () => {
  return new HttpLink({
    uri: config.url,
    fetch,
  })
}

const authLink = setContext((_, { headers }) => {
  const clientHeaders = {
    ...headers,
    Authorization: `Bearer ${config.token}`
  }
  return { headers: clientHeaders }
})

const httpLink = ApolloLink.from([errorLink, authLink, getHttpLink()])

const initClient = () => {
  const link = split(
    ({ query }) => {
      const { kind } = getMainDefinition(query)
      return kind === 'OperationDefinition'
    },
    httpLink,
  )

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  });
}

export default initClient