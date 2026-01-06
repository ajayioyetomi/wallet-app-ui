export type UserType = {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export type EachTransactionType = {
  id:string;
  date:string;
  amount:string;
  type: 'debit' | 'credit';
  beneficiaryName?: string;
  beneficiaryDescription?: string,
  transactionDescription?:string,
  isPayment?: boolean,
  avatar: string,
}






