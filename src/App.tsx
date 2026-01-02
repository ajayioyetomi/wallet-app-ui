import {Routes, Route} from 'react-router-dom'
import { Login, Welcome } from './screens';

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </>
  )
}

export default App
