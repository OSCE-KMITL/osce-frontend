import { Button, Divider, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {} from '@features/job/hooks/useEditStateJob';
import NotificationService from '@lib/ant_service/NotificationService';
import AssessmentCompany, { Topic } from '@components/Assessment/Assessment';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCreateCompanyAssessment } from '@features/assessment/hooks/useCreateCompanyAssessment';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import ViewAssessmentCompany from '@components/Assessment/ViewAssessment';
import { ExclamationCircleFilled } from '@ant-design/icons';

const Assessment: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [form] = Form.useForm();
    const notification = NotificationService.getInstance();
    const [strengthList, setStrengList] = useState<Strength[]>([{ strength: '', id: Date.now() }]);
    const [score, setScore] = useState(0);
    const [createCompanyAssessment, { loading: create_company_assessment_loading }] = useCreateCompanyAssessment();
    const { data: stu_data, loading: stu_loading, error: stu_error, refetch: refetch_stu_data } = useGetStudent(id?.toString());
    const { data: dataGetMe, refetch: refectch_me } = useGetMe();
    const [improvedList, setImprovedList] = useState<Improvement[]>([{ improved: '', id: Date.now() }]);
    const { confirm } = Modal;

    useEffect(() => {
        refectch_me();
    }, []);

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
        {
            id: 4,
            name: 'ด้านที่ 4 ลักษณะส่วนบุคคล / Personality ',
            subtopics: [
                {
                    id: 14,
                    question: '1. บุคลิกภาพและการวางตัว / Personality',
                    details: 'มีบุคลิกภาพอละวางตัวให้เหมาะสม เช่น ทัศนคติ วุฒิภาวะ ความอ่อนน้อมถ่อมตน การแต่งกาย กิริยาวาจา การตรงต่อเวลา และอื่น ๆ',
                    answer: null,
                },
                {
                    id: 15,
                    question: '2. มนุษยสัมพันธ์ / Interpersonal Skills',
                    details:
                        'สามารถร่วมงานกับผู้อื่น การทำงานเป็นทีม สร้างมนุษยสัมพันธ์ได้ดี เป็นที่รักใคร่ชอบพอของผู้ร่วมงาน เป็นผู้ที่ช่วยก่อให้เกิดความร่วมมือประสานงาน',
                    answer: null,
                },
                {
                    id: 16,
                    question: '3. ความมีระเบียบวินัย ปฏิบัติตามวัฒนธรรมองค์กร / Discipline and Adaptability to Corporate Culture',
                    details:
                        'ความสนใจเรียนรู้ ศึกษา กฎระเบียบ นโยบายต่าง ๆ และปฏิบัติตามโดยเต็มใจ การปฏิบัติตามระเบียบบริหารงานบุคคล (การเข้างาน ลางาน) ปฏิบัติตามกฎการรักษาความปลอดภัยในโรงงานการควบคุมคุณภาพ 5 ส. และอื่น ๆ',
                    answer: null,
                },
                {
                    id: 17,
                    question: '4. คุณธรรมและจริยธรรม / Ethics and Morality',
                    details: 'มีความซื่อสัตย์สุจริต มีจิตใจสะอาดรู้จักเสียสละ ไม่เห็นแก่ตัว มีน้ำใจ เอื้อเฟื้อช่วยเหลือผู้อื่น',
                    answer: null,
                },
                {
                    id: 18,
                    question: '5. การตรงต่อเวลาและการทำงาน / Punctuality and Promptness',
                    details: 'ประเมินจาการ ลาป่วย/ลากิจ/ขาดงาน/สาย (ประเมินผลตามดุลยพินิจของผู้ประเมิน)',
                    answer: null,
                },

                // ...
            ],
        },
        {
            id: 5,
            name: 'ด้านที่ 5 การจัดทำรายงานสหกิจศึกษา / Report ',
            subtopics: [
                {
                    id: 19,
                    question: '1. การวางแผนและความสม่ำเสมอการจัดทำโครงงานสหกิจศึกษา / Paining and Progress of Cooperative Project',
                    details: 'มีการวางแผนในการทำโครงงาน มีความถูกต้องตามหลักวิชาการ และปรึกษาผู้นิเทศงานอย่างสม่ำเสมอ',
                    answer: null,
                },
                {
                    id: 15,
                    question: '2. คุณภาพของรายงานฉบับสมบูรณ์ / Quality of Final Report',
                    details: 'รายงานฉบับสมบูรณ์มีความสวยงามถูกต้อง มีรูปแบบและองค์ประกอบครบตามหลักวิชาการ',
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
        setStrengList([...strengthList, { strength: '', id: Date.now() }]);
    };

    const handleAddImproved = () => {
        setImprovedList([...improvedList, { improved: '', id: Date.now() }]);
    };

    const handleRemoveString = (id: number) => {
        const list = [...strengthList];
        const new_list = list.filter((i) => i.id !== id);
        setStrengList(new_list);
    };

    const handleRemoveImprove = (index: number) => {
        const list = [...improvedList];
        list.splice(index, 1);
        setImprovedList(list);
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

    const handleStrengChange = (e, index: number) => {
        const { name, value } = e.target;
        const list = [...strengthList];
        list[index][name] = value;
        setStrengList(list);
    };

    const handleImprovedChange = (e, index: number) => {
        const { name, value } = e.target;
        const list = [...improvedList];
        list[index][name] = value;
        setImprovedList(list);
    };

    const validateStrengthLength = (rule: any, value: string, callback: any) => {
        if (value && value.length > 500) {
            callback('ไม่สามารถกรอกข้อมูลเกิน 500 ตัวอักษร');
        }
        callback();
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

    const showDeleteConfirm = () => {
        confirm({
            title: 'คุณแน่ใจหรือไม่ว่าต้องการบันทึกการประเมินนี้?',
            icon: <ExclamationCircleFilled />,
            content: 'หากบันทึกการประเมินแล้ว จะไม่สามารถแก้ไขการประเมินได้',
            okText: 'ยืนยัน',
            okType: 'danger',
            cancelText: 'ยกเลิก',
            onOk() {
                handleSubmit();
            },
            onCancel() {},
        });
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
                    <h3 className="text-xl font-bold font-primary_noto pt-8">ตอนที่ 1 การปฏิบัติงานของนักศึกษาสหกิจศึกษา</h3>

                    {stu_data?.getStudent?.company_assessment?.id ? (
                        <>
                            {score === 0 ? setScore(stu_data?.getStudent?.company_assessment?.score) : ''}
                            {/* {strengthList ? setDefaluseValueInput() : ''} */}
                            <ViewAssessmentCompany topics={Object.values(stu_data?.getStudent?.company_assessment?.assessment_obj)} />
                            <h3 className="text-xl font-bold font-primary_noto pt-8">ตอนที่ 2 การปฏิบัติงานของนักศึกษาสหกิจศึกษา</h3>
                            <div className="bg-white rounded-2xl px-8 py-8 mt-4 shadow-sm border-solid border-1 border-gray-300 overflow-hidden">
                                <p>1. จุดเด่นของนักศึกษา / Strength</p>
                                {stu_data?.getStudent?.company_assessment?.strength ? (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            {stu_data?.getStudent?.company_assessment?.strength?.split('|').map((singleStreng, index) => (
                                                <div key={index}>
                                                    <div className="flex content-center">
                                                        <Input name={`strength`} size="large" className="w-full mt-1" value={singleStreng} disabled></Input>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex content-center">
                                            <Input name={`strength`} size="large" className="w-full mt-1" value={'ไม่ระบุข้อมูล'} disabled></Input>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-8">2. ข้อควรปรับปรุงของนักศึกษา / Improvement</p>
                                {stu_data?.getStudent?.company_assessment?.improvement ? (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            {stu_data?.getStudent?.company_assessment?.improvement?.split('|').map((singleImproved, index) => (
                                                <div key={index}>
                                                    <div className="flex content-center">
                                                        <Input name={`strength`} size="large" className="w-full mt-1" value={singleImproved} disabled></Input>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex content-center">
                                            <Input name={`strength`} size="large" className="w-full mt-1" value={'ไม่ระบุข้อมูล'} disabled></Input>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end w-full mt-8">
                                    <div className="w-fit border-2 border-primary-300 rounded-xl px-4 py-3">
                                        <p className="text-xl text-gray-500">
                                            คะแนนรวม<span className="ml-4 font-bold text-gray-600">{score} / 40</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
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
                            </div>
                            <div className="mt-16 flex justify-end gap-12">
                                {/* <button className="px-2 py-2 rounded-md w-fit  h-[60%]   border-gray-300 text-xl text-gray-400" onClick={() => router.back()}>
                            ยกเลิก
                        </button> */}
                                <button
                                    type="submit"
                                    className="px-2 py-2 rounded-md w-40 bg-green-600 h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-100"
                                    onClick={showDeleteConfirm}
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
