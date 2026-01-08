import { useAtom } from "jotai";
import { userAtom } from "../store";
import { type UserType } from "../types";


export const useUser = () =>{
    const [userData, setUserData] = useAtom<UserType>(userAtom);
    return {
        first_name: userData && userData.name && userData.name.split(' ')[0] || 'Guest',
        last_name: userData && userData.name && userData?.name.split(' ')[1] || "",
        userData,
        setUserData,
    }
}