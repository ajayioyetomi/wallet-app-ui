import { useAtom } from "jotai";
import { transactionAtom, beneficiaryAtom } from "../store";
import { type EachBeneficiaryType, type EachTransactionType } from "../types";



export const useData = () =>{
    const [transactions, setTransaction] = useAtom<EachTransactionType[]>(transactionAtom);
    const [beneficiaries, setBeneficiaries] = useAtom<EachBeneficiaryType[]>(beneficiaryAtom);
    return {
        transactions,
        beneficiaries,
        setTransaction,
        setBeneficiaries,
    }
}