
'use client';

import React, { useState, useEffect, useRef } from "react";
import {
    loadNotesFromLocalStorage,
    addNote,
    selectNote,
    moveNoteToTrashBin
} from "@/slices/notesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (arg: boolean) => void }) {
    const [value, setValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');
    const [newNoteName, setNewNoteName] = useState<boolean>(false);
    const [dropDownMenu, setDropDownMenu] = useState<string | null>('');
    const [notesLoadedFromStorage, setNotesLoadedFromStorage] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { user } = useAppSelector(state => state.auth);
    const { notes } = useAppSelector(state => state.notes);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setDropDownMenu(null);
            }
            if (inputRef.current && !inputRef.current.contains(target)) {
                setNewNoteName(false);
            }
        }
        document.addEventListener('mousedown', (e) => handleClickOutside(e));
        return () => document.removeEventListener('mousedown', (e) => handleClickOutside(e));
    }, []);

    useEffect(() => {
        if (!user?.uid) return;

        const storedNotes = localStorage.getItem(`${user.uid}-notes`);
        if (storedNotes) {
            const parsedNotes = JSON.parse(storedNotes);
            if (parsedNotes?.byId && parsedNotes?.allIds) {
                dispatch(loadNotesFromLocalStorage(parsedNotes));
            }
        }

        setNotesLoadedFromStorage(true);
    }, [dispatch, user?.uid]);

    useEffect(() => {
        if (user?.uid && notesLoadedFromStorage) {
            localStorage.setItem(`${user.uid}-notes`, JSON.stringify(notes));
        }
    }, [notes, user?.uid, notesLoadedFromStorage]);

    const handleAddNote = () => {
        if (!value.trim()) return;

        if (notes.allIds.some(id => notes.byId[id]?.name === value.trim())) {
            alert(`Note "${value.trim()}" already exists`);
            return;
        }

        const newNote = {
            id: `${user?.uid}-${Date.now()}`,
            name: value.trim(),
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false
        };

        dispatch(addNote(newNote));
        setValue('');
        setNewNoteName(false);
    };

    const filteredNotes = notes.allIds.filter(id =>
        notes.byId[id] &&
        !notes.byId[id].deleted &&
        notes.byId[id].name.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    const handleDropdownAppearance = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDropDownMenu(prev => (prev === id ? null : id));
    }
    const handleDropdownRemoveBtn = (e: React.MouseEvent, id: string) => { 
        e.stopPropagation(); 
        dispatch(moveNoteToTrashBin(id)) 
    }

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                    className="text-2xl font-bold text-gray-700 hover:text-red-500"
                    onClick={() => setSidebarOpen(false)}
                >
                    &times;
                </button>
            </div>

            <div className="p-4 space-y-4">
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />

                <button
                    className="w-full text-left text-green-700 hover:underline"
                    onClick={() => setNewNoteName(true)}
                >
                    + Add Note
                </button>

                {newNoteName && (
                    <div className="flex items-center space-x-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={value}
                            placeholder="Note name"
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                            className="flex-1 px-2 py-1 border rounded"
                        />
                    </div>
                )}

                <ul className="space-y-2 pt-4 max-h-[300px] overflow-auto justify-content space-between">
                    {filteredNotes.map(id => (
                        <li
                            key={id}
                            className={`flex items-center justify-between px-3 py-2 border border-green-600 rounded cursor-pointer hover:bg-green-50 transition ${notes.selectedNoteId === id ? "bg-green-700 text-white" : ""
                                }`}
                            onClick={() => dispatch(selectNote(id))}
                        >
                            <span className="truncate">{notes.byId[id].name}</span>

                            <button
                                onClick={(e) => handleDropdownAppearance(e, id)}
                                className="text-lg px-2 rounded hover:bg-green-100 focus:outline-none"
                                title="More options"
                            >
                                &#8942;
                            </button>

                            {dropDownMenu === id && (
                                <div
                                    ref={dropdownRef}
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    className='absolute -right-40 z-10 mt-20 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'
                                    onClick={(e) => handleDropdownRemoveBtn(e, id)}
                                >
                                    <ul className="text-sm text-gray-800">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🗑️ Move to Trash</li>
                                    </ul>
                                </div>
                            )}

                        </li>
                    ))}
                </ul>

                {filteredNotes.length > 0 && sidebarOpen && (
                    <button
                        onClick={() => {
                            notes.allIds.forEach(id => {
                                if (notes.byId[id] && !notes.byId[id].deleted) {
                                    dispatch(moveNoteToTrashBin(id));
                                }
                            });
                        }}
                        className="mt-10 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                        Remove All Notes
                    </button>
                )}
            </div>
        </div>
    );
}
