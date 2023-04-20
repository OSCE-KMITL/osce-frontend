import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { Divider } from 'antd';
import ProgressReportBanner from '@components/ProgressReport/Banner';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProgressReportList from '@components/ProgressReport/ProgressReportList';

interface OwnProps {}

type Props = OwnProps;

const CoopReport: FunctionComponent<Props> = (props) => {
    const { me } = useContext(AuthenticationContext);

    const router = useRouter();

    const student_id = me?.is_student?.student_id;

    return (
        <div>
            <ProgressReportList student_id={student_id} />
        </div>
    );
};

export default CoopReport;
