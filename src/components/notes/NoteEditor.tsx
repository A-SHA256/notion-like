import { useState, useEffect, useRef } from "react";
import EditorBar from "./EditorBar";

interface FormatObj {
    id: string,
    format: string,
    text: string | undefined
}

interface SpanCollection {
    [id: string]: HTMLSpanElement
}

export default function NoteEditor() {
    const [content, setContent] = useState<string | undefined | null>('');
    const [bold, setBold] = useState<boolean>(false);
    const [parentChecker, setParentChecker] = useState<boolean>(false);
    const [selectedText, setSelectedText] = useState<string | undefined>('');
    const [formattedText, setFormattedText] = useState<FormatObj[]>([]);
    const [spansCollection, setSpansCollection] = useState<SpanCollection>({});

    const editorRef = useRef<HTMLDivElement | null>(null);

    const clearContent = () => {
        setContent('');
    }

    useEffect(() => {
        const selection = window.getSelection();
        console.log(selection);

        const editor = document.getElementById('editor');

        if (selection && selection?.rangeCount <= 0) return
        const range = selection?.getRangeAt(0);

        console.log(editor, typeof editor, 'EDITOR LINE');

        const ancestor = range?.commonAncestorContainer;

        console.log(ancestor, typeof ancestor, 'ancestor');

        console.log(selection?.anchorNode?.parentElement?.closest('.font-bold'), 'start container of range');
        console.log(range?.endContainer, 'end container of range');

    }, [parentChecker])

    useEffect(() => {
        console.log(spansCollection, 'span collection on rerender');
    })

    useEffect(() => {
        const selection = window.getSelection();
        console.log(selection);

        const editor = document.getElementById('editor');

        if (selection && selection?.rangeCount <= 0) return
        const range = selection?.getRangeAt(0);

        // console.log(editor, typeof editor, 'EDITOR LINE');

        // const ancestor = range?.commonAncestorContainer;

        // console.log(ancestor, typeof ancestor, 'ancestor');

        // console.log(range?.startContainer.parentElement?.closest('.font-bold'), 'start container of range');
        // console.log(range?.endContainer, 'end container of range');

        // console.log(range?.startContainer.parentElement?.closest('span') || range?.endContainer.parentElement?.closest('span'), 'parent element');

        if (selection?.isCollapsed) return

        

        // if (ancestor && (ancestor.toString().startsWith('<span') || ancestor.toString().endsWith('</span>'))) {
        //     console.log(ancestor.toString(), 'common ancestor');
        // }

        if (range) {

            const boldNode = document.createElement('span');
            boldNode.className = 'font-bold';
            boldNode.id = `bold-${Math.random().toString(8).substring(2, 9)}`;

            setSpansCollection(prev => ({...prev, [boldNode.id]: boldNode}));

            const extracted = range.extractContents();
            boldNode.append(extracted);
            range.insertNode(boldNode)
            console.log(boldNode);
        }

        if (!bold) {
            console.log(range && range.toString(), bold);
        } else {
            console.log(range && range.toString(), bold);
        }
    }, [bold])

    const boldText: () => void = () => {
        setBold(prev => !prev);
    }
    const italicText: () => void = () => {
        console.log('italic button was clicked');
    }

    return (
        <div>
            <EditorBar boldText={boldText} italicText={italicText} />

            <div id="editor" ref={editorRef} className='w-84 h-64 flex font-16 shadow-x1 border-2 border-solid border-black' onClick={e => setContent(e.currentTarget.innerHTML)} contentEditable="true" suppressContentEditableWarning={true}>
            </div>

            <button onClick={clearContent} className="border-2 border-solid border-black">Clear Content</button>
            <button onClick={() => setParentChecker(prev => !prev)} className="border-2 border-solid border-black">Check Parent</button>
        </div>
    );
}











{/* <textarea ref={textAreaRef} name="editor" id="editor" content={content} placeholder="Your content is here" className='shadow-x1' onChange={e => setContent(e.target.value)}>
            </textarea> */}

