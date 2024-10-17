import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import Createpassword from './pages/Auth/Createpassword';

function App() {
  return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/createpassword' element={<Createpassword />} />
   </Routes>
  </BrowserRouter>
  )
}

export default App;
