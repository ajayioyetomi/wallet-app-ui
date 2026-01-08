import { type EachTransactionType, type EachBeneficiaryType } from "./types";


type RandomDateOptions = {
  from?: Date;
  to?: Date;
};

const generateRandomId = () => crypto.randomUUID() as string;

const generateRandomDate = ({
  from = new Date(new Date().setDate(new Date().getDate() - 20)),
  to = new Date(),
}: RandomDateOptions = {}): string => {
  const fromTime = from.getTime();
  const toTime = to.getTime();

  if (fromTime > toTime) {
    throw new Error('"from" date must be earlier than "to" date');
  }

  const randomTime =
    fromTime + Math.random() * (toTime - fromTime);

  return new Date(randomTime).toString() ;
}

const  generateRandomAmount = ():string =>{
    return Math.floor(Math.random() * 10000 + 100) + "." + Math.floor(Math.random() * 100 + 10);
}

const generateRandomTransacitonType = ():"credit" | "debit" =>{
    return ['credit','debit'][Math.floor(Math.random() * 2) || 0] as "debit" | "credit";
}

const  generateRandomName = (): string => {
  const firstNames = [
    'John', 'Jane', 'Alex', 'Emily', 'Michael',
    'Sarah', 'Daniel', 'Olivia', 'David', 'Sophia',
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson',
    'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
  ];

  const first =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const last =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${first} ${last}`;
  return name;
}

const generateBeneficiaryAvatar = (): string =>{
  const index = Math.floor(Math.random() * 4);
  return [
    '/assets/avatar-1.webp','/assets/avatar-2.webp',
    '/assets/avatar-3.webp','/assets/avatar-4.webp'
  ][index] as string
}

const generatePaymentAvatar = (name:string): string =>{
  return `/assets/${name}.webp`
  
}

const generatePaymentDetail = () =>{
    const availableDetails = [
        {
            name:"Amazon",
            description:"Retailer corporation"
        },
        {
            name:"Walmart",
            description:"Retailer corporation"
        },
        {
            name:"Netflix",
            description:"Retailer corporation"
        },
        {
            name:"Nike",
            description:"Retailer corporation"
        },
        {
            name:"The Home Depot",
            description:"Retailer corporation"
        },
        {
            name:"Top up",
            description:"Balance top up"
        }
    ]
    const details = availableDetails[Math.floor(Math.random() * 6)];
    // console.log(details,'details')
    return details;
}

const generatePaymentDetailLabel = () =>{
    const details = generatePaymentDetail();
    return {
        beneficiaryName: details.name,
        beneficiaryDescription:details.description
    }
}

function generateArrayFromItems<EachTransactionType>(
  source: (() => EachTransactionType)[],
  count: number
): EachTransactionType[] {
  if (source.length === 0) {
    throw new Error('Source array cannot be empty');
  }

  return Array.from({ length: count }, () =>
    source[Math.floor(Math.random() * source.length)]()
  );
}

const generateIndividualTransaction = () : EachTransactionType =>{
    return {
      id:generateRandomId(),
      date: generateRandomDate(),
      amount: generateRandomAmount(),
      type: generateRandomTransacitonType(),
      isPayment: false,
      beneficiary:generateBeneficiaryDetails(),
    }
}

const generatePaymentTransaction = () : EachTransactionType =>{
    const paymentDetailsLabel = generatePaymentDetailLabel();
    return {
        id:generateRandomId(),
        date: generateRandomDate(),
        amount: generateRandomAmount(),
        type: paymentDetailsLabel?.beneficiaryName === "Top up" ? "credit" : generateRandomTransacitonType(),
        transactionDescription: paymentDetailsLabel.beneficiaryDescription,
        isPayment: false,
        beneficiary:gneneratePaymentDetails(),
    }
}

function generateSecureAccountNumber(): string {
  const array = new Uint32Array(10);
  crypto.getRandomValues(array);
  return Array.from(array, n => (n % 10).toString()).join("");
}

const generateBeneficiaryDetails = ():EachBeneficiaryType =>{
    const name =  generateRandomName();
    const details:EachBeneficiaryType = {
      id:generateRandomId(),
      name,
      accountName:name,
      accountNumber:generateSecureAccountNumber(),
      avatar: generateBeneficiaryAvatar(),
    }  
    return details; 
}

const gneneratePaymentDetails = ():EachBeneficiaryType =>{
  const paymentDetailsLabel = generatePaymentDetailLabel();
  const name = paymentDetailsLabel.beneficiaryName;
  const details:EachBeneficiaryType = {
    id:generateRandomId(),
    name,
    accountName:name,
    avatar: generatePaymentAvatar(name),
    accountNumber:generateSecureAccountNumber(),
  }
  return details;
}

const generateMultipleBeneficiaryDetails = (length:number = 10) =>{
  let list:EachBeneficiaryType[] = []
  for(let i = 0; i < length; i++){
    list.push(generateBeneficiaryDetails());
  }
  return list;
}


export const sample_transactions: EachTransactionType[] = generateArrayFromItems([generateIndividualTransaction,generatePaymentTransaction],15);

export const sample_beneficiaries: EachBeneficiaryType[] = generateMultipleBeneficiaryDetails();