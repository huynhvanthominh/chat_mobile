import { useContext } from "react";
import { signalRContext } from "../providers/signalR.provider";

export const useSignalR = () => {
    return useContext(signalRContext);
}