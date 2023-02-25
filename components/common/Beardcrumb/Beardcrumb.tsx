import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface OwnProps {}

type Props = OwnProps;

const BreadcrumbComponent: FunctionComponent<Props> = () => {
    const router = useRouter();
    const [paths, setPaths] = useState<string[]>([]);
    useEffect(() => {
        const currentPath = router.asPath.split('/');
        setPaths([...currentPath]);
    }, [router.pathname]);

    return (
        <div className="flex mb-6 items-center align-middle " aria-label="Breadcrumb">
            <ol className="flex justify-center items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        Home
                    </Link>
                </li>
                {paths?.slice(1, 5).map((path, index) => (
                    <li key={index}>
                        {index !== 1 ? (
                            <div className="flex items-center">
                                <p className={'mx-2'}>{'>'}</p>
                                <Link href={'/' + path}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <a href="" className={'mx-2'}>
                                    {'>'}
                                </a>
                                <a href="">Detail</a>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default BreadcrumbComponent;

/*<Breadcrumb style={{ margin: '16px 0px' }}>
    <Breadcrumb.Item>
        <Link href={'/'}>Home</Link>
    </Breadcrumb.Item>
    {paths.slice(1, 5).map((path, index) => (
        <>
            {index !== paths.length - 2 ? (
                <Breadcrumb.Item key={path}>
                    <Link href={'/' + path}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>
                </Breadcrumb.Item>
            ) : (
                <Breadcrumb.Item key={index}>
                    <p>{path.charAt(0).toUpperCase() + path.slice(1)}</p>
                </Breadcrumb.Item>
            )}
        </>
    ))}
</Breadcrumb>;*/
