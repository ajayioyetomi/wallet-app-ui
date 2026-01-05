import { Link } from "react-router-dom";

import HomeIcon from '../icons/home-icon.svg?react';
import HistoryIcon from '../icons/history-icon.svg?react';
import CardIcon from '../icons/card-icon.svg?react';
import MoreIcon from '../icons/more-icon.svg?react';

const Header = () => {
  const temp_data = JSON.parse(localStorage.getItem('wallet-app-data') || '{}');
  let temp_name = '';
  if(temp_data?.name)temp_name = temp_data?.name;
  const first_name = temp_name.split(' ')[0];
  const last_name = temp_name.split(' ')[1];
  return (
    <header className='h-full text-black flex flex-row sm:flex-col justify-content border-gray-150 border-r-0 border-t-1 sm:border-r-1 sm:border-t-0'>
        <div className="w-full hidden sm:flex justify-center md:justify-start text-md font-semibold ">
          <span className="p-2  text-blue-400 hidden md:flex">Welcome 
            <span className="ml-2">
              {first_name.length > 10 ? `${first_name.slice(0,7)}...`: first_name}
            </span>
          </span>
          <span className="hidden sm:flex md:hidden mt-2 justify-center items-center rounded-[50%] w-[40px] h-[40px] bg-purple-600 text-md text-white font-semibold">
            {first_name.charAt(0)}{last_name.charAt(0)}
          </span>
        </div>
        <ul className="m-0 p-0">
          <li>
            <Link className="flex gap-1 items-center" to="/dashoard">
              <span>
                <HomeIcon />
              </span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link className="flex gap-1 items-center" to="">
              <span>
                <HistoryIcon />
              </span>
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link className="flex gap-1 items-center" to="">
              <span>
                <CardIcon />
              </span>
              <span>
                Cards
              </span>
            </Link>
          </li>
          <li>
            <Link className="flex gap-1 items-center" to="">
              <span>
                <MoreIcon />
              </span>
              <span>More</span>
            </Link>
          </li>
        </ul>
    </header>
  )
}

export default Header