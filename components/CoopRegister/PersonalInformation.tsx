import React, { FC } from 'react';
import Input from '@ui/Input';
import { DatePicker } from 'antd';
import { useRegisterFromState } from '../../features/register-coop/useFormState';

const PersonalInformation: FC = () => {
    const { register, errors } = useRegisterFromState();
    return (
        <>
            <div className=" w-full p-6 rounded-md bg-white my-6">
                <div className="flex flex-row justify-between w-full my-6">
                    {' '}
                    <div className="w-[30%]">
                        <p className="text-[18px] font-bold">ข้อมูลประจำตัว</p>
                        <p className="text-[16px] text-gray-400">กรอกข้อมูลประจำตัวเพื่อใช้ในการสร้างใบสมัครอัตโนมัติ</p>
                    </div>
                    <div className="w-[70%] ">
                        <Input
                            name={'name'}
                            type="text"
                            label={'เลขบัตรประจำตัวประชาชน 13 หลัก'}
                            placeholder={'1234567890000'}
                            fullWidth
                            register={register}
                            isError={errors.name && true}
                            errors={errors}
                        />{' '}
                        <Input
                            name={'address'}
                            type="text"
                            label={'ที่อยู่ปัจจุบัน'}
                            placeholder={'ตัวอย่าง : หอพักอยู่สบาย 1471/1 ถนนลาดกระบัง แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520'}
                            fullWidth
                            register={register}
                            isError={errors.name && true}
                            errors={errors}
                        />{' '}
                        <div className="mb-4 ">
                            <label htmlFor="countries" className="block text-[16px] font-medium text-gray-900 dark:text-white">
                                วันเกิด
                            </label>
                            <DatePicker
                                className={'py-2 w-full'}
                                onChange={(data) => {
                                    console.log(data);
                                }}
                            />
                        </div>
                        <div className=" flex flex-row w-full grid grid-cols-3 gap-4">
                            <div>
                                {' '}
                                <label htmlFor="relation" className="block  text-[16px] font-medium text-gray-900 dark:text-white">
                                    เพศ
                                </label>
                                <select
                                    id="relation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option hidden disabled>
                                        เลือกเพศ
                                    </option>
                                    <option key={'men'} value={'ชาย'}>
                                        ชาย
                                    </option>
                                    <option key={'women'} value={'หญิง'}>
                                        หญิง
                                    </option>
                                    <option key={'unspecified '} value={'ไม่ต้องการระบุ'}>
                                        ไม่ต้องการระบุ
                                    </option>
                                </select>{' '}
                            </div>
                            <Input
                                name={'weight'}
                                type="number"
                                label={'น้ำหนัก (kg)'}
                                fullWidth
                                register={register}
                                isError={errors.gpa && true}
                                errors={errors}
                                placeholder={'75'}
                            />{' '}
                            <Input
                                name={'height'}
                                type="number"
                                label={'ส่วนสูง (cm)'}
                                fullWidth
                                register={register}
                                isError={errors.gpa && true}
                                errors={errors}
                                placeholder={'70'}
                            />{' '}
                        </div>
                        <div className=" mb-4  ">
                            {' '}
                            <label htmlFor="religion" className="block  text-[16px] font-medium text-gray-900 dark:text-white">
                                ศาสนา
                            </label>
                            <select
                                id="religion"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value={'พุทธ'}>พุทธ</option>
                                <option value={'อิสลาม'}>อิสลาม</option>
                                <option value={'คริสต์'}>คริสต์</option>
                                <option value={'ฮินดู'}>ฮินดู</option>
                                <option value={'อื่น ๆ'}>อื่น ๆ</option>
                                <option value={'ไม่ต้องการระบุ'}>ไม่ต้องการระบุ</option>
                            </select>{' '}
                        </div>
                        <div className="flex items-center mb-4  ">
                            <input
                                id="military_status"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                            />
                            <label htmlFor="military_status" className="ml-2 text-[16px] font-medium text-gray-900 dark:text-gray-300">
                                ผ่านการเกณฑ์ทหารแล้ว
                            </label>
                        </div>{' '}
                        <div className="flex items-center  ">
                            <input
                                id="driver_license"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                            />
                            <label htmlFor="driver_license" className="ml-2 text-[16px] font-medium text-gray-900 dark:text-gray-300">
                                มีใบอนุญาติขับขี่รถยนต์
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between w-full my-6">
                    {' '}
                    <div className="w-[30%]">
                        <p className="text-[18px] font-bold">บุคคลที่ติดต่อได้ในกรณีฉุกเฉิน</p>
                    </div>
                    <div className="w-[70%] ">
                        <div className={'grid grid-cols-3 gap-4'}>
                            <Input
                                name={'parent'}
                                type="text"
                                label={'ชื่อ-สกุล'}
                                placeholder={'นานี สวยมาก'}
                                fullWidth
                                register={register}
                                isError={errors.name && true}
                                errors={errors}
                            />{' '}
                            <div>
                                {' '}
                                <label htmlFor="relation" className="block  text-sm font-medium text-gray-900 dark:text-white">
                                    ความสัมพันธ์
                                </label>
                                <select
                                    id="relation"
                                    placeholder={'เลือกความสัมพันธ์'}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option>บิดา-มารดา</option>
                                    <option>พี่สาว-พี่ชาย</option>
                                    <option>ญาติ</option>
                                    <option>คู่สมรส</option>
                                    <option>ผู้ปกครอง</option>
                                    <option>อาจารย์-ครู</option>
                                    <option>อื่นๆ </option>
                                </select>{' '}
                            </div>
                            <Input
                                name={'phone_number'}
                                type="text"
                                label={'เบอร์โทร'}
                                placeholder={'0612345678'}
                                fullWidth
                                register={register}
                                isError={errors.name && true}
                                errors={errors}
                            />{' '}
                        </div>{' '}
                    </div>{' '}
                </div>{' '}
            </div>
        </>
    );
};

export default PersonalInformation;
