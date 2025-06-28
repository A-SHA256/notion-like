'use client';
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
export default function SearchBar() {
    const [searchValue, setSearchValue] = useState<string>('');
    const { notes } = useAppSelector(state => state.notes);
    const handleNoteSearch = (e: React.FormEvent) => {
        e.preventDefault();

    }
    return (
        <div>
            <input type="text" placeholder="Search a note" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button type="submit" onSubmit={handleNoteSearch}>Search</button>
        </div>
);
}