import React, { FC } from 'react';
import { Radio } from 'antd';
import invariant from 'ts-invariant';
import log = invariant.log;
import { useProgressReportState } from '@components/ProgressReport/hooks/useCreateProgressReportState';

interface ProgressReportRadioProps {
    topic: string;
    handleChange?: (val: any) => void;
    value?: string | number;
}
type PropsType = ProgressReportRadioProps;
const ProgressReportRadio: FC<PropsType> = ({ topic, handleChange, value }) => {
    const {
        progressReportPayload,
        setProgressReportPayload,
        setAdvisorScore,
        setCommuteScore,
        setCurrentRes,
        setMentorName,
        setMentorPosition,
        setOtherSuggestion,
        setWorkScore,
        reset,
    } = useProgressReportState();
    return (
        <div className="grid grid-cols-3 items-center align-middle justify-start  px-2 py-1">
            <h3 className="grid col-span-1  text-xl">{topic}</h3>
            <div className="h-full flex justify-center items-center col-span-2">
                <Radio.Group
                    defaultValue={value ? value : undefined}
                    disabled={value ? true : false}
                    onChange={(e) => handleChange(e.target.value)}
                    optionType="button"
                    buttonStyle="solid"
                    className="flex w-full"
                >
                    <Radio.Button className="w-full h-[50px] flex items-center justify-center font-bold text-md text-gray-400" value="5">
                        5
                    </Radio.Button>
                    <Radio.Button className="w-full h-[50px] flex items-center justify-center font-bold text-md text-gray-400" value="4">
                        4
                    </Radio.Button>
                    <Radio.Button className="w-full h-[50px] flex items-center justify-center font-bold text-md text-gray-400" value="3">
                        3
                    </Radio.Button>
                    <Radio.Button className="w-full h-[50px] flex items-center justify-center font-bold text-md text-gray-400" value="2">
                        2
                    </Radio.Button>
                    <Radio.Button className="w-full h-[50px] flex items-center justify-center font-bold text-md text-gray-400" value="1">
                        1
                    </Radio.Button>
                </Radio.Group>
            </div>
        </div>
    );
};

export default ProgressReportRadio;
