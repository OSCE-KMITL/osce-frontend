import React, { FC } from 'react';
import { Steps } from 'antd';
import { useCreateAnnouncementStep } from './useCreateAnnoucementStep';

const CreateAnnouncementStep: FC = () => {
    const { prevStep, nextStep, step, itemsStep } = useCreateAnnouncementStep();
    return (
        <>
            <Steps direction="horizontal" current={step} className="font-bold font-primary_noto flex justify-center " size={'default'} items={itemsStep} />
            <div className="flex justify-center w-full py-8 h-[80%] font-primary_noto">
                {/*here*/}
                {step === 0 && (
                    <div className="w-full flex h-full text-[16px] flex-col gap-8 ">
                        <div>
                            <p className="text-xl font-bold">หัวเรื่อง</p>
                            <input className="w-full bg-white px-2 py-2 border-2 outline-0 rounded-md"></input>
                        </div>
                        <div className="h-auto min-h-fit">
                            {' '}
                            <p className="text-xl font-bold">รายละเอียด</p>
                            <textarea className="w-full h-[50%] bg-white px-2 py-2 border-2 outline-0 rounded-md"></textarea>
                        </div>{' '}
                    </div>
                )}{' '}
                {step === 1 && (
                    <div className="w-full flex h-full text-[16px] flex-col gap-8 ">
                        <div>
                            <p className="text-xl font-bold">ไฟล์ที่เกี่ยวข้อง</p>
                            <input className="w-full bg-white px-2 py-2 border-2 outline-0 rounded-md"></input>
                        </div>
                    </div>
                )}
                {/*here*/}
            </div>
            <div className="flex w-full flex-row justify-end font-primary_noto text-[16px] align-middle items-center gap-2">
                {step !== 0 && (
                    <p onClick={prevStep} className="  text-primary-600 px-6 py-2 rounded-xl  cursor-pointer">
                        ย้อนกลับ
                    </p>
                )}
                <p onClick={nextStep} className=" bg-primary-500 font-semibold text-white px-6 py-2 rounded-xl  cursor-pointer">
                    ถัดไป
                </p>
            </div>
        </>
    );
};

export default CreateAnnouncementStep;
