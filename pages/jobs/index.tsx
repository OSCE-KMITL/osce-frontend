import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Card } from 'antd';
interface OwnProps {}

type Props = OwnProps;

const testData = [
    {
        id: 1,
        job_title: 'Frontend dev',
        salary: 300,
    },
    {
        id: 2,
        job_title: 'Backend dev',
        salary: 500,
    },
    {
        id: 3,
        job_title: 'Network Admin',
        salary: 400,
    },
];

const jobs: FunctionComponent<Props> = () => {
    return (
        <div className="w-full px-16 flex flex-col mt-16 gap-2">
            <h1>jobs</h1>
            {testData.map((prod) => (
                <Card
                    key={prod.id}
                    title={prod.job_title}
                    extra={
                        <Link legacyBehavior key={prod.id} href="/jobs/[jobId]" as={`/jobs/${prod.id}`}>
                            <div>
                                <a>more</a>
                            </div>
                        </Link>
                    }
                    style={{ width: 300 }}
                >
                    <p>salary: {prod.salary}</p>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            ))}
        </div>
    );
};

export default jobs;
