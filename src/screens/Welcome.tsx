import { useNavigate } from 'react-router-dom';
import Logo from '../icons/splash-logo.svg?react'
const Welcome = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/login')
  }, 3000);
  return (
    <section className="dark:bg-black bg-purple-400 w-screen h-screen flex items-center justify-center">
        <div className={`dark:text-purple-300 text-white text-3xl font-bold origin-center zoom_in_out`}>
          <Logo onClick={() => {navigate('/login')}}/>
        </div>
    </section>
  )
}
export default Welcome