import { loadNotesFromLocalStorage, addNote, moveNoteToTrashBin } from "@/slices/notesSlice";
import { useState, useEffect, useRef } from "react"
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import AddNewNote from "./AddNewNote";
import AddNoteList from "./AddNoteList";
import RemoveAllNotesBtn from "./RemoveAllNotesBtn";

export default function SidebarMini({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (arg: boolean) => void }) {
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

    // Focus Out or On Blur Event to close dropdown menu or add note input while clicking outside
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

    /*
    Following logic is required to preserve and keep notes on each page's refresh and not to lose them
    between refreshes (1* and 2*)
     */

    // 1* Loading and parsing notes from local storage to save them in redux state
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

    // 2* Loading notes from redux state to local storage
    useEffect(() => {
        if (user?.uid && notesLoadedFromStorage) {
            localStorage.setItem(`${user.uid}-notes`, JSON.stringify(notes));
        }
    }, [notes, user?.uid, notesLoadedFromStorage]);
 
    // Adding note to note list
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

    // Filtering notes based on search query
    const filteredNotes = notes.allIds.filter(id =>
        notes.byId[id] &&
        !notes.byId[id].deleted &&
        notes.byId[id].name.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    // For more nice looking and readable code
    const handleDropdownAppearance = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDropDownMenu(prev => (prev === id ? null : id));
    }
    const handleDropdownRemoveBtn = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        dispatch(moveNoteToTrashBin(id))
    }

    return (
        // Layout
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            {/* Header and close sidebar button */}
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

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />

                { /* Add Note Button */}
                <button
                    className="w-full text-left text-green-700 hover:underline"
                    onClick={() => setNewNoteName(true)}
                >
                    + Add Note
                </button>
                
                {/* Note Input Bar */}
                {newNoteName && <AddNewNote value={value} setValue={setValue} inputRef={inputRef} handleAddNote={handleAddNote}/>}
                
                {/* Note List */}
                <AddNoteList filteredNotes={filteredNotes} notes={notes} dropDownMenu={dropDownMenu} dropdownRef={dropdownRef} handleDropdownAppearance={handleDropdownAppearance} handleDropdownRemoveBtn={handleDropdownRemoveBtn}/>

                {/*Remove All Notes Button */}
                <RemoveAllNotesBtn filteredNotes={filteredNotes} sidebarOpen={sidebarOpen} notes={notes}/>
            </div>
        </div>
    )
}