import { Radio } from 'antd';
import React, { useState } from 'react';

export type Subtopic = {
    id: number;
    question: string;
    details: string;
    answer: number | null;
};

export type Topic = {
    id: number;
    name: string;
    subtopics: Subtopic[];
};

export type AssessmentProps = {
    topics: Topic[];
    onUpdateTopics: (topicId: number, subtopicId: number, answer: number | null) => void;
};

const AssessmentCompany = ({ topics, onUpdateTopics }: AssessmentProps) => {
    const [updatedTopics, setUpdatedTopics] = useState<Topic[]>(topics);

    const handleAnswerChange = (topicId: number, subtopicId: number, value: number) => {
        // console.log('topicId' + topicId, 'subId' + subtopicId, 'value' + value);
        onUpdateTopics(topicId, subtopicId, value);
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 px-8">
                <div></div>
                <div className="grid grid-cols-5  w-full  text-md text-gray-600  font-primary_noto">
                    <p className=" flex items-center justify-center">5 = ดีเยี่ยม</p>
                    <p className=" flex items-center justify-center">4 = ดี</p>
                    <p className=" flex items-center justify-center">3 = พอใช้</p>
                    <p className=" flex items-center justify-center">2 = ต้องปรับปรุง</p>
                    <p className=" flex items-center justify-center">1 = ไม่เป็นที่พอใจ</p>
                </div>
            </div>
            <div className=" bg-white rounded-2xl px-8 py-8 mt-4 shadow-sm border-solid border-1 border-gray-300 overflow-hidden  ">
                <div className="flex flex-col gap-8">
                    {topics.map((topic) => (
                        <div key={topic.id}>
                            <div className="grid grid-cols-2 gap-4">
                                <h3 className="text-xl text-primary-500">{topic.name}</h3>
                            </div>
                            {topic.subtopics.map((subtopic) => (
                                <div key={subtopic.id} className="w-full h-fit   grid grid-cols-2 pt-4 gap-4">
                                    <div className="flex flex-col justify-center  ">
                                        <p className="">{subtopic.question}</p>
                                        <p className="pl-4 text-gray-500">{subtopic.details ? subtopic.details : ''}</p>
                                    </div>
                                    <div className="h-full flex justify-center items-center">
                                        <Radio.Group
                                            optionType="button"
                                            buttonStyle="solid"
                                            defaultValue={subtopic.answer ? subtopic.answer?.toString : null}
                                            className="flex w-full"
                                            value={subtopic.answer ? subtopic.answer.toString() : ''}
                                            onChange={(e) => handleAnswerChange(topic.id, subtopic.id, parseInt(e.target.value))}
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
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssessmentCompany;
