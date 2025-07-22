import React, { useEffect, useState } from "react";
import EditorBar from "./EditorBar";

export default function Edi2or() {
    // const [value, setValue] = useState<string>('');
    const [bolded, setBolded] = useState<boolean>(false);
    const [italic, setItalic] = useState<boolean>(false);

    const createTreeWalkerForEditor = (): TreeWalker | null => {
    const editor = document.getElementById('editor');
    if (!editor) return null;

    return document.createTreeWalker(
        editor,
        NodeFilter.SHOW_ALL,
        {
            acceptNode: function (node) {
                // let countSpans = 0; - TO DO SOMETHING TO DETECT SPANS INSIDE A SELECTION
                return node.parentNode?.nodeName !== 'SPAN' || node.nodeName === 'SPAN'
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT
            }
        }
    );
}

    // Formatter function
    const formatter = (range: Range, format: string) => {
        const span = document.createElement('span');
        span.className = `font-${format}`;
        span.innerHTML = range.toString();
        range.deleteContents();
        range.insertNode(span);
    }

    const splitBoldAndUnwrap = (range: Range, startSpan: Element) => {

        const originalSpan = startSpan;
        const fullText = originalSpan.textContent || '';
        const selectionText = range.toString();

        const startOffsetInSpan = range.startOffset;
        const endOffsetInSpan = range.startOffset + selectionText.length;

        const beforeText = fullText.slice(0, startOffsetInSpan);
        const afterText = fullText.slice(endOffsetInSpan);

        const parent = originalSpan.parentNode!;

        // Insert before (bold) text only if non-empty
        if (beforeText.trim() !== '') {
            const beforeSpan = document.createElement('span');
            beforeSpan.className = 'font-bold';
            beforeSpan.textContent = beforeText;
            parent.insertBefore(beforeSpan, originalSpan);
        }

        // Insert un-bolded selection
        const unBoldedTextNode = document.createTextNode(selectionText);
        parent.insertBefore(unBoldedTextNode, originalSpan);

        // Insert after (bold) text only if non-empty
        if (afterText.trim() !== '') {
            const afterSpan = document.createElement('span');
            afterSpan.className = 'font-bold';
            afterSpan.textContent = afterText;
            parent.insertBefore(afterSpan, originalSpan);
        }

        // Remove original span
        parent.removeChild(originalSpan);

        // Clear selection to avoid weird re-highlighting
        const sel = window.getSelection();
        if (sel) sel.removeAllRanges();
    }

    useEffect(() => {
        const treeWalker = createTreeWalkerForEditor();
        let treeNode;
        let count = 0;
        while (treeNode = treeWalker?.nextNode()) {
            console.log(treeNode);
            count++;
        }

        console.log(count);

    }, [italic])

    useEffect(() => {
        // Reference for editor
        const editor = document.getElementById('editor');

        // Get selection and return nothing if it doesn't exist
        const selection = document.getSelection();
        if (!selection || selection.rangeCount === 0) return

        // Get the range and return nothing if range is empty (nothing has been selected)
        const range = selection?.getRangeAt(0);
        if (range.collapsed) return

        // For debugging
        console.log(`${selection} - selected`, `${range} - ranged`);
        console.log(range?.startContainer, range?.endContainer);

        /* EXTRACTED NODES OF THE RANGE */
        const rangeStartNode = range.startContainer.parentNode;
        const rangeEndNode = range.endContainer.parentNode;

        // Get the spans of the range
        const startSpan = range.startContainer.parentElement?.closest('.font-bold');
        const endSpan = range.endContainer.parentElement?.closest('.font-bold');

        /* Check the case where the start and the end of the range (selection) are spans*/
        if (rangeStartNode?.nodeName === 'SPAN' && rangeEndNode?.nodeName === 'SPAN') {
            console.log(`${startSpan?.textContent} - start span, ${endSpan?.textContent} - end span; ${startSpan === endSpan} = or !=`);

            // Check if the start and end container's are not in different spans
            if (!startSpan || !endSpan || startSpan !== endSpan) {
                console.warn("Selection doesn't start and end in the same bold span.");
                /// Logic for selection which starts and ends in different spans
                /// ...
                return;
            }
            /// Logic for selection which starts and ends in the same span
            splitBoldAndUnwrap(range, startSpan);
            return
        }

        /* Check if the start and the end of the range (selection) are in div/editor */
        if (rangeStartNode?.nodeName === 'DIV' && rangeEndNode?.nodeName === 'DIV') {
            const treeWalker = createTreeWalkerForEditor();
            let treeNode;
            let count = 0;

            while (treeNode = treeWalker?.nextNode()) {
                const tempRange = new Range();
                tempRange.selectNode(treeNode);
                formatter(tempRange, 'bold');
                count++;
            }

            console.log(count);
            return;
        }


        if (rangeStartNode?.nodeName === 'SPAN' || rangeEndNode?.nodeName === 'SPAN') return

        if (bolded) {
            console.log(`${editor?.firstChild?.nodeType} = DIV'S FIRST CHILD ,  
                        ${rangeStartNode?.nodeName} - parent node name START, ${range.startOffset} - START OFFSET,
                        ${rangeEndNode?.nodeName} - parent node name END, ${range.endOffset} - END OFFSET`);
        }

    }, [bolded]);

    const boldText: () => void = () => {
        setBolded(prev => !prev);
    }

    const italicText: () => void = () => {
        setItalic(prev => !prev);
        // if (italic) console.log('italic');
    }

    return (
        <>
            <EditorBar boldText={boldText} italicText={italicText} />
            <div id='editor' className="w-64 h-64 border-2 border-solid border-black" contentEditable={true} suppressContentEditableWarning={true}></div>
        </>
    );
}
