import { RightArrowIcon } from '../icons';
import Button from './Button';

export type TransactionCardProps = {
    avatar:string;
    date:string;
    name:string;
    type:"credit" | "debit"
    amount:string;
    className?:string;
    onClick?: () => void;
}

const TransactionCard = (props:TransactionCardProps) => {
  return (
    <Button className={`w-full py-4 border-gray-100 flex items-center justify-between cursor-pointer ${props?.className}`}>
        <div className='flex gap-2 items-center'>
            <img src={props.avatar} className='w-8 h-8'/>
            <span className='flex items-start flex-col text-xs gap-0.5'>
                <span className='font-semibold text-black'>{props.name}</span>
                <span className='font-thin text-gray-300'>{props.date}</span>
            </span>
        </div>
        <div className='flex gap-1 items-center text-xs'>
            <span className={`${props?.type === 'debit' ? 'text-red-700' : 'text-green-700' }`}>{props.amount}</span>
            <RightArrowIcon />
        </div>
    </Button>
  )
}

export default TransactionCard