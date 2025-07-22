export default function EditorBar ({ boldText, italicText }: { boldText:() => void, italicText: () => void }) {

    return (
        <div className="flex justify-evenly items-center cursor-pointer mb-10 border-2 border-solid border-black">
            <button onClick={boldText} className="border-2 border-solid border-black {}">
                Bold
            </button>

            <button onClick={italicText} className="border-2 border-solid border-black">
                Italic
            </button>
        </div>
    );
}