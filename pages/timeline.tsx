import React, { useEffect } from 'react';
import Timeline from '@components/Timeline/Timeline';

const TimelinePage: React.FC = () => {
    return (
        <div className="w-full px-16 flex flex-col mt-16 gap-2 ">
            <Timeline></Timeline>
        </div>
    );
};

export default Timeline;
