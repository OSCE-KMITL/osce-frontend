import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import BreadcrumbComponent from '../../components/common/Beardcrumb/Beardcrumb';
import { useGetPost } from '../../features/announcement/hooks/useGetPost';
import RichtextDisplay from '../../components/RichTextEditor/RichtextDisplay/RichtextDisplay';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import SkeletonLoading from '@ui/SkeletonLoading';
import { RoleOption } from '../../constants/RoleOptions';
import { AuthenticationContext } from '../../context/AuthContextProvider';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useDeletePost } from '../../features/announcement/hooks/useDeletePost';
import Button from '@ui/Button';

interface OwnProps {}

type Props = OwnProps;

const AnnouncementContent: FunctionComponent<Props> = () => {
    const router = useRouter();
    const { id } = router.query;
    const { me } = useContext(AuthenticationContext);
    const { data, error, loading } = useGetPost(id as string);
    const [deletePost, { data: deleteData, loading: deleteLoading, error: deleteError }] = useDeletePost(id as string);

    if (loading) {
        return <SkeletonLoading />;
    }
    if (error) {
        return <h1>{error.message}</h1>;
    }

    return (
        <div className="flex flex-col items-start gap-4 w-full min-h-full max-h-full  relative overflow-y-auto py-8">
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> สร้างประกาศ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            <div className="w-full flex flex-row justify-between items-center gap-2 font-primary_noto ">
                <div className=" flex flex-row gap-2 font-primary_noto ">
                    <p className="  px-4 py-2 rounded-md  cursor-pointer">
                        <ClockCircleOutlined className={'text-xl'} /> {new Date(data.getAnnouncement.createdAt).toLocaleDateString('en-US')}{' '}
                    </p>
                    <div className=" gap-2 flex justify-center align-middle items-center  flex-row  font-normal text-gray-500 text-clip  overflow-hidden ">
                        <UserOutlined className="text-lg" />
                        <p className="text-sm">
                            {data.getAnnouncement.advisor_id.name} {data.getAnnouncement.advisor_id.last_name}
                        </p>
                    </div>
                </div>
                {me?.role === RoleOption.COMMITTEE && (
                    <Button
                        onClick={async () => {
                            await deletePost({
                                onCompleted: (data) => {
                                    if (data) {
                                        router.push('/announcement');
                                    }
                                },
                            });
                        }}
                        intent="danger"
                    >
                        ลบประกาศ
                    </Button>
                )}
            </div>
            <div className="w-full bg-white h-auto min-h-screen gap-6 rounded-md px-8 py-8 font-primary_noto">
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        หัวข้อ
                    </label>
                    <div id="title" className="shadow-sm bg-gray-100 text-gray-900 text-sm rounded-lg focus:border-blue-500 outline-0 block w-full p-2.5 ">
                        {error && <RichtextDisplay content={error.message} />}
                        {loading && <LoadingSpinner />}
                        {data?.getAnnouncement.title}
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="desc" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        รายละเอียด
                    </label>
                    <div className="h-[300px] bg-gray-100 rounded-md px-4 py-4 mb-24 lg:mb-16">
                        {error && <RichtextDisplay content={error.message} />}
                        {loading && <LoadingSpinner />}
                        {data && <RichtextDisplay content={data?.getAnnouncement.description} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementContent;
