'use client';

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase'
import { useAppDispatch } from "@/lib/hooks";
import { logout, setInitialized, setUser } from "@/slices/authSlice";

export default function AuthListener({children}: {children: React.ReactNode}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid, 
                    name: user.displayName || '',
                    email: user.email || ''
                }))
            } else {
                dispatch(logout())
            }
            dispatch(setInitialized(true));
        });
        return () => unsubscribe();
    }, [dispatch]);
    
    return (
        <>{children}</>
    );
}