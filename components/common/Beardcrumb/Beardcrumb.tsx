import React, { FunctionComponent } from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface OwnProps {}

type Props = OwnProps;

const BreadcrumbComponent: FunctionComponent<Props> = (props) => {
    const router = useRouter();
    const paths = router.pathname.split('/');
    return (
        <Breadcrumb style={{ margin: '16px 0px' }}>
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
        </Breadcrumb>
    );
};

export default BreadcrumbComponent;
