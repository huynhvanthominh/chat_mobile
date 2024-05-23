import { useContext } from "react";
import { signalRContext } from "../providers/signalR";

export const useSignalR = () => {
    return useContext(signalRContext);
}