'use client';
import { useState } from "react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (arg: boolean) => void }) {
    const [sidebarItems, setSidebarItems] = useState<{ id: string, name: string }[]>([]);
    const [value, setValue] = useState<string>('');
    const [newNoteName, setNewNoteName] = useState<boolean>(false);

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                    className="text-xl font-bold text-gray-700 hover:text-red-500"
                    onClick={() => setSidebarOpen(false)}
                >
                    &times;
                </button>
            </div>
            <div className="p-4 space-y-4">
                <button className="w-full text-left text-blue-600 hover:underline" onClick={() => setNewNoteName(true)}>
                    + Add Note
                </button>
                {newNoteName && (
                    <div className="flex items-center space-x-2">
                        <input type="text" placeholder="Enter a note name" value={value} className="flex" onChange={(e) => setValue(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter' && value.trim()) {
                                setSidebarItems(prev => [...prev, { id: Date.now().toString(), name: value.trim() }]);
                                e.currentTarget.value = '';
                                setNewNoteName(false);
                            }
                        }} />
                    </div>
                )}
                {/* Add more sidebar items here */}
                {sidebarItems.length && (
                    <ul>
                        {sidebarItems.map((item, index) => (
                        <li key={index}>{item.name}</li>
                        )
                    )}
                    </ul>
                )}
            </div>
        </div>
    )
}