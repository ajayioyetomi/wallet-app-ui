import React from 'react'
import type { EachTransactionType } from '../types'
import Button from './Button'

const TransactionDetailsModal = (props:EachTransactionType) => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='flex justify-between'>
            <div>
                <img src={props?.beneficiary.avatar} alt={props?.beneficiary.name} />
                <span>
                    <span>{props?.beneficiary.name}</span>
                    <span>{props?.transactionDescription}</span>
                </span>
            </div>
            <Button className='text-blue-700 text-sm'>Done</Button>
        </div>
        <div className='p-3 rounded-lg bg-red-100 text-red-800 font-bold font-3xl text-center'>
            {'$'+ props?.amount}
        </div>
        <div>
            <span></span>
            <span></span>
        </div>
    </div> 
  )
}

export default TransactionDetailsModal