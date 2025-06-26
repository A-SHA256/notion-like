import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types/index';

interface NotesState {
    notes: {
        byId: Record<string, Note>;
        allIds: string[];
        selectedNoteId: string | null;
    };
    loading: boolean;
    error?: string | null;
}
const initialState: NotesState = {
    notes: {
        byId: {},
        allIds: [],
        selectedNoteId: null,
    },
    loading: false,
    error: null
}
const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            const note = action.payload;
            state.notes.byId[note.id] = note;
            if (!state.notes.allIds.includes(note.id)) {
                state.notes.allIds.push(note.id);
            }
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const note = action.payload;
            if (state.notes.byId[note.id]) {
                state.notes.byId[note.id] = note;
            }
        },
        removeNote: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            delete state.notes.byId[id];
            state.notes.allIds = state.notes.allIds.filter(noteId => noteId !== id);

            // If removed note was selected, reset selection
            if (state.notes.selectedNoteId === id) {
                state.notes.selectedNoteId = null;
            }
        },
        selectNote: (state, action: PayloadAction<string>) => {
            state.notes.selectedNoteId = action.payload;
        }
    }
})
export const { addNote, updateNote, removeNote, selectNote } = noteSlice.actions
export default noteSlice.reducer;