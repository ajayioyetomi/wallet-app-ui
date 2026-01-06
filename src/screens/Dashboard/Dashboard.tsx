import { Button } from "../../components";
import ProfileAvatar from '../../assets/profile-avatar.webp';
import SettingsIcon from '../../icons/settings-icon.svg?react';


import TopupIcon from '../../icons/top-up-icon.svg?react';
import WithdrawIcon from '../../icons/withdraw-icon.svg?react';
import TransferIcon from '../../icons/transfer-icon.svg?react';
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className='dark:bg-black bg-white text-black'>
      <div role="section" className="bg-purple-600 p-2 p-4">
        <div role="header" className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src={ProfileAvatar} alt="Avatar" />
            <span className=" flex flex-col text-white font-semibold text-sm">
              <span>Hello,</span>
              <span>Taiwo</span>
            </span>
          </div>
          <Button>
            <SettingsIcon className="white-icon" />
          </Button>
        </div>
        <div className="dashboard-gradient p-2 sm:p-4 rounded-lg mt-2 sm:mt-5">
          <div>
            <p className="text-purple-100 font-thin text-xs text-center sm:text-left">Main balance</p>
            <p className="mt-2 flex items-end sm:justify-start justify-center leader-none text-white font-semibold text-2xl text-center sm:text-left">$14,235 <span className="relative -top-[3px] font-thin text-sm">.34</span></p>
          </div>
          <div className="mt-5 sm:mt-8 sm:mt-4 flex justify-evenly sm:justify-start items-center gap-2">
            <Button className="flex px-3 justify-center items-center flex-col gap-2">
              <TopupIcon className="w-[16px] h-[16px] white-icon" />
              <span className="text-white text-[12px]">Top up</span>
            </Button>
            <Button className="flex px-5 justify-center items-center flex-col gap-2 icon-with-divider ">
              <WithdrawIcon className="w-[16px] h-[16px] white-icon" />
              <span className="text-white text-[12px]">Withdraw</span>
            </Button>
            <Button className="flex px-3 justify-center items-center flex-col gap-2">
              <TransferIcon className="w-[16px] h-[16px] white-icon" />
              <span className="text-white text-[12px]">Transfer</span>
            </Button>
          </div>
        </div>
      </div>
      <div role="section" className="dark:bg-black bg-white p-2 md:p-4">
        <div>
          <p>Recent Transfers</p>
          <div>
            

          </div>
        </div>
        <div>
          <p>
            <span>Latest Transactions</span>
            <Link to="/history">View All</Link>
          </p>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard