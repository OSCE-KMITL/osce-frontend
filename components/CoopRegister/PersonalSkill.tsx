import React, { FC } from 'react';
import Input from '@ui/Input';
import { checkIsSelected, ISkillState } from '@features/register-coop/interfaces';
import { useForm } from 'react-hook-form';
import { handleAddSkill, skillsStateSelector, handleDiscardSkill } from '@features/register-coop/coopregister.slice';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/outline';

interface OwnProps {}

type Props = OwnProps;

const PersonalSkill: FC<Props> = (props) => {
    const {
        register: personalSillRegister,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ISkillState>({ shouldUseNativeValidation: true, mode: 'onChange' });
    const skills = useSelector(skillsStateSelector);

    const dispatch = useDispatch();

    function onAddSkill(data) {
        dispatch(handleAddSkill(data));
        reset();
    }

    function alreadySkillExist(value: string) {
        const already = skills.find((obj) => obj.skill_name.trim().toLowerCase() === value.trim().toLowerCase());
        if (already) {
            return 'พบข้อมูลที่ซ้ำกัน';
        }
    }

    const added_skill = skills.map((skill, index) => (
        <div className="col-span-7 grid grid-cols-7 gap-x-6  items-start " key={index}>
            <div className="col-span-3 text-black text-[20px] mb-4  border border-gray-100 rounded-md px-3 py-3 bg-gray-100">
                <p>{skill.skill_name}</p>
            </div>{' '}
            <div className="col-span-3 text-black text-[20px]  mb-4 border border-gray-100 rounded-md px-3 py-3 bg-gray-100">
                <p>{skill.level}</p>
            </div>{' '}
            <div className="col-span-1 flex py-1 items-center">
                <div
                    onClick={() => dispatch(handleDiscardSkill(skill.skill_name))}
                    className=" flex  cursor-pointer text-black px-2 py-2 rounded-full  text-[18px]"
                >
                    <TrashIcon className="w-8 h-8  text-gray-500 hover:text-red-400"></TrashIcon>
                </div>
            </div>
        </div>
    ));
    return (
        <form className=" w-full p-6 rounded-md bg-white my-6">
            <div className="flex flex-col justify-between w-full my-6">
                <div className=" mb-6">
                    <p className="text-3xl font-bold">
                        ความสามารถ/ทักษะ <span className="text-gray-400 font-medium text-xl">(ขั้นต่ำ 1 ทักษะ)</span>{' '}
                    </p>
                </div>
                <div className="grid grid-cols-7 gap-x-6 ">
                    {added_skill}
                    {skills.length !== 5 && (
                        <>
                            <div className="col-span-3">
                                {' '}
                                <Input
                                    name={'skill_name'}
                                    type="string"
                                    step
                                    label={'ทักษะ'}
                                    fullWidth
                                    register={personalSillRegister}
                                    isError={errors.skill_name && true}
                                    errors={errors}
                                    placeholder={'python'}
                                    validationSchema={{ maxLength: 50, required: 'กรุณาให้ข้อมูล', validate: alreadySkillExist }}
                                />{' '}
                            </div>
                            <div className=" col-span-3 ">
                                <label htmlFor="emer_relation" className="block  text-[20px] font-medium text-gray-900 dark:text-white">
                                    ระดับความสามารถ/ทักษะ
                                </label>
                                <select
                                    id="level"
                                    defaultValue={'DEFAULT'}
                                    {...personalSillRegister('level', {
                                        validate: (value) => checkIsSelected(value),
                                    })}
                                    className="bg-gray-50 border text-[18px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value={'DEFAULT'} hidden disabled>
                                        เลือกระดับความสามารถ
                                    </option>
                                    <option value={'Excellent'}>Excellent</option>
                                    <option value={'Good'}>Good</option>
                                    <option value={'Fair'}>Fair</option>
                                    <option value={'Poor'}>Poor</option>
                                </select>{' '}
                            </div>
                            <div onClick={handleSubmit(onAddSkill)} className="col-span-1 flex justify-center align-middle items-center">
                                <div className=" flex justify-center cursor-pointer gap-4 align-middle items-center text-primary-500 w-full px-4 py-3 rounded-md border border-primary-500 text-[18px]">
                                    <p> +เพิ่มทักษะ</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
};

export default PersonalSkill;
