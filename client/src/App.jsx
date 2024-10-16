import './App.css'
import {io} from 'socket.io-client'
import {gql, useQuery} from '@apollo/client'

const Hello_Query = gql`
query get{
 hello{
  msg
 }
}
`

function App() {
  const {loading,error,data} = useQuery(Hello_Query);
  let socket = io("http://localhost:8080");



  socket.on('connect',()=>{
    console.log("connected");
  });

  if(loading) return <p>Loading...</p>
  // if(error) return <p>{error}</p>
  if(data){
    console.log(data);
  }
  return (
    <>
    <div>
      Socket connecting
    </div>
    </>
  )
}

export default App
