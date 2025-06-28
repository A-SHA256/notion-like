import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NotesState } from '../types/index';

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
        loadNotesFromLocalStorage: (state, action: PayloadAction<{ byId: Record<string, Note>, allIds: string[] }>) => {
            state.notes.byId = action.payload.byId;
            state.notes.allIds = action.payload.allIds;
        },
        addNote: (state, action: PayloadAction<Note>) => {
            const note = action.payload;
            state.notes.byId[note.id] = note;
            if (!state.notes.allIds.includes(note.id)) {
                state.notes.allIds.push(note.id);
            }
            if (state.notes.selectedNoteId !== note.id) {
                state.notes.selectedNoteId = note.id;
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
        },
        removeAllNotesPermanently: (state) => {
            state.notes.byId = {};
            state.notes.allIds = [];
            state.notes.selectedNoteId = null;
        }, 
        moveNoteToTrashBin: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if(state.notes.byId[id]) {
                state.notes.byId[id].deleted = true;
                state.notes.allIds = state.notes.allIds.filter(noteId => noteId !== id);
            }
        },
        // searchNote: (state, action: PayloadAction<string>) => {
        //     const searchValue = action.payload.toLowerCase();
        //     const filteredNotes = Object.values(state.notes.byId).filter(note => {
        //         return note.name.toLowerCase().includes(searchValue);
        //         //  || note.content.toLowerCase().includes(searchValue)
        //     })
        //     state.notes.allIds = filteredNotes.map(note => note.id);
        //     state.notes.byId = filteredNotes.reduce((acc, note) => {
        //         acc[note.id] = note;
        //         return acc;
        //     }, {});
        // }
    }
})
export const { addNote, updateNote, removeNote, selectNote, loadNotesFromLocalStorage, removeAllNotesPermanently, moveNoteToTrashBin } = noteSlice.actions
export default noteSlice.reducer;