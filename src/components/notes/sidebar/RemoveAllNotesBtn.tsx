import { moveNoteToTrashBin } from "@/slices/notesSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Notes } from "@/types"

interface RemoveBtnType {
    filteredNotes: string[],
    sidebarOpen: boolean,
    notes: Notes
}
export default function RemoveAllNotesBtn({ filteredNotes, sidebarOpen, notes }: RemoveBtnType) {
    const dispatch = useAppDispatch();
    return (
        <>
            {
                filteredNotes.length > 0 && sidebarOpen && (
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
                )
            }
        </>
    );
}