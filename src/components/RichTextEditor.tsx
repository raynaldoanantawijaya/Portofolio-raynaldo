import React, { useRef, useEffect } from 'react';

interface Props {
    value: string;
    onChange: (html: string) => void;
    onInsertImage?: () => void;
}

export default function RichTextEditor({ value, onChange, onInsertImage }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        handleInput();
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const toolbarBtn: React.CSSProperties = {
        background: '#333',
        color: '#fff',
        border: '1px solid #555',
        padding: '6px 10px',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '14px',
        marginRight: '4px',
    };

    return (
        <div style={{ border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Toolbar */}
            <div style={{ background: '#1a1a1a', padding: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px', borderBottom: '1px solid #333' }}>
                <button type="button" style={toolbarBtn} onClick={() => execCommand('bold')} title="Bold">
                    <b>B</b>
                </button>
                <button type="button" style={toolbarBtn} onClick={() => execCommand('italic')} title="Italic">
                    <i>I</i>
                </button>
                <button type="button" style={toolbarBtn} onClick={() => execCommand('underline')} title="Underline">
                    <u>U</u>
                </button>
                <button type="button" style={toolbarBtn} onClick={() => execCommand('strikeThrough')} title="Strikethrough">
                    <s>S</s>
                </button>
                <span style={{ borderLeft: '1px solid #555', margin: '0 8px' }} />
                <button type="button" style={toolbarBtn} onClick={() => execCommand('formatBlock', 'h2')} title="Heading 2">
                    H2
                </button>
                <button type="button" style={toolbarBtn} onClick={() => execCommand('formatBlock', 'h3')} title="Heading 3">
                    H3
                </button>
                <button type="button" style={toolbarBtn} onClick={() => execCommand('formatBlock', 'p')} title="Paragraph">
                    P
                </button>
                <span style={{ borderLeft: '1px solid #555', margin: '0 8px' }} />
                <button type="button" style={toolbarBtn} onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
                    • List
                </button>
                <button type="button" style={toolbarBtn} onClick={() => execCommand('insertOrderedList')} title="Numbered List">
                    1. List
                </button>
                <span style={{ borderLeft: '1px solid #555', margin: '0 8px' }} />
                {onInsertImage && (
                    <button type="button" style={{ ...toolbarBtn, background: '#2196F3' }} onClick={onInsertImage} title="Insert Image">
                        🖼️ Gambar
                    </button>
                )}
                <button type="button" style={toolbarBtn} onClick={() => {
                    const url = prompt('Masukkan URL link:');
                    if (url) execCommand('createLink', url);
                }} title="Insert Link">
                    🔗 Link
                </button>
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                style={{
                    minHeight: '200px',
                    padding: '16px',
                    background: '#000',
                    color: '#eee',
                    outline: 'none',
                    fontSize: '14px',
                    lineHeight: '1.6',
                }}
            />
        </div>
    );
}
