import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState, store } from ".";
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
