import React, { FunctionComponent, useEffect } from 'react';
import Link from 'next/link';
import { Card } from 'antd';
import { useQuery, gql } from '@apollo/client';
import { useQueryJobs } from '../../features/job/hooks/useQueryJobs';
import { message } from 'antd';

const Jobs: React.FC = () => {
    const { data, loading, error } = useQueryJobs();
    const [messageApi, contextHolder] = message.useMessage();

    const push_error_notication = (content: string) => {
        messageApi.open({
            type: 'error',
            content: content,
            className: '',
        });
    };

    useEffect(() => {
        if (error) {
            push_error_notication(error.message);
        }
    }, [data, error]);

    if (loading) {
        return <h1>loading</h1>;
    }

    return (
        <div className="w-full px-16 flex flex-col mt-16 gap-2">
            <h1>jobs</h1>
            {data.getAllJob.map((prod) => (
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
                    <p>salary : {prod.compensation}</p>
                    <p>limit : {prod.limit}</p>
                    <p>required major : {prod.required_major}</p>
                    <p>project topic : {prod.project_topic}</p>
                </Card>
            ))}
        </div>
    );
};

export default Jobs;
