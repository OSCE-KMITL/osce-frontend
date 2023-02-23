import React, { FC } from 'react';

interface OwnProps {}

type Props = OwnProps;

const TranscriptUpload: FC<Props> = (props) => {
    return (
        <div className=" w-full p-6 rounded-md bg-white my-6">
            <div className="flex flex-col justify-between w-full my-6">
                <div className="w-[30%] mb-6">
                    <p className="text-3xl font-bold">แนบทรานสคริป</p>
                </div>
            </div>
        </div>
    );
};

export default TranscriptUpload;
