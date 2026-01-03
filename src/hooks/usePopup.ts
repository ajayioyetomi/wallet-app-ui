import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";


export const usePopup = () => useContext(PopUpContext);