import { RefObject } from "react";

interface AddNoteType {
    value: string,
    setValue: (arg: string) => void,
    inputRef: RefObject<HTMLInputElement | null>,
    handleAddNote: () => void
}

export default function AddNewNote({ value, setValue, inputRef, handleAddNote }: AddNoteType) {

    return (
        <div className="flex items-center space-x-2">
            <input
                ref={inputRef}
                type="text"
                value={value}
                placeholder="Note name"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                className="flex-1 px-2 py-1 border rounded"
            />
        </div>
    );
}