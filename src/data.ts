import { type EachTransactionType } from "./types";


type RandomDateOptions = {
  from?: Date;
  to?: Date;
};

const generateRandomId = () => crypto.randomUUID() as string;

const generateRandomDate = ({
  from = new Date(2026, 0, 1),
  to = new Date(2026,2,3),
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

  return `${first} ${last}`;
}

const generateBeneficiaryAvatar = (): string =>{
  return [
    '/assets/avatar-1.webp','/assets/avatar-2.webp',
    '/assets/avatar-3.webp','/assets/avatar-4.webp'
  ][Math.floor(Math.random() * 5)] as string
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

    return availableDetails[Math.random() * 7]
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
        beneficiaryName: generateRandomName(),
        isPayment: false,
        avatar: generateBeneficiaryAvatar(),
    }
}

const generatePaymentTransaction = () : EachTransactionType =>{
    const paymentDetailsLabel = generatePaymentDetailLabel();
    return {
        id:generateRandomId(),
        date: generateRandomDate(),
        amount: generateRandomAmount(),
        type: generateRandomTransacitonType(),
        beneficiaryName: paymentDetailsLabel.beneficiaryName,
        transactionDescription: paymentDetailsLabel.beneficiaryDescription,
        isPayment: false,
        avatar: generatePaymentAvatar(paymentDetailsLabel.beneficiaryName)
    }
}





export const sample_transactions: EachTransactionType[] = generateArrayFromItems([generateIndividualTransaction,generatePaymentTransaction],15)