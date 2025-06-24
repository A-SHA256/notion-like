'use client';

import { Provider } from "react-redux";
import type { Store } from "../lib/store"
import AuthListener from "@/components/auth/AuthListener";

export default function Providers({ children, store }: { children: React.ReactNode, store: Store }) {
    return (
        <Provider store={store}>
            <AuthListener>{children}</AuthListener>
        </Provider>
    );
}