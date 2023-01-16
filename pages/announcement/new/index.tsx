import React, { FC, useEffect, useState } from 'react';
import BreadcrumbComponent from '../../../components/common/Beardcrumb/Beardcrumb';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import RichtextDisplay from '../../../components/RichTextEditor/RichtextDisplay/RichtextDisplay';
import { useCreateAnnouncement } from '../../../features/announcement/hooks/useCreateAnnouncement';
import { NotificationType } from '../../auth/login';
import { notification } from 'antd';
import LoadingSpinner from '../../../components/common/Spinner/LoadingSpinner';
import { useQuill } from 'react-quilljs';

type Inputs = {
    title: string;
    desc: string;
};

const CreatePostPage: FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const { quill, quillRef } = useQuill();

    const [description, setDescription] = useState('');
    const [descriptionLength, setDescriptionLength] = useState(0);

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                // Get text only then set length for validation
                setDescriptionLength(quill.getText().length);
                console.log(descriptionLength);
                // Get innerHTML using quill
                setDescription(quill.root.innerHTML);
                console.log(quill.root.innerHTML);
            });
        }
    }, [quill]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({ shouldUseNativeValidation: true });
    const [createPost, { loading }] = useCreateAnnouncement();

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

    return (
        <div className="flex flex-col items-start gap-8 w-full min-h-full max-h-full  relative overflow-y-auto py-8">
            {contextHolder}
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> สร้างประกาศ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white h-auto min-h-screen gap-6 rounded-md px-8 py-8 font-primary_noto">
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        หัวข้อ
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="หัวข้อประชาสัมพันธ์ 5 - 255 ตัวอักษร"
                        {...register('title', {
                            required: 'จำเป็นต้องกรอกหัวข้อการประกาศ',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 5,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} />
                </div>
                <div className="mb-6">
                    <label htmlFor="desc" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        รายละเอียด
                    </label>
                    <div className="h-[300px] mb-24 lg:mb-16">
                        {/*<RichTextEditor value={desc} onChange={setDesc} className={'h-[300px] border-2 border-red-500'}></RichTextEditor>*/}
                        <div ref={quillRef}></div>
                    </div>
                    <RichtextDisplay content={description} />
                </div>
                <div className="flex flex-row w-full justify-end gap-4 ">
                    <div onClick={clearForm} className=" px-4 py-3 text-black self-center cursor-pointer">
                        ล้างฟอร์ม
                    </div>{' '}
                    <button type={'submit'} className=" px-4 py-3 bg-primary-500 text-white rounded-md  " disabled={loading}>
                        {!loading && '+ สร้างประกาศไหม่'}
                        {loading && (
                            <span>
                                <LoadingSpinner />
                                loading...
                            </span>
                        )}
                    </button>
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
