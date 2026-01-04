import {Routes, Route} from 'react-router-dom'
import { Login, Welcome, Password, Dashboard, Register } from './screens';

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/login' element={<Login />} />
      <Route path='/password' element={<Password />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
    </>
  )
}

export default App
