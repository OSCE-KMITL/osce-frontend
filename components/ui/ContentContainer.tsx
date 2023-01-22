import React, { FC } from 'react';
import { ScriptProps } from 'next/script';

interface ContentContainerProps {}

type Props = ContentContainerProps;

/**
 * Component สำหรับแสดงผล content
 * เพื่อ reusable
 */
const ContentContainer: FC<Props> = ({ children }: ScriptProps) => {
    return <div className="flex flex-col items-start gap-8 w-full min-h-full max-h-full  relative overflow-y-auto py-8">{children}</div>;
};

export default ContentContainer;
