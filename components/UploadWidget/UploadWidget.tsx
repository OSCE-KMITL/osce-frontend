import React, { FC, useEffect, useRef, useState } from 'react';
import { CLOUDINARY_CLOUD_FILE_FOLDER, CLOUDINARY_CLOUD_NAME } from '../../constants';

interface FileProps {
    file_name: string;
    file_url: string;
}

const UploadWidget: FC = (props) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [responseFiles, setResponseFiles] = useState<any[] | null>(null);

    const deletedFile = (file_id) => {
        const current = responseFiles.filter((file) => file.id !== file_id);
        setResponseFiles(current);
    };

    useEffect(() => {
        // @ts-ignore
        cloudinaryRef.current = window.cloudinary;
        // @ts-ignore
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: CLOUDINARY_CLOUD_FILE_FOLDER,
            },
            async (err, result) => {
                if (result.event === 'queues-end') {
                    const info = result.info.files as any[];
                    await setResponseFiles(info);
                }
            }
        );
        return null;
    }, []);

    return (
        <>
            <div className="flex flex-col gap-2">
                <div
                    onClick={() => {
                        // @ts-ignore
                        widgetRef.current.open();
                    }}
                    className="block w-full h-[50px] items-center justify-start px-4 flex text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                >
                    Choose files...
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                    PDF ,DOC , EXCEL , SVG, PNG, JPG or GIF (MAX. 10mb).
                </p>
            </div>
            {responseFiles &&
                responseFiles.map((value, index) => (
                    <>
                        <li className={'text-blue-600 flex flex-row gap-6'} key={index}>
                            {value.name}
                            <p onClick={() => deletedFile(value.id)}>x</p>
                        </li>
                    </>
                ))}
        </>
    );
};

export default UploadWidget;
