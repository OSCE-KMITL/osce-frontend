import React, { FC, useEffect, useRef, useState } from 'react';

interface FileProps {
    file_name: string;
    file_url: string;
}

const UploadWidget: FC = (props) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [files, setFiles] = useState<FileProps[] | null>(null);
    const [file, setFile] = useState<FileProps | null>(null);

    const setState = () => {
        return;
    };
    useEffect(() => {
        // @ts-ignore
        cloudinaryRef.current = window.cloudinary;
        // @ts-ignore
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'dytusrrxs',
                uploadPreset: 'announcements_files',
            },
            async (err, result) => {
                if (result.event === 'queues-end') {
                    console.log(result.info);
                }
            }
        );
    }, []);

    return (
        <>
            <div
                onClick={() => {
                    // @ts-ignore
                    widgetRef.current.open();
                }}
                className="cursor-pointer px-4 text-3xl bg-red-400 text-3xl py-2"
            >
                Upload
            </div>
            {files &&
                files.map((value, index) => (
                    <li key={index}>
                        <p>{value.file_name}</p>
                    </li>
                ))}
        </>
    );
};

export default UploadWidget;
