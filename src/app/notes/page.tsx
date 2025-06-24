'use client';

import LogoutBtn from "@/components/notes/LogoutBtn";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotesPage() {
    const router = useRouter();
    const { user, isInitialized } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isInitialized && !user) {
            console.log('User is not authenticated. Redirecting to sign-in page...');
            router.push('/auth/sign-in');
        }
    }, [user, router, isInitialized])

    if (!user) return null;

    return (
        <div>
            Notes Page {user?.uid}
            <LogoutBtn />
        </div>
    );
}