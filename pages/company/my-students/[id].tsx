import { Button, Divider, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {} from '@features/job/hooks/useEditStateJob';
import NotificationService from '@lib/ant_service/NotificationService';
import AssessmentCompany, { Topic } from '@components/Assessment/AssessmentCompany';
import { TrashIcon } from '@heroicons/react/24/outline';

const Assessment: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [form] = Form.useForm();
    const [strengthList, setStrengList] = useState([{ streng: '' }]);
    const [improvedList, setImprovedList] = useState([{ improved: '' }]);
    const [score, setScore] = useState(0);

    const topics: Topic[] = [
        {
            id: 1,
            name: 'ด้านที่ 1 ผลสำเร็จของงาน / Work Achievement',
            subtopics: [
                {
                    id: 1,
                    question: '1. ปริมาณงาน / Quantity of Work',
                    details: 'ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่กำหนด และ เทียบกับนักศึกษาทั่ว ๆ ไป',
                    answer: null,
                },
                {
                    id: 2,
                    question: '2. คุณภาพของงาน / Quality of Work',
                    details: 'ทำงานได้ถูกต้องครบถ้วนสมบูรณ์ มีความประณีตเรียบร้อยมีความละเอียดรอบคอบ ไม่เกิดปัญหาตามมา ทำงานเสร็จทันเวลาหรือ ก่อนเวลาที่กำหนด',
                    answer: null,
                },
            ],
        },
        {
            id: 2,
            name: 'ด้านที่ 2 ความรู้ความสามารถ / Knowledge and Ability',
            subtopics: [
                {
                    id: 3,
                    question: '1. ความรู้ความสามารถทางวิชาการ / Academic Ability',
                    details: 'นักศึกษามีความรู้ทางวิชาการเพียงพอที่จะทำงานตามที่ได้รับมอบหมาย (ในระดับที่นักศึกษาจะปฏิบัติได้)',
                    answer: null,
                },
                {
                    id: 4,
                    question: '2. ความสามารถในการเรียนรู้และประยุกต์วิชาการ / Ability to Learn and Apply Knowledge',
                    details: 'ความสามารถในการเรียนรู้ เข้าใจข้อมูล ข่าวสาร และวิธีการทำงาน ตลอดจนการนำความรู้ไปประยุต์ใช้งาน',
                    answer: null,
                },
                {
                    id: 5,
                    question: '3. ทักษะความชำนาญด้านปฏิบัติการ / Practical ability',
                    details: 'เช่น การปฏิบัติงานในภาคสนามในห้องปฏิบัติการ',
                    answer: null,
                },
                {
                    id: 6,
                    question: '4. วิจารญาณและการตัดสินใจ / Judgement and Decision Making',
                    details:
                        'ตัดสินใจให้ดี ถูกต้อง รวดเร็ว มีการวิเคราะห์ข้อมูลและปัญหาต่าง ๆ อย่างรอบคอบ ก่อนการตัดสินใจ สามารถแก้ปัญหาเฉพาะหน้า สามารถไว้วางใจให้ตัดสินใจได้ด้วยตนเอง',
                    answer: null,
                },
                {
                    id: 7,
                    question: '5. การจัดการและการวางแผน / Organization and Planning',
                    details: 'มีระบบการจัดการและการวางแผนการทำงานก่อนลงมือปฏิบัติ',
                    answer: null,
                },
                {
                    id: 8,
                    question: '6. ทักษะการสื่อสาร / Communication Skills',
                    details: 'ความสามารถในการติดต่อสื่อสาร การพูด การเขียน และการนำเสนอ (Presentation) สามารถสื่อให้เข้าใจได้ง่าย เรียบร้อยชัดเจน',
                    answer: null,
                },
                {
                    id: 9,
                    question: '7. การพัฒนาทักษะด้านต่าง ๆ ในการทำงานอย่างต่อเนื่อง / Skills Development',
                    details: 'ความสามารถในการใช้เครื่องใช้สำนักงานต่าง ๆ เช่น เครื่องคอมพิวเตอร์ ถ่ายเอกสาร',
                    answer: null,
                },
                // ...
            ],
        },
        {
            id: 3,
            name: 'ด้านที่ 3  ความรับผิดชอบต่อหน้าที่ / Responsibility ',
            subtopics: [
                {
                    id: 10,
                    question: '1. ความรับผิดชอบและเป็นผู้ที่ไว้วางใจได้ / Responsibility and Dependability',
                    details:
                        'ดำเนินให้สำเร็จลุล่วงโดยคำนึงถึงเป้าหมายและความสำเร็จของงานเป็นหลักยอมรับผลที่เกิดจากการทำงานอย่างมีเหตุผลสามารถปล่อยให้ทำงาน (กรณีงานประจำ) ได้โดยไม่ต้องควบคุมมากจนเกินไป ความจำเป็นในการตรวจสอบขั้นตอนและผลงานตลอดเวลา สามารถไว้วางใจให้รับผิดชอบงานตลอดเวลา สามารถไว้วางใจให้รับผิดชอบงานได้มากกว่าเวลาประจำสามารถไว้วางใจได้แทบทุกสถานการณ์หรือในสถานการปกติเท่านั้น',
                    answer: null,
                },
                {
                    id: 11,
                    question: '2. ความสนใจ อุตสาหะในการทำงาน / Interest in work',
                    details:
                        'ความสนใจและความกระตือรือร้นในการทำงาน มีความอุตสาหะ ความพยายาม ความตั้งใจที่จะทำงานได้สำเร็จ ความมานะบากบั่นไม่ย่อท้อต่ออุปสรรคและปัญหา',
                    answer: null,
                },
                {
                    id: 12,
                    question: '3. ความสามารถเริ่มต้นการทำงานด้วยตนเอง / Initiative or Self Starter',
                    details:
                        'เมื่อได้รับคำชี้แนะสามารถเริ่มทำงานได้ด้วยตนเองโดยไม่ต้องรอคำสั่ง (กรณีงานประจำ)เสนอตัวเข้าช่วยงานแทบทุกอย่าง มาขอรับงานใหม่ ๆ ไปทำไม่ปล่อยเวลาว่างให้ล่วงเลยไปโดยเปล่าประโยชน์',
                    answer: null,
                },
                {
                    id: 13,
                    question: '4. การตอบสนองต่อการสั่งการ / Response to Supervision',
                    details:
                        'ยินดีรับฟังคำสั่ง คำแนะนำ คำวิจารณ์ไม่แสดงความอึดอัดใจ เมื่อได้รับคำติเตือนและวิจารณ์ความรวดเร็วในการปฏิบัติตามคำสั่ง การปรับตัวปฏิบัติตามคำแนะนำ ข้อเสนอแนะและวิจารณ์',
                    answer: null,
                },

                // ...
            ],
        },
    ];
    const [dataTopics, setDataTopics] = useState<Topic[]>(topics);

    const handleSubtopicChange = (topicId: number, subtopicId: number, answer: number | null) => {
        setDataTopics((prevTopics) => {
            const topicIndex = prevTopics.findIndex((topic) => topic.id === topicId);
            if (topicIndex === -1) {
                return prevTopics;
            }

            const subtopicIndex = prevTopics[topicIndex].subtopics.findIndex((subtopic) => subtopic.id === subtopicId);
            if (subtopicIndex === -1) {
                return prevTopics;
            }

            const updatedSubtopic = { ...prevTopics[topicIndex].subtopics[subtopicIndex], answer };
            const updatedSubtopics = [...prevTopics[topicIndex].subtopics];
            updatedSubtopics[subtopicIndex] = updatedSubtopic;

            const updatedTopic = { ...prevTopics[topicIndex], subtopics: updatedSubtopics };
            const updatedTopics = [...prevTopics];
            updatedTopics[topicIndex] = updatedTopic;

            // console.log(updatedTopics);

            calculateTotalAnswer(updatedTopics);

            return updatedTopics;
        });
    };

    const handleAddStreng = () => {
        setStrengList([...strengthList, { streng: '' }]);
    };

    const handleAddImproved = () => {
        setImprovedList([...improvedList, { improved: '' }]);
    };

    const handleRemoveString = (index: number) => {
        console.log('index', index);
        const list = [...strengthList];
        list.splice(index, 1);
        setStrengList(list);
    };

    const handleRemoveImprove = (index: number) => {
        const list = [...improvedList];
        list.splice(index, 1);
        setImprovedList(list);
    };

    const handleSubmit = () => {
        console.log('dataTopicOut', dataTopics);
        console.log('strength', strengthList);
        console.log('improvement', improvedList);
    };

    const handleStrengChange = (e, index: number) => {
        const { name, value } = e.target;
        console.log('name:', name);
        const list = [...strengthList];
        list[index][name] = value;
        setStrengList(list);
    };

    const handleImprovedChange = (e, index: number) => {
        const { name, value } = e.target;
        console.log('name:', name);
        const list = [...improvedList];
        list[index][name] = value;
        setImprovedList(list);
    };

    const validateStrengthLength = (rule: any, value: string, callback: any) => {
        if (value && value.length <= 500) {
            callback();
        } else if (value == '') {
            callback();
        } else {
            callback('ไม่สามารถกรอกข้อมูลเกิน 500 ตัวอักษร');
        }
    };

    const calculateTotalAnswer = (topics: Topic[]) => {
        let sum = 0;
        let num_subtopic = 0;
        for (const topic of topics) {
            for (const subtopic of topic.subtopics) {
                if (typeof subtopic.answer === 'number') {
                    sum += subtopic.answer;
                }
                num_subtopic++;
            }
        }
        const cal = (sum / (num_subtopic * 5)) * 40;
        setScore(Math.round(cal));
    };

    const onFinish = (value) => {
        console.log({ value });
    };

    return (
        <div className="w-full">
            <div className="w-[100%] ">
                <div className="w-full h-fit">
                    <p onClick={() => router.back()} className="mb-6 font-semibold cursor-pointer ">
                        {'< ย้อนกลับ'}
                    </p>
                    <h1>แบบประเมินผลนักศึกษา</h1>
                    <Divider />
                    <div className="flex gap-8 items-center ">
                        <div className="flex">
                            <p className="text-md  font-primary_noto pr-4 py-4">รหัสนักศึกษา</p>
                            <p className="text-md text-primary-500 font-bold font-primary_noto  rounded-xl p-4 bg-white ">63015166</p>
                        </div>
                        <div className="flex">
                            <p className="text-md font-primary_noto p-4">ชื่อ</p>
                            <p className="text-md text-primary-500 font-bold font-primary_noto  rounded-xl p-4 bg-white ">นาย ศรายุธ อารีย์</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold font-primary_noto pt-8">ตอนที่ 1 การปฏิบัติงานของนักศึกษาสหกิจศึกษา</h3>

                    <AssessmentCompany topics={dataTopics} onUpdateTopics={handleSubtopicChange} />
                    <h3 className="text-xl font-bold font-primary_noto pt-8">ตอนที่ 2 การปฏิบัติงานของนักศึกษาสหกิจศึกษา</h3>
                    <div className="bg-white rounded-2xl px-8 py-8 mt-4 shadow-sm border-solid border-1 border-gray-300 overflow-hidden">
                        <Form form={form}>
                            <p>1. จุดเด่นของนักศึกษา / Strength</p>
                            <div className="flex flex-col gap-2">
                                {strengthList.map((singleStreng, index) => (
                                    <div key={index}>
                                        <div className="flex content-center">
                                            <Form.Item
                                                key={`strength${index}`}
                                                id={`strength${index}`}
                                                rules={[{ validator: validateStrengthLength }]}
                                                className="w-[85%] m-0 p-0"
                                            >
                                                <Input
                                                    name="streng"
                                                    size="large"
                                                    className="w-full mt-1"
                                                    value={singleStreng.streng}
                                                    onChange={(e) => handleStrengChange(e, index)}
                                                ></Input>
                                            </Form.Item>

                                            {strengthList.length > 1 && (strengthList.length - 1 !== index || strengthList.length === 3) && (
                                                <Button type="ghost" size="large" onClick={() => handleRemoveString(index)}>
                                                    <TrashIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
                                                </Button>
                                            )}

                                            {strengthList.length - 1 === index && strengthList.length < 3 && (
                                                <Button
                                                    onClick={handleAddStreng}
                                                    type="ghost"
                                                    size="large"
                                                    className="font-bold text-primary-500 hover:text-primary-300 "
                                                >
                                                    + เพิ่มจุดเด่น
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-8">2. ข้อควรปรับปรุงของนักศึกษา / Improvement</p>
                            <div className="flex flex-col gap-2">
                                {improvedList.map((singleImproved, index) => (
                                    <div key={index}>
                                        <div className="flex content-center">
                                            <Form.Item
                                                key={`improved${index}`}
                                                id={`improved${index}`}
                                                rules={[{ validator: validateStrengthLength }]}
                                                className="w-[85%] m-0 p-0"
                                            >
                                                <Input
                                                    name="improved"
                                                    size="large"
                                                    className="w-full mt-1"
                                                    value={singleImproved.improved}
                                                    onChange={(e) => handleImprovedChange(e, index)}
                                                ></Input>
                                            </Form.Item>

                                            {improvedList.length > 1 && (improvedList.length - 1 !== index || improvedList.length === 3) && (
                                                <Button type="ghost" size="large" onClick={() => handleRemoveImprove(index)}>
                                                    <TrashIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
                                                </Button>
                                            )}

                                            {improvedList.length - 1 === index && improvedList.length < 3 && (
                                                <Button
                                                    onClick={handleAddImproved}
                                                    type="ghost"
                                                    size="large"
                                                    className="font-bold text-primary-500 hover:text-primary-300 "
                                                >
                                                    + เพิ่มข้อควรปรับปรุง
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Form>
                        <div className="flex justify-end w-full mt-8">
                            <div className="w-fit border-2 border-primary-400 rounded-xl p-4">
                                <p>คะแนนรวม {score} / 40</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 flex justify-end gap-12">
                        {/* <button className="px-2 py-2 rounded-md w-fit  h-[60%]   border-gray-300 text-xl text-gray-400" onClick={() => router.back()}>
                            ยกเลิก
                        </button> */}
                        <button
                            type="submit"
                            className="px-2 py-2 rounded-md w-40 bg-green-600 h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-100"
                            onClick={handleSubmit}
                        >
                            {/* {(!committee_loading || !company_loading) && 'บันทึก'}
                        {(committee_loading || company_loading) && (
                            <span>
                                <LoadingSpinner />
                                loading...
                            </span>
                        )} */}
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Assessment;
