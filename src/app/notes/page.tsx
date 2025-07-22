'use client';

import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/notes/header/Header";
import SidebarMini from "@/components/notes/sidebar/SidebarMini";
// import NoteEditor from "@/components/notes/NoteEditor";
import Edi2or from "@/components/notes/Edi2or";

export default function NotesPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, isInitialized } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isInitialized && !user) {
            router.push('/auth/sign-in');
        }
    }, [user, router, isInitialized]);

    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <SidebarMini sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/> */}
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Header email={user.email} setSidebarOpen={setSidebarOpen} />

                <main className="p-6 flex justify-center items-center flex-col">
                    <h1 className="text-2xl font-semibold mb-4">Welcome to Notes</h1>
                    {/* Add main content here */}
                    {/* <NoteEditor /> */}
                    <Edi2or />
                </main>
            </div>
        </div>
    );
}
