import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useUser } from "../hooks/useUser";
import {HomeIcon,HistoryIcon,CardIcon,MoreIcon} from '../icons';


const Header = () => {
  const {first_name,last_name} = useUser();
  const [active_path, set_active_path] = useState('dashboard');
  const location = useLocation();

  useEffect(()=>{
    const first_path = location.pathname.split('/')[1];
    set_active_path(first_path);
  },[location.pathname])

  return (
    <header className='h-full text-black flex flex-row sm:flex-col justify-content border-gray-150 border-r-0 border-t sm:border-r sm:border-t-0'>
        <div className="w-full hidden sm:flex justify-center md:justify-start text-md font-semibold ">
          <span className="p-2  text-blue-400 hidden md:flex">Welcome,
            <span className="ml-2">
              {first_name.length > 10 ? `${first_name.slice(0,7)}...`: first_name}
            </span>
          </span>
          <span className="hidden sm:flex md:hidden mt-2 justify-center items-center rounded-[50%] w-10 h-10 bg-purple-600 text-md text-white font-semibold">
            {first_name?.charAt(0)}{last_name?.charAt(0)}
          </span>
        </div>
        <ul className="w-full m-0 p-0 sm:mt-4 flex flex-row sm:flex-col justify-between sm:justify-start">
          <li className="flex-1">
            <Link className={`flex flex-col sm:flex-row gap-0 sm:gap-2 items-center p-1 sm:p-2 ${active_path === 'dashboard' ?'border-purple-400':'border-transparent'} border-t-2 sm:border-t-0 sm:border-l-2 sm:justify-center md:justify-start`} to="/dashboard">
              <span>
                <HomeIcon className={`${active_path === "dashboard" ? 'active-menu-icon':'gray-menu-icon'}`} />
              </span>
              <span className={`inline-block sm:hidden md:inline-block text-xs sm:text-sm font-semibold ${active_path === "dashboard" ?'text-purple-400':'text-black'}`}>Home</span>
            </Link>
          </li>
          <li className="flex-1">
            <Link className={`flex flex-col sm:flex-row gap-0 sm:gap-2 items-center text-gray-600 p-1 sm:p-2 ${active_path === 'history' ?'border-purple-400':'border-transparent'}  border-t-2 sm:border-t-0 sm:border-l-2 sm:justify-center md:justify-start`} to="/history">
              <span>
                <HistoryIcon className={`${active_path === "history" ? 'active-menu-icon':'gray-menu-icon'}`} />
              </span>
              <span className={`inline-block sm:hidden md:inline-block text-xs sm:text-sm font-semibold ${active_path === "history" ?'text-purple-400':'text-black'}`}>History</span>
            </Link>
          </li>
          <li className="flex-1">
            <Link className={`flex flex-col sm:flex-row gap-0 sm:gap-2 items-center text-gray-600 p-1 sm:p-2 ${active_path === 'cards' ?'border-purple-400':'border-transparent'}  border-t-2 sm:border-t-0 sm:border-l-2 sm:justify-center md:justify-start`} to="/cards">
              <span>
                <CardIcon className={`${active_path === "cards" ? 'active-menu-icon':'gray-menu-icon'}`} />
              </span>
              <span className={`inline-block sm:hidden md:inline-block text-xs sm:text-sm font-semibold ${active_path === "cards" ?'text-purple-400':'text-black'}`}>
                Cards
              </span>
            </Link>
          </li>
          <li className="flex-1">
            <Link className={`flex flex-col sm:flex-row gap-0 sm:gap-2 items-center text-gray-600 p-1 sm:p-2 ${active_path === 'more' ?'border-purple-400':'border-transparent'}  border-t-2 sm:border-t-0 sm:border-l-2 sm:justify-center md:justify-start`} to="/more">
              <span>
                <MoreIcon className={`${active_path === "more" ? 'active-menu-icon':'gray-menu-icon'}`} />
              </span>
              <span className={`inline-block sm:hidden md:inline-block text-xs sm:text-sm font-semibold ${active_path === "more" ?'text-purple-400':'text-black'}`}>More</span>
            </Link>
          </li>
        </ul>
    </header>
  )
}

export default Header