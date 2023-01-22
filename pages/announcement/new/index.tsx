import React, { FC, useEffect, useState } from 'react';
import BreadcrumbComponent from '../../../components/common/Beardcrumb/Beardcrumb';
import { useCreateAnnouncement } from '../../../features/announcement/hooks/useCreateAnnouncement';
import { NotificationType } from '../../auth/login';
import { notification } from 'antd';
import LoadingSpinner from '../../../components/common/Spinner/LoadingSpinner';
import { useQuill } from 'react-quilljs';
import Button from '@ui/Button';
import Input from '@ui/Input';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { useForm } from 'react-hook-form';

type Inputs = {
    title: string;
    desc: string;
};

const CreatePostPage: FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const { quill, quillRef } = useQuill();
    const [description, setDescription] = useState('');
    const [descriptionLength, setDescriptionLength] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({ shouldUseNativeValidation: true, mode: 'onChange' });
    const [createPost, { loading }] = useCreateAnnouncement();
    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                // Get text only then set length for validation
                setDescriptionLength(quill.getText().length);
                // Get innerHTML using quill
                setDescription(quill.root.innerHTML);
            });
        }
    }, [quill]);

    const openNotificationWithIcon = (type: NotificationType, title: string, message: string) => {
        api[type]({
            message: title,
            description: message,
        });
    };

    function clearForm() {
        reset();
        quill.deleteText(0, 1500);
    }

    const onSubmit = async (data) => {
        await createPost({
            onCompleted: (result) => {
                if (result) {
                    openNotificationWithIcon('success', 'สร้างประกาศสำเร็จ', 'สร้างประกาศเสร็จสิ้น');
                    clearForm();
                }
            },
            onError: (error) => {
                if (error) {
                    openNotificationWithIcon('error', 'พบข้อผิดพลาดบางประการ', error.message);
                    clearForm();
                }
            },
            variables: {
                announcementInfo: {
                    title: data.title,
                    desc: description,
                },
            },
        });
    };

    const titleValidationOption: RegisterOptions = {
        required: 'จำเป็นต้องกรอกหัวข้อ',
        minLength: {
            message: 'ข้อมูลหัวข้อน้อยเกินไป',
            value: 5,
        },
        maxLength: {
            message: 'ข้อมูลหัวข้อมากเกินไป',
            value: 255,
        },
    };

    const minLengthDescription = descriptionLength < 10 ? true : false && <p>รายละเอียดน้อยเกินไป</p>;
    const maxLengthDescription = descriptionLength > 5000 ? true : false && <p>รายละเอียดน้อยเยอะเกินไป</p>;
    const requireDescription = descriptionLength === 0 ? true : false && <p>จำเป็นต้องมีรายละเอียดในการสร้างประกาศ</p>;
    const descriptValidation = minLengthDescription || maxLengthDescription || requireDescription;

    return (
        <div className="flex flex-col items-start gap-8 w-full min-h-full max-h-full  relative overflow-y-auto py-8">
            {contextHolder}
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> สร้างประกาศ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white h-auto min-h-screen gap-6 rounded-md px-8 py-8 font-primary_noto">
                <Input
                    errors={errors}
                    name={'title'}
                    type={'text'}
                    label={'หัวข้อ'}
                    register={register}
                    isError={errors.title && true}
                    validationSchema={titleValidationOption}
                />
                <div className="mb-6">
                    <div className="flex flex-row gap-2">
                        <label htmlFor="desc" className={`block mb-2 text-lg font-medium'text-gray-900'`}>
                            รายละเอียด
                        </label>{' '}
                    </div>
                    <div className={`border min-h-[300px] max-h-full mb-24 lg:mb-16 ${descriptValidation ? 'border border-red-400' : ''}`}>
                        <div className="border-none " ref={quillRef}></div>
                    </div>
                </div>

                <div className="flex flex-row w-full justify-end gap-4 ">
                    <Button onClick={clearForm} intent="secondary">
                        ล้างฟอร์ม
                    </Button>
                    <Button type={'submit'} intent="primary" isDisabled={descriptionLength < 10 ? true : false}>
                        {!loading && '+ สร้างประกาศไหม่'}
                        {loading && (
                            <span>
                                <LoadingSpinner />
                                loading...
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostPage;

/*
<div className="mb-6 mt-10 lg:mt-1">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">แนบไฟล์</label>
    <UploadWidget />
</div>*/

/*                  <Button type="submit" className=" px-4 py-3 bg-primary-500 text-white rounded-md" disabled={loading}>
                        {!loading && '+ สร้างประกาศไหม่'}
                        {loading && (
                            <span>
                                <LoadingSpinner />
                                loading...
                            </span>
                        )}
                    </Button>*/