// const boldText = () => {
//         setBold(prev => !prev);
//         if (bold) {
//             const textArea = textAreaRef.current;
//             if (!textArea) return

//             const start = textArea.selectionStart;
//             const end = textArea.selectionEnd;
//             const fullText = textArea.value;
//             const text = fullText.substring(start, end);

//             if (!text) return

//             const before = fullText.substring(0, start);
//             const after = fullText.substring(end);
//             const bolded = `${before}**${text}**${after}`;
//             textArea.value = bolded;
//             setContent(bolded);
//             return
//         }
//     }

// useEffect(() => {
//         const handleTextSelection = () => {
//             const textArea = textAreaRef.current;
//             if (!textArea) return
//             const start = textArea.selectionStart;
//             const end = textArea.selectionEnd;
//             const text = textArea.value.substring(start, end);

//             if (text !== selectedText) {
//                 setSelectedText(text);
//                 console.log(`${text} - current selection`);
//             }
//         }
//         const ta = textAreaRef.current;
//         if (ta) {
//             ta.addEventListener('mouseup', handleTextSelection);
//         }
//         return () => {
//             if (ta) {
//                 ta.removeEventListener('mouseup', handleTextSelection)
//             }
//         }
//     }, [selectedText]);

// const textAreaRef = useRef<HTMLTextAreaElement | null>(null);



// Blinking caret
// useEffect(() => {
//     const interval: ReturnType<typeof setInterval> = setInterval(() => {
//         setContent(prev => {
//             if (!prev) return
//             if (prev.endsWith('|')) return prev.slice(0, -1);
//             return prev + '|';
//         })
//     }, 1000);
//     return () => clearInterval(interval);
// }, [content]);

// useEffect(() => {
//     // setContent(document.getElementById('editor')?.innerHTML);
//     console.log(content);
//     console.log(formattedText);
//     // document.getElementById('editor').innerHTML = content;
// }, [content])

// useEffect(() => {
//     console.log(bold);
//     if (!bold) return

//     const textArea = editorRef.current;
//     const selection = window.getSelection();
//     console.log(selection);
//     if (!textArea || !selection || selection.rangeCount === 0) return

//     const range = selection.getRangeAt(0);
//     console.log(range.startOffset, 'original range');
//     if (selectedText) {
//         const ancestor = range.commonAncestorContainer;
//         const containerElement = ancestor.nodeType === 1
//             ? ancestor as HTMLElement
//             : ancestor.parentElement
//         const formattedSpan = containerElement?.closest('span[data-id]');
//         if (formattedSpan) {
//             const dataId = formattedSpan.getAttribute('data-id');
//             console.log(`formatted span data-id is ${dataId}`);
//         }
//     }
//     if (!range.collapsed) {
//         const tempCont = content;
//         console.log(tempCont, 'current content')

//         const boldNode = document.createElement('span');
//         boldNode.id = 'bold';
//         boldNode.setAttribute('data-id', Math.random().toString(8).substring(2, 9))
//         boldNode.className = 'font-bold';

//         const start = range.startOffset;
//         const end = range.endOffset;

//         const modif = tempCont?.slice(0, start);
//         const selText = tempCont?.substring(start, end);

//         boldNode.innerText = selText || '';

//         const wholeText = modif + boldNode.outerHTML;

//         setFormattedText(prev => [...prev, { id: boldNode.dataset.id ?? '', format: boldNode.id, text: selText }])
//         setSelectedText(selText);
//         setContent(wholeText);
//         boldNode.appendChild(range.extractContents()); // grabs selected nodes
//         range.insertNode(boldNode);
//         // range.insertNode(boldNode);
//         // range.setStartAfter(boldNode);
//         // range.collapse(true);
//         // selection.removeAllRanges();
//         // selection.addRange(range);
//     } else {
//         // const selected = range.extractContents();
//         // console.log(selected, 'extraContents');
//         // const span = document.createElement("span");
//         // span.className = "font-bold";
//         // span.appendChild(selected);
//         // range.insertNode(span);
//     }
//     setBold(false);
// }, [bold]);