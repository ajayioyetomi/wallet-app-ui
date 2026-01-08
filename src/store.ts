import { atom } from 'jotai';
import { type UserType, type EachTransactionType, type EachBeneficiaryType } from './types';
import { sample_transactions, sample_beneficiaries } from './data';

const data = JSON.parse(localStorage.getItem('wallet-app-data') || '{}');
const userAtom = atom<UserType>({
    name: data?.name || '',
    email:data?.email || '',
    phone:data?.phone || ''
})

const transactionAtom = atom<EachTransactionType[]>(sample_transactions);
const beneficiaryAtom = atom<EachBeneficiaryType[]>(sample_beneficiaries);


export {userAtom, transactionAtom, beneficiaryAtom}