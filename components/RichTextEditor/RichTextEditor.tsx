import React, { FC } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { DeltaStatic, Sources } from 'quill';
import { UnprivilegedEditor } from 'react-quill';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
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

interface RichTextProps {
    onChange?(value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor): void;
    className: string;
}
const RichTextEditor: FC<RichTextProps> = ({ onChange, className }) => {
    return <QuillNoSSRWrapper className={className} modules={modules} onChange={onChange} theme="snow"></QuillNoSSRWrapper>;
};

export default RichTextEditor;
