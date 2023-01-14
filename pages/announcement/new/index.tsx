import React, { FunctionComponent, useState } from 'react';
import BreadcrumbComponent from '../../../components/common/Beardcrumb/Beardcrumb';

import UploadWidget from '../../../components/UploadWidget/UploadWidget';

interface OwnProps {}

type Props = OwnProps;

const CreatePostPage: FunctionComponent<Props> = (props) => {
    const [file, setFile] = useState<File | null>(null);
    const handleSubmit = (event) => {};
    const uploadFile = () => {
        const data = new FormData();
        data.append('file', file);
    };
    return (
        <div className="flex flex-col items-start gap-8 w-full min-h-full max-h-full  relative overflow-y-auto py-8">
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> สร้างประกาศ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            <form className="w-full bg-white h-full min-h-screen gap-6 rounded-md px-8 py-8 font-primary_noto">
                {/*         <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        หัวข้อ
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="หัวข้อประชาสัมพันธ์ 10 - 500 ตัวอักษร"
                        required
                    />
                </div>{' '}
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        รายละเอียด
                    </label>
                    <div className="h-[300px] mb-24 lg:mb-16">
                        <RichTextEditor className={'h-[300px]'}></RichTextEditor>
                    </div>
                </div>*/}
                <UploadWidget />
                <div className="mb-6 mt-10 lg:mt-1">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        แนบไฟล์
                    </label>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <input
                        type="file"
                        onChange={(event) => {
                            const files = event.target.files;
                            setFile(files[0]);
                        }}
                    />
                </div>{' '}
                <div onClick={(event) => {}}>Submit</div>
            </form>
        </div>
    );
};

export default CreatePostPage;
/*<Dragger
    name={'file'}
    multiple={true}
    beforeUpload={(file) => {}}
    action={null}
    accept={'.png'}
    onDrop={(file) => {}}
    onChange={(file) => {
        console.log(file);
    }}
>
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
</Dragger>;*/
