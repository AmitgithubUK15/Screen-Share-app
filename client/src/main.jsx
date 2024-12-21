
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloProvider } from '@apollo/client'
import client from './Apolloclient/Apolloclient.js'

import {Provider} from 'react-redux'
import {store,persistor} from "./store/store.js"
import {PersistGate} from 'redux-persist/integration/react'
import SocketConfig from './context/socketConfig/SocketConfig.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
     <PersistGate persistor={persistor}>
     <ApolloProvider client={client}>
      <SocketConfig>
        <StrictMode>
      <App />
        </StrictMode>
      </SocketConfig>
     </ApolloProvider>
     </PersistGate>
   </Provider>
 
)   
