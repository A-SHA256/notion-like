export type Note = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export type FormData = {
  email: string;
  password: string;
};
export interface AuthState {
  user: null | { uid: string; email: string | null; name?: string | null };
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
