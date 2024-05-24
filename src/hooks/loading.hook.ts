import { useContext } from "react";
import { LoadingContext } from "../providers/loading.provider";

export const useLoading = () => {
    const { setLoading } = useContext(LoadingContext);
    return { setLoading };
}