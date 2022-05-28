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
  'token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMxLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjUzNzIyODUwLCJleHAiOjE2NTQzMjc2NTB9.P2QZNFe270vbJdkgbSCW8axgBAEASDE64t0ocTf8n-Vev0HO7XeBAnSBQXG2rseCANA7fOfqksiEIeNxk2MA4GPaDBORwIzaqbBBOHDgcF1DdA0enwXrbs_M1D70VPwtDp2zvwFU0rFIwhmuUPhUnouSVNisaEmVbo7MJStWgjVZ2HyX_51OOXq-lf7XsS2kzOfqvghdNgQZPDBxJVKTHrfkeFSL1s3MxsdroBvg42RkQNVlW-YCtDs96hf1F-SCEG-noSTxZg1xR0Xb20SQzZPcuM3KT-8Lpc5DPMDYdczEBLK05gg8ccksmtgyabLWbXVi4l4SIyQeC2DlbjixLg'
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
const gethttpLink = () => {
  return new HttpLink({
    uri: 'https://api-dev.foodstyles.com/graphql',
    fetch,
  })
}

const authLink = setContext((_, { headers }) => {
  const requestHeader = { ...headers }
  requestHeader['Authorization'] = `Bearer ${config.token}`
  return { headers: requestHeader }
})

const httpLink = ApolloLink.from([errorLink, authLink, gethttpLink()])

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