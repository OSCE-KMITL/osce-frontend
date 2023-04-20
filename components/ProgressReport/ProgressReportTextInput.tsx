import React, { FC } from 'react';
import { Input } from 'antd';
type MyType = string | number | null;
interface ProgressReportTextInputProps {
    topic: string;
    handleChange?: (val: MyType) => void;
    value?: string;
}
const ProgressReportTextInput: FC<ProgressReportTextInputProps> = ({ topic, handleChange, value }) => {
    return (
        <div className="flex flex-row justify-between align-middle items-center gap-x-4 w-full h-auto">
            <p className="text-xl">{topic}</p>
            <input
                onChange={(event) => handleChange(event.target.value)}
                type="text"
                value={value ? value : undefined}
                disabled={value ? true : false}
                className="w-3/4 justify-self-end rounded-md h-auto bg-white px-2 py-2 text-xl border border-gray-400"
            />
        </div>
    );
};

export default ProgressReportTextInput;
