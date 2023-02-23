import React, { FC } from 'react';
import { UploadFileInput } from '@features/upload/hooks/useUploadFile';
import NotificationService from '@lib/ant_service/NotificationService';

interface OwnProps {
    setTranscriptFile: (val: UploadFileInput) => void;
}

type Props = OwnProps;

const TranscriptUpload: FC<Props> = ({ setTranscriptFile }) => {
    const notification = NotificationService.getInstance();
    // Graphql Upload file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const file_type = file.name.substr(-3);
        if (file_type != 'pdf') {
            notification.error('พบข้อผิดพลาด', 'ใบแสดงผลการเรียนต้องเป็น pdf. เท่านั้น');
            const file_input = document.getElementById('file') as HTMLInputElement;
            file_input.value = null;
            return;
        }
        setTranscriptFile(file);
    };
    return (
        <div className=" w-full p-6 rounded-md bg-white my-6">
            <div className="flex flex-col justify-between w-full my-6">
                <div className=" mb-6">
                    <p className="text-3xl font-bold">แนบใบแสดงผลการเรียน (transcript)</p>
                    <div>
                        <input accept="application/pdf" type="file" defaultValue={null} onChange={handleFileChange} id="file" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranscriptUpload;
