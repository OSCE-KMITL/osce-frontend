import React, { FC } from 'react';
import { Divider } from 'antd';
import { formatDateToThai } from '../../utils/common';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface OwnProps {}

type Props = OwnProps;

interface Timeline {
    id: string;
    name: string;
    description: string;
    date: string;
    year: number;
}
type Timelines = Timeline[];

const createTimeLine = (name: string, description: string, date: string): Timeline => {
    return {
        id: Date.now().toString(),
        name: name,
        description: description,
        date: formatDateToThai(date),
        year: 2556,
    };
};
const timelines: Timelines = [
    createTimeLine('รับสมัครสหกิจ', 'กรรมการสหกิจชี้แจงรายละเอียด และให้นักศึกษาส่งใบสมัครมาที่กรรมการสหกิจ', new Date(Date.now()).toString()),
    createTimeLine('หาสถานประกอบการ', 'นักศึกษาหาสถานประกอบการ และงานที่เหมาะสม', new Date(Date.now()).toString()),
    createTimeLine('เริ่มปฏิบัติสหกิจ', 'นักศึกษาออกปฏิบัติสหกิจศึกษา พร้อมรายงานความก้าวหน้า', new Date(Date.now()).toString()),
    createTimeLine('การนิเทศงานสหกิจ ', 'อาจารย์นิเทศไปนิเทศนักศึกษาที่สถานประกอบการหรือ รูปแบบออนไลน์', new Date(Date.now()).toString()),
    createTimeLine('ประเมินผล', 'สถานประกอบการส่งแบบประเมินนักศึกษา ', new Date(Date.now()).toString()),
];
const Timeline: FC<Props> = () => {
    return (
        <div className="w-full min-h-full gap-20   ">
            <h1>กำหนดการสหกิจ</h1>
            <Divider />
            <div className="w-full grid grid-cols-5  gap-4  items-center justify-evenly ">
                {timelines.map((val, index) => (
                    <div
                        className="bg-white flex shadow-md rounded-xl px-5 flex-col items-center  gap-y-8   w-[320px] h-[450px]  border border-gray-100 "
                        key={val.id + index}
                    >
                        <div className="w-full h-1/2 rounded-md flex justify-center items-center">
                            <h2 className="flex  border-2 border-primary-400  border-dotted text-primary-500 px-5 rounded-full py-5 justify-center items-center bg-white ">
                                {index + 1}
                            </h2>
                        </div>
                        <p className="text-[26px] font-bold text-center text-gray-800">{val.name}</p>

                        <p className="text-[22px] text-center text-gray-500">{val.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
