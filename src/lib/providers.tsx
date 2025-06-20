'use client';

import { Provider } from "react-redux";
import type { Store } from "./store"
export default function Providers({ children, store }: {children:React.ReactNode, store: Store}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}