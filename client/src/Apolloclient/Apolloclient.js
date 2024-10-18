import {ApolloClient} from '@apollo/client';
import { InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri:"http://localhost:8080/graphql",
    cache: new InMemoryCache(),
    credentials:'include'
})

export default client;