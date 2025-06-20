'use client';

import type { RootState, AppDispatch } from "./store";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();