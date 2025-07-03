import { useAppDispatch } from "@/lib/hooks";
import { selectNote } from "@/slices/notesSlice";
import { RefObject } from "react";
import { Notes } from "@/types";
interface AddNoteListType {
    filteredNotes: string[],
    notes: Notes,
    dropDownMenu: string | null,
    dropdownRef: RefObject<HTMLDivElement | null>,
    handleDropdownAppearance: (e: React.MouseEvent, id: string) => void,
    handleDropdownRemoveBtn: (e: React.MouseEvent, id: string) => void,
}

export default function AddNoteList({ filteredNotes, notes, dropDownMenu, dropdownRef, handleDropdownAppearance, handleDropdownRemoveBtn }: AddNoteListType) {
    const dispatch = useAppDispatch();
    return (
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
    );
}