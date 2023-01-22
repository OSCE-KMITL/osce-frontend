import { Result } from 'antd';
import React, { FunctionComponent } from 'react';

import { ResultStatusType } from 'antd/es/result';

interface OwnProps {
    title: string;
    status: ResultStatusType;
    subTitle: string;
}

type Props = OwnProps;

const CreatedResult: FunctionComponent<Props> = ({ status, title, subTitle }) => {
    return <Result status={status} title={title} subTitle={subTitle} extra={<div>Go Console</div>} />;
};

export default CreatedResult;
