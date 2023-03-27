import { Button, Divider, Radio, RadioChangeEvent, Space, Statistic, Table, TableColumnsType, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCompnayApproveJob, useCompnayDisapproveJob, useUndoCompnayApproveJob, useUndoCompnayDisapproveJob } from '@features/job/hooks/useEditStateJob';
import NotificationService from '@lib/ant_service/NotificationService';

const Assessment: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [value3, setValue3] = useState('Apple');

    const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };

    const options = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
    ];
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

                    <div className=" bg-white rounded-2xl px-8 py-8 mt-4 shadow-sm border-solid border-1 border-gray-300 overflow-hidden  ">
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="grid grid-cols-2 gap-4">
                                    <h3 className="text-xl text-primary-500">ด้านที่ 1 ผลสำเร็จของงาน / Work Achievement</h3>
                                    <div className="flex w-full justify-between gap-16 text-md text-gray-600  font-primary_noto">
                                        <p className=" ">5 = ดีเยี่ยม</p>
                                        <p className="">4 = ดี</p>
                                        <p className=" ">3 = พอใช้</p>
                                        <p className=" ">2 = ต้องปรับปรุง</p>
                                        <p className=" ">1 = ไม่เป็นที่พอใจ</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 "></div>
                                <div className="w-full h-fit   grid grid-cols-2 pt-4 gap-4 ">
                                    <div className="flex flex-col justify-center ">
                                        <p className="">1.ปริมาณงาน / Quantity of Work</p>
                                        <p className="pl-4 text-gray-600">
                                            {`ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่กำหนด และ เทียบกับนักศึกษาทั่ว ๆ ไป`}
                                        </p>
                                    </div>

                                    <div className="h-full flex justify-center items-center">
                                        <Radio.Group optionType="button" defaultValue="a" className="flex w-full ">
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center " value="5">
                                                5
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="4">
                                                4
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="3">
                                                3
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="2">
                                                2
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="1">
                                                1
                                            </Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="w-full h-fit   grid grid-cols-2 pt-4 gap-4 ">
                                    <div className="flex flex-col justify-center  ">
                                        <p className="">2.คุณภาพของงาน / Quality of Work</p>
                                        <p className="pl-4 text-gray-600">
                                            {`ทำงานได้ถูกต้องครบถ้วนสมบูรณ์ มีความประณีตเรียบร้อยมีความละเอียดรอบคอบ ไม่เกิดปัญหาตามมา ทำงานเสร็จทันเวลาหรือ ก่อนเวลาที่กำหนด`}
                                        </p>
                                    </div>

                                    <div className="h-full flex justify-center items-center">
                                        <Radio.Group optionType="button" defaultValue="a" className="flex w-full ">
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="5">
                                                5
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="4">
                                                4
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="3">
                                                3
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="2">
                                                2
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="1">
                                                1
                                            </Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl text-primary-500">ด้านที่ 2 ความรู้ความสามารถ / Knowledge and Ability </h3>
                                <div className="flex flex-col gap-4 "></div>
                                <div className="w-full h-fit   grid grid-cols-2 pt-4 gap-4 ">
                                    <div className="flex flex-col justify-center ">
                                        <p className="">1.ความรู้ความสามารถทางวิชาการ / Academic Ability</p>
                                        <p className="pl-4 text-gray-600">
                                            {`นักศึกษามีความรู้ทางวิชาการเพียงพอที่จะทำงานตามที่ได้รับมอบหมาย (ในระดับที่นักศึกษาจะปฏิบัติได้)`}
                                        </p>
                                    </div>

                                    <div className="h-full flex justify-center items-center">
                                        <Radio.Group optionType="button" defaultValue="a" className="flex w-full ">
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center " value="5">
                                                5
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="4">
                                                4
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="3">
                                                3
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="2">
                                                2
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="1">
                                                1
                                            </Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="w-full h-fit   grid grid-cols-2 pt-4 gap-4 ">
                                    <div className="flex flex-col justify-center ">
                                        <p className="">2.ความสามารถในการเรียนรู้และประยุกต์วิชาการ / Ability to Learn and Apply Knowledge</p>
                                        <p className="pl-4 text-gray-600">
                                            {`ความสามารถในการเรียนรู้ เข้าใจข้อมูล ข่าวสาร และวิธีการทำงาน ตลอดจนการนำความรู้ไปประยุต์ใช้งาน`}
                                        </p>
                                    </div>

                                    <div className="h-full flex justify-center items-center">
                                        <Radio.Group optionType="button" defaultValue="a" className="flex w-full ">
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="5">
                                                5
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="4">
                                                4
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="3">
                                                3
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="2">
                                                2
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="1">
                                                1
                                            </Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="w-full h-fit   grid grid-cols-2 pt-4 gap-4 ">
                                    <div className="flex flex-col justify-center">
                                        <p className="">3.ทักษะความชำนาญด้านปฏิบัติการ / Practical ability</p>
                                        <p className="pl-4 text-gray-600">{`เช่น การปฏิบัติงานในภาคสนามในห้องปฏิบัติการ`}</p>
                                    </div>

                                    <div className="h-full flex justify-center items-center">
                                        <Radio.Group optionType="button" defaultValue="a" className="flex w-full ">
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="5">
                                                5
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="4">
                                                4
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="3">
                                                3
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="2">
                                                2
                                            </Radio.Button>
                                            <Radio.Button className="w-full h-[50px] flex items-center justify-center" value="1">
                                                1
                                            </Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Assessment;
