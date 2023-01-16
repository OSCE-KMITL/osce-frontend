import React, { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../state/store';
import { AnnouncementProps } from '../../features/announcement/types';
import { useGetAnnouncements } from '../../features/announcement/hooks/useGetAnnouncement';
import BreadcrumbComponent from '../../components/common/Beardcrumb/Beardcrumb';

interface OwnProps {}

type Props = OwnProps;

const AnnouncementContent: FunctionComponent<Props> = () => {
    const router = useRouter();
    const { id } = router.query;
    const { announcements } = useAppSelector((state) => state.announcement);
    const [content, setContent] = useState<AnnouncementProps | null>(null);

    const { refetch } = useGetAnnouncements();
    useEffect(() => {
        if (!announcements) {
            router.push('/announcement');
            refetch().then();
        } else {
            const ann = announcements.find((data) => data.id === id);
            setContent(ann);
        }
    }, [announcements]);

    return (
        <div className="flex flex-col items-start gap-4 w-full min-h-full max-h-full  relative overflow-y-auto py-8">
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> สร้างประกาศ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            <div className="w-full bg-white h-auto min-h-screen gap-6 rounded-md px-8 py-8 font-primary_noto">
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        หัวข้อ
                    </label>
                    <div
                        id="title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                    >
                        contetnet here
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="desc" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        รายละเอียด
                    </label>
                    <div className="h-[300px] mb-24 lg:mb-16">
                        {/*<RichTextEditor value={desc} onChange={setDesc} className={'h-[300px] border-2 border-red-500'}></RichTextEditor>*/}
                        {/*<RichtextDisplay content={content.description} />*/}
                        desc here
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementContent;
