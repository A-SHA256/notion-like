'use client';
import { loadNotesFromLocalStorage, addNote, selectNote } from "@/slices/notesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
// import type { Note } from "@/types/index";

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (arg: boolean) => void }) {
    const [value, setValue] = useState<string>('');
    const [newNoteName, setNewNoteName] = useState<boolean>(false);
    const { user } = useAppSelector(state => state.auth);
    const { notes } = useAppSelector(state => state.notes);
    const dispatch = useAppDispatch();
    const [notesLoadedFromStorage, setNotesLoadedFromStorage] = useState<boolean>(false);
    
    useEffect(() => {
        const storedNotes = localStorage.getItem(`${user?.uid}-notes`);
        if (storedNotes) {
            const parsedNotes = JSON.parse(storedNotes);
            if (parsedNotes?.byId && parsedNotes?.allIds) {
                dispatch(loadNotesFromLocalStorage(parsedNotes));
            }
            setNotesLoadedFromStorage(true);
        }
    }, [dispatch, user?.uid]);

    useEffect(() => {
        if (user?.uid && notesLoadedFromStorage) {
            localStorage.setItem(`${user.uid}-notes`, JSON.stringify(notes));
        }
    }, [notes, user?.uid, notesLoadedFromStorage]);

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                    className="text-xl font-bold text-gray-700 hover:text-red-500"
                    onClick={() => setSidebarOpen(false)}
                >
                    &times;
                </button>
            </div>
            <div className="p-4 space-y-4">
                <button className="w-full text-left text-blue-600 hover:underline" onClick={() => setNewNoteName(true)}>
                    + Add Note
                </button>
                {newNoteName && (
                    <div className="flex items-center space-x-2">
                        <input type="text" placeholder="Enter a note name" value={value} className="flex" onChange={(e) => setValue(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter' && value.trim()) {
                                const userNote = {
                                    id: `${user?.uid}-${Date.now()}`,
                                    name: value.trim(),
                                    content: '',
                                    createdAt: new Date().toISOString(),
                                    updatedAt: new Date().toISOString(),
                                };
                                dispatch(addNote(userNote));
                                dispatch(selectNote(userNote.id));
                                setValue('');
                                setNewNoteName(false);
                            }
                        }} />
                    </div>
                )}
                {/* Add more sidebar items here */}
                {notes.allIds.length > 0 && (
                    <ul>
                        {notes.allIds.map(id => (
                            <li key={id}>{notes.byId[id].name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}