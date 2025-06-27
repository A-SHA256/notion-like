export type Note = {
    id: string;
    name: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export type FormData = {
  email: string;
  password: string;
};
export type AuthState  = {
  user: null | { uid: string; email: string | null; name?: string | null };
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}
