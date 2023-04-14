import React, { FC } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { ReactQuillProps } from 'react-quill';
import { useQuill } from 'react-quilljs';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

export const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: '3' }, { font: ['Noto Sans Thai'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const RichTextEditor: FC<ReactQuillProps> = ({ onChange, className, value }) => {
    const { quill, quillRef } = useQuill();
    return <div ref={quillRef}></div>;
};

export default RichTextEditor;
