import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface OwnProps {}

type Props = OwnProps;

const ErrorPage: FunctionComponent<Props> = () => {
    const router = useRouter();
    const { params } = router.query;

    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-xl text-center font-primary_noto">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only">Error</span>401
                    </h2>{' '}
                    <p className="text-2xl font-semibold md:text-3xl">{'ไม่สามารถเข้าสู่ระบบได้โปรดติดต่อผู้ดูแลระบบ'}</p>
                    <p className="mt-4 mb-8 ">ขออภัยในความไม่สะดวก</p>
                    <Link rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">
                        กลับไปหน้าแรก
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
