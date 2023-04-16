import { Button, Divider, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {} from '@features/job/hooks/useEditStateJob';
import NotificationService from '@lib/ant_service/NotificationService';
import AssessmentCompany, { Topic } from '@components/Assessment/AssessmentCompany';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCreateCompanyAssessment } from '@features/company/hooks/useCreateCompanyAssessment';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import ViewAssessmentCompany from '@components/Assessment/ViewAssessmentCompany';

const Assessment: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const notification = NotificationService.getInstance();
    const [strengthList, setStrengList] = useState<Strength[]>([{ strength: '', id: Date.now() }]);
    const [score, setScore] = useState(0);
    const [createCompanyAssessment, { loading: create_company_assessment_loading }] = useCreateCompanyAssessment();
    const { data: stu_data, loading: stu_loading, error: stu_error, refetch: refetch_stu_data } = useGetStudent(id?.toString());
    const { data: dataGetMe, refetch: refectch_me } = useGetMe();
    const [improvedList, setImprovedList] = useState<Improvement[]>([{ improved: '', id: Date.now() }]);

    interface Strength {
        strength: string;
        id: number;
    }

    interface Improvement {
        improved: string;
        id: number;
    }

    const topics: Topic[] = [
        {
            id: 1,
            name: 'ด้านที่ 1 การพัฒนาตนเอง / Personal Development',
            subtopics: [
                {
                    id: 1,
                    question: '1. บุคลิกภาพ / Personally',
                    details: '',
                    answer: null,
                },
                {
                    id: 2,
                    question: '2. วุฒิภาวะ / Maturity',
                    details: '',
                    answer: null,
                },
                {
                    id: 3,
                    question: '3. การปรับตัว / Adaptation',
                    details: '',
                    answer: null,
                },
                {
                    id: 4,
                    question: '4. การเรียนรู้ / Learning',
                    details: '',
                    answer: null,
                },
                {
                    id: 5,
                    question: '5. การแสดงความคิดเห็น การแสดงออก / Expression',
                    details: '',
                    answer: null,
                },
                {
                    id: 6,
                    question: '6. มนุษยสัมพันธ์ / Human relations',
                    details: '',
                    answer: null,
                },
                {
                    id: 7,
                    question: '7. ทัศนคติ / Attitude',
                    details: '',
                    answer: null,
                },
            ],
        },
        {
            id: 2,
            name: 'ด้านที่ 2 ความมีส่วนรวมกับองค์กร / Cooperative',
            subtopics: [
                {
                    id: 8,
                    question: '1. การมีส่วนร่วมในการปฏิบัติงานร่วมกับองค์กร',
                    details: 'การทำงานร่วมกับผู้อื่น หรือการปฏิบัติงานที่องค์กรมอบหมายให้ทำร่วมกับผู้อื่น',
                    answer: null,
                },
                // ...
            ],
        },
        {
            id: 3,
            name: 'ด้านที่ 3  ความประพฤติ คุณธรรม จริยธรรม / Ethics and morality ',
            subtopics: [
                {
                    id: 9,
                    question: '1. ความประพฤติ คุณธรรม และ จริยธรรม',
                    details: 'การปฏิบัติตามระเบียบวินัยขององค์กร เช่น การลา การขาดงาน การแต่งกาย ความซื่อสัตย์',
                    answer: null,
                },
                // ...
            ],
        },
        {
            id: 4,
            name: 'ด้านที่ 4 ความรู้ความสามารถ / knowledge ',
            subtopics: [
                {
                    id: 10,
                    question: '1.ความรู้ความสามารถ และทักษะการทำงาน',
                    details: 'ความรู้ความสามารถพื้นฐานที่จำเป็นต่อการปฏิบัติงานที่ได้รับมอบหมายให้สำเร็จ',
                    answer: null,
                },
                // ...
            ],
        },
        {
            id: 5,
            name: 'ด้านที่ 5 ความรับผิดชอบในหน้าที่ / Responsibility',
            subtopics: [
                {
                    id: 11,
                    question: '1. ความรับผิดชอบต่อหน้าที่ที่ได้รับมอบหมาย',
                    details: 'ความรับผิดชอบต่องาน หรือ หน้าที่ ที่องค์กรรับมอบหมายงานให้ปฏิบัติความใส่ใจในหน้าที่',
                    answer: null,
                },

                // ...
            ],
        },
        {
            id: 6,
            name: 'ด้านที่ 6 ความก้าวหน้าของโครงการสหกิจศึกษา / Quantity of work',
            subtopics: [
                {
                    id: 12,
                    question: '1. ความก้าวหน้าของโครงการสหกิจศึกษา',
                    details: 'ผลการดำเนินการ และความก้าวหน้าของโครงงานสหกิจศึกษา',
                    answer: null,
                },
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

    const checkAllSubtopicAnswers = (topics: Topic[]): boolean => {
        for (const topic of topics) {
            for (const subtopic of topic.subtopics) {
                if (subtopic.answer === null) {
                    return false;
                }
            }
        }
        return true;
    };

    const checkStrengthInput = (strength: Strength[]): boolean => {
        const strength_length = strength.map((i) => i.strength.length > 500);
        if (strength_length.includes(true)) {
            return true;
        }

        return false;
    };

    const checkImprovementInput = (improvement: Improvement[]): boolean => {
        const improvement_length = improvement.map((i) => i.improved.length > 500);
        if (improvement_length.includes(true)) {
            return true;
        }

        return false;
    };

    const handleSubmit = async () => {
        if (checkStrengthInput(strengthList)) {
            return notification.error('Error', 'ไม่สามารถกรอกข้อมูลจุดเด่นเกิน 500 ตัวอักษร');
        }

        if (checkImprovementInput(improvedList)) {
            return notification.error('Error', 'ไม่สามารถกรอกข้อควรปรับปรุงเกิน 500 ตัวอักษร');
        }

        const new_strength = strengthList
            .filter((i) => i.strength.trim().length > 0)
            .map((i) => i.strength)
            .join('|');
        // console.log('renew strength' + new_strength);

        const new_improvement = improvedList
            .filter((i) => i.improved.trim().length > 0)
            .map((i) => i.improved)
            .join('|');
        // console.log('renew improvement' + new_improvement);

        const company_id = dataGetMe?.getMe?.is_company?.company_id?.id;
        const student_id = id.toString();

        if (checkAllSubtopicAnswers(dataTopics)) {
            await createCompanyAssessment({
                variables: {
                    companyAssessmentInfo: {
                        company_id: company_id,
                        student_id: student_id,
                        score: score,
                        strength: new_strength,
                        improvement: new_improvement,
                        assessment_obj: { ...dataTopics },
                    },
                },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ประเมินนักศึกษาเสร็จสิ้น');
                    }
                    router.back();
                },
                onError: (error) => {
                    console.log(error);
                    if (error) {
                        notification.error('Error', error.message);
                    }
                },
            });
        } else {
            notification.error('Error', 'กรุณาประเมินให้ครบทุกข้อ');
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

    useEffect(() => {
        refectch_me();
    }, []);

    return (
        <div className="w-full">
            <div className="w-[100%] ">
                <div className="w-full h-fit">
                    <p onClick={() => router.back()} className="mb-6 font-semibold cursor-pointer ">
                        {'< ย้อนกลับ'}
                    </p>
                    <h1>แบบบันทึกการนิเทศงานสหกิจศึกษา</h1>
                    <Divider />
                    <div className="flex gap-8 items-center ">
                        <div className="flex">
                            <p className="text-md  font-primary_noto pr-4 py-4">รหัสนักศึกษา</p>
                            <p className="text-md text-primary-500 font-bold font-primary_noto  rounded-xl p-4 bg-white ">{id?.toString()}</p>
                        </div>
                        <div className="flex">
                            <p className="text-md font-primary_noto p-4">ชื่อ</p>
                            <p className="text-md text-primary-500 font-bold font-primary_noto  rounded-xl p-4 bg-white ">
                                {stu_data?.getStudent?.name_prefix ? stu_data?.getStudent?.name_prefix : ''}{' '}
                                {stu_data?.getStudent?.name_th ? stu_data?.getStudent?.name_th : ''}{' '}
                                {stu_data?.getStudent?.lastname_th ? stu_data?.getStudent?.lastname_th : ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center ">
                        <div className="flex">
                            <p className="text-md  font-primary_noto pr-4 py-4">ชื่อสถานประกอบการ</p>
                            <p className="text-md text-primary-500 font-bold font-primary_noto  rounded-xl p-4 bg-white ">ดิจิโอจำกัด</p>
                        </div>
                        <div className="flex">
                            <p className="text-md font-primary_noto p-4">ชื่อหัวข้อโครงงาน</p>
                            <p className="text-md text-primary-500 font-bold font-primary_noto  rounded-xl p-4 bg-white ">-</p>
                        </div>
                    </div>
                    {/* <h3 className="text-xl font-bold font-primary_noto pt-8">หัวข้อการประเมิน</h3> */}

                    {stu_data?.getStudent?.company_assessment?.id ? (
                        <>
                            {score === 0 ? setScore(stu_data?.getStudent?.company_assessment?.score) : ''}
                            {/* {strengthList ? setDefaluseValueInput() : ''} */}
                            <ViewAssessmentCompany topics={Object.values(stu_data?.getStudent?.company_assessment?.assessment_obj)} />
                            <div className="py-8 overflow-hidden">
                                <div className=" flex justify-end w-full">
                                    <div className="bg-white w-fit border-2 border-primary-300 rounded-xl px-4 py-3">
                                        <p className="text-xl text-gray-500">
                                            คะแนนรวม<span className=" ml-4 font-bold text-gray-600">{score} / 40</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <AssessmentCompany topics={dataTopics} onUpdateTopics={handleSubtopicChange} />
                            <div className="py-8 overflow-hidden">
                                <div className=" flex justify-end w-full">
                                    <div className="bg-white w-fit border-2 border-primary-300 rounded-xl px-4 py-3">
                                        <p className="text-xl text-gray-500">
                                            คะแนนรวม<span className=" ml-4 font-bold text-gray-600">{score} / 40</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <h3 className="text-xl font-bold font-primary_noto pt-8">ตอนที่ 2 การปฏิบัติงานของนักศึกษาสหกิจศึกษา</h3>
                            <div className="bg-white rounded-2xl px-8 py-8 mt-4 shadow-sm border-solid border-1 border-gray-300 overflow-hidden">
                                <Form form={form}>
                                    <p>1. จุดเด่นของนักศึกษา / Strength</p>
                                    <div className="flex flex-col gap-2">
                                        {strengthList.map((singleStreng, index) => (
                                            <div key={index}>
                                                <div className="flex content-center">
                                                    <Form.Item
                                                        key={singleStreng.id}
                                                        id={singleStreng.id.toString()}
                                                        name={singleStreng.id}
                                                        rules={[{ validator: validateStrengthLength }]}
                                                        className="w-[85%] m-0 p-0"
                                                    >
                                                        <Input
                                                            name={`strength`}
                                                            size="large"
                                                            className="w-full mt-1"
                                                            value={singleStreng.strength}
                                                            onChange={(e) => handleStrengChange(e, index)}
                                                        ></Input>
                                                    </Form.Item>

                                                    {strengthList.length > 1 && (strengthList.length - 1 !== index || strengthList.length === 3) && (
                                                        <Button type="ghost" size="large" onClick={() => handleRemoveString(singleStreng.id)}>
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
                                                        key={singleImproved.id}
                                                        id={singleImproved.id.toString()}
                                                        name={singleImproved.id}
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
                                    <div className="w-fit border-2 border-primary-300 rounded-xl px-4 py-3">
                                        <p className="text-xl text-gray-500">
                                            คะแนนรวม<span className="ml-4 font-bold text-gray-600">{score} / 40</span>
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="mt-8 flex justify-end gap-12">
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Assessment;
