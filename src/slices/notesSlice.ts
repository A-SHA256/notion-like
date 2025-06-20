import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types/index';

interface NotesState {
  notes: Note[];
  loading: boolean;
  error?: string | null;
}
const initialState: NotesState = {
    notes: [],
    loading: false, 
    error: null
}
const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }

        },
        removeNote: (state, action: PayloadAction<string>) => {
            state.notes.filter(note => note.id !== action.payload);
        },
    }
})

export default noteSlice.reducer;