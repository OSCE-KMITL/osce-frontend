import { message, Card } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQueryJob } from '../../features/job/hooks/useQueryJobs';

const Job = () => {
    const router = useRouter();
    const { jobId } = router.query;

    const { data, loading, error } = useQueryJob({ jobId: '2' });
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
            <Card key={data.getJobById.id} title={data.getJobById.job_title} style={{ width: 300 }}>
                <p>salary : {data.getJobById.compensation}</p>
                <p>limit : {data.getJobById.limit}</p>
                <p>required major : {data.getJobById.required_major}</p>
                <p>project topic : {data.getJobById.project_topic}</p>
                <p>nature of work : {data.getJobById.nature_of_work}</p>
                <p>required skills : {data.getJobById.required_skills}</p>
                <p>welfare : {data.getJobById.welfare}</p>
                <p>coop301_fileurl : {data.getJobById.coop301_fileurl}</p>
            </Card>
        </div>
    );
};

export default Job;
