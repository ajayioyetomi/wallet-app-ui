import { atom } from 'jotai';
import { type UserType, type EachTransactionType } from './types';
import { sample_transactions } from './data';


const userAtom = atom<UserType>({
    name:'',
    email:'',
    password:''
})

const transactionAtom = atom<EachTransactionType[]>(sample_transactions);


export {userAtom, transactionAtom}