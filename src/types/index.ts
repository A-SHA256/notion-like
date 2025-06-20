export type Note = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
  user: null | { uid: string; email: string | null };
  loading: boolean;
  error?: string | null;
}