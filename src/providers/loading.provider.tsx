import { createContext, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
interface ILoadingContext {
    setLoading: (loading: boolean, textLoading?: string) => void;
}
const initial: ILoadingContext = {
    setLoading: () => { },
}
export const LoadingContext = createContext(initial);
interface ILoadingProvider {
    children: React.ReactNode;
}
export default function LoadingProvider({
    children,
}: ILoadingProvider) {
    const [loading, setL] = useState(false);
    const [textLoading, setTextLoading] = useState('');
    const setLoading = (loading: boolean, textLoading: string = "Loading...") => {
        setL(loading);
        setTextLoading(textLoading);
    }
    return (
        <LoadingContext.Provider value={{
            setLoading,
        }}>
            <Spinner
                visible={loading}
                textContent={textLoading}
            />
            {children}
        </LoadingContext.Provider>
    )
}