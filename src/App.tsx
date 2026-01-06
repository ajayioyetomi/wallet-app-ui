import {Routes, Route} from 'react-router-dom'
import PopUpProvider from './contexts/PopUpContext.tsx'
import { Login, Welcome, Password, Dashboard, Register, 
  OTP, History, More, Cards } from './screens';
import { ProtectedRoutes } from './components/index.ts';
import NotificationProvider from './contexts/NotificationContext.tsx';

function App() {


  return (
    <NotificationProvider>
      <PopUpProvider>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/password' element={<Password />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OTP />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/more" element={<More />} />
          </Route>
          </Routes>
      </PopUpProvider>
    </NotificationProvider>
  )
}

export default App
