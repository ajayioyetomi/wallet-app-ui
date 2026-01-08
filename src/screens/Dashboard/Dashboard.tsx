import { Button } from "../../components";
import ProfileAvatar from '../../assets/profile-avatar.webp';
import SettingsIcon from '../../icons/settings-icon.svg?react';
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useData } from "../../hooks/useData";
import { usePopup } from "../../hooks/usePopup";
import {TransactionCard,TransactionDetailsModal} from "../../components";
import type { EachBeneficiaryType, EachTransactionType } from "../../types";
import { formatDate } from "../../utils";

import {TopupIcon, WithdrawIcon, TransferIcon, PlusIcon} from '../../icons';





const Dashboard = () => {
  const {first_name} = useUser();
  const {beneficiaries,transactions} = useData();
  const {setOpen,setPopUp} = usePopup();
  const uniqueBeneficiaries = beneficiaries.filter((eachBeneficiary:EachBeneficiaryType, index:number) => {
    if(index === 0) return true;
    let already_exist = beneficiaries.slice(0,index).some((each:EachBeneficiaryType) => each.name.split(' ')[0] === eachBeneficiary.name.split(' ')[0])
    return !already_exist
  } )
  const formated_transactions = transactions.map((eachTransaction:EachTransactionType) => {
    const formated_date = formatDate(eachTransaction.date);
    return{
      ...eachTransaction,
      date:formated_date,
    }
  })

  const showTransactionPopUp = (transaction:EachTransactionType) =>{
    setPopUp(<TransactionDetailsModal {...transaction}   />);
    setOpen(true)
  }


  // ?.reduce((accu:[EachTransactionType[],EachTransactionType[],EachTransactionType[]],next:EachTransactionType):[EachTransactionType[],EachTransactionType[],EachTransactionType[]] => {
  //   const date = next.date;
  //   if(date.toLowerCase().includes('today')){
  //     if(accu[0] && Array.isArray(accu[0]))
  //      accu[0].push(next);
  //     else{
  //       accu[0] = [next];
  //     }
  //   }
  //   else if(date.toLowerCase().includes('yesterday')){
  //     if(accu[1] && Array.isArray(accu[1]))
  //     accu[0].push(next);
  //     else{
  //       accu[0] = [next];
  //     }
  //   }
  //   else{
  //     if(accu[2] && Array.isArray(accu[2]))
  //     accu[2].push(next);
  //     else accu[2] = [next];
  //   }
  //   return accu;
  // },[[],[],[]])

  
  return (
    <div className='dark:bg-black bg-white text-black'>
      <div role="section" className="bg-purple-600 p-2 sm:p-4">
        <div role="header" className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src={ProfileAvatar} alt="Avatar" />
            <span className=" flex flex-col text-white font-semibold text-sm">
              <span>Hello,</span>
              <span>{first_name}</span>
            </span>
          </div>
          <Button>
            <SettingsIcon className="white-icon" />
          </Button>
        </div>
        <div className="dashboard-gradient p-2 py-4 sm:py-6 sm:p-4 rounded-lg mt-3 sm:mt-5">
          <div>
            <p className="text-purple-100 font-thin text-xs text-center sm:text-left">Main balance</p>
            <p className="mt-2 flex items-end sm:justify-start justify-center leader-none text-white font-semibold text-2xl text-center sm:text-left">$14,235 <span className="relative -top-1 font-thin text-sm">.34</span></p>
          </div>
          <div className="mt-5 md:mt-8 sm:mt-4 flex justify-evenly sm:justify-start items-center gap-2">
            <Button className="flex px-3 justify-center items-center flex-col gap-2 cursor-pointer">
              <TopupIcon className="w-4 h-4 white-icon" />
              <span className="text-white text-[12px]">Top up</span>
            </Button>
            <Button className="flex px-5 justify-center items-center flex-col gap-2 icon-with-divider cursor-pointer">
              <WithdrawIcon className="w-4 h-4 white-icon" />
              <span className="text-white text-[12px]">Withdraw</span>
            </Button>
            <Button className="flex px-3 justify-center items-center flex-col gap-2 cursor-pointer">
              <TransferIcon className="w-4 h-4 white-icon" />
              <span className="text-white text-[12px]">Transfer</span>
            </Button>
          </div>
        </div>
      </div>
      <div role="section" className="dark:bg-black bg-white p-2 md:p-4">
        <div className="mt-4">
          <p className="mb-3 text-sm font-semibold">Recent Transfers</p>
          <div className="flex gap-3 items-center overflow-auto no-x-scroll">
            <Button className="flex flex-col justify-between items-center gap-2 shrink-0 cursor-pointer">
              <span className="flex w-12 h-12 justify-center items-center  rounded-full p-0 bg-purple-100"><PlusIcon /></span>  
              <span className="text-xs">Add</span>          
            </Button>
            {
              beneficiaries && beneficiaries.length > 9 ?
              uniqueBeneficiaries?.map((eachBeneficiary:EachBeneficiaryType) => 
              <Button key={eachBeneficiary.id} className="flex flex-col justify-between gap-2 items-center shrink-0 cursor-pointer ">
                <img className="w-12 h-12 rounded-full" src={eachBeneficiary.avatar} alt={eachBeneficiary.name} title={eachBeneficiary.name} />
                <span className="text-xs">{eachBeneficiary.name.split(' ')[0]}</span>
              </Button>) :
              <></>
            }
          </div>
        </div>
        <div className="mt-8">
          <p className="font-semibold text-sm flex justify-between items-center">
            <span>Latest Transactions</span>
            <Link className="text-gray-300 font-light" to="/history">View All</Link>
          </p>
          <div>
            {
              formated_transactions && formated_transactions.length > 0 ? 
              formated_transactions.map((eachTransaction:EachTransactionType,index:number) => 
                <TransactionCard 
                    onClick={()=>showTransactionPopUp(eachTransaction)}
                    key={eachTransaction.id} name={eachTransaction.beneficiary.name}
                    avatar={eachTransaction.beneficiary.avatar} type={eachTransaction.type}
                    date={eachTransaction.date} amount={eachTransaction.amount} 
                    className={index === formated_transactions.length -1 ?'':'border-b'}
                  />
              ):
              <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard