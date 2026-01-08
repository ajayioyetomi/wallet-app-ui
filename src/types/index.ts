export type UserType = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  password?: string | undefined;
}

export type EachTransactionType = {
  id:string;
  date:string;
  amount:string;
  type: 'debit' | 'credit';
  transactionDescription?:string;
  isPayment?: boolean;
  beneficiary: EachBeneficiaryType;
}

export type EachBeneficiaryType = {
  id: string;
  name:string;
  accountName:string;
  accountNumber:string;
  avatar:string;
}






