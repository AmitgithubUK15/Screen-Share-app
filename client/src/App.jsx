import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import Createpassword from './pages/Auth/Createpassword';
import PrivateRoute from './components/Auth/PrivateRoute';

import CreateRoom from './pages/Room/CreateRoom';

function App() {
  return (
  <BrowserRouter>
   <Routes>
    
    <Route path='/login' element={<Login />} />

     <Route element={<PrivateRoute />}>
     <Route path="/" element={<Home />} />
     <Route path='/createpassword/:emailId' element={<Createpassword />} />
     <Route path='/room' element={<CreateRoom/>} />
     </Route>
   
   </Routes>
  </BrowserRouter>
  )
}

export default App;
