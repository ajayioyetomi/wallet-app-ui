import { usePopup } from '../hooks/usePopup'
import type { EachTransactionType } from '../types'
import { formatFullDate } from '../utils'
import Button from './Button'

const TransactionDetailsModal = (props:EachTransactionType) => {
  const {setPopUp,setOpen} = usePopup();
  return (
    <div className='w-screen sm:w-114 dark:bg-dark bg-white p-5 rounded-t-2xl sm:rounded-md text-black flex flex-col gap-2'>
        <div className='flex justify-between'>
            <div>
                <img src={props?.beneficiary.avatar} alt={props?.beneficiary.name} />
                <span>
                    <span>{props?.beneficiary.name}</span>
                    <span>{props?.transactionDescription}</span>
                </span>
            </div>
            <Button onClick={()=>{
                setPopUp(<></>)
                setOpen(false)
            }} className='text-blue-700 text-sm'>Done</Button>
        </div>
        <div className='p-3 rounded-lg bg-red-100 text-red-800 font-bold font-3xl text-center'>
            {'$'+ props?.amount}
        </div>
        <div>
            <span></span>
            <span>
                {formatFullDate(props.date)}
            </span>
        </div>
    </div> 
  )
}

export default TransactionDetailsModal