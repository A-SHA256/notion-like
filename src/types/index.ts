export interface Note {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface FormData {
  email: string;
  password: string;
};
export interface AuthState {
  user: null | { uid: string; email: string | null; name?: string | null };
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export interface Notes {
  byId: Record<string, Note>;
  allIds: string[];
  selectedNoteId: string | null;
}
export interface NotesState {
  notes: Notes
  loading: boolean;
  error?: string | null;
}