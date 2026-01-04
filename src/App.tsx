import {Routes, Route} from 'react-router-dom'
import PopUpProvider from './contexts/PopUpContext.tsx'
import { Login, Welcome, Password, Dashboard, Register, OTP } from './screens';

function App() {


  return (
    <PopUpProvider>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/password' element={<Password />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </PopUpProvider>
  )
}

export default App
