import { useState } from 'react';
import { func } from 'prop-types';
import rfdc from 'rfdc';
import { ProgressReportInput } from '@features/progress_report/hooks/useGetProgressReport';

interface IProgressReport {
    setAdvisorScore: (val: number) => void;
    setWorkScore: (val: number) => void;
    setCommuteScore: (val: number) => void;
    setCurrentRes: (val: string) => void;
    setMentorName: (val: string | null) => void;
    setMentorPosition: (val: string | null) => void;
    setOtherSuggestion: (val: string | null) => void;
}

const initial_val: ProgressReportInput = {
    advisement_score: 0,
    commute_score: 0,
    work_score: 0,
    current_res: null,
    mentor_name: null,
    mentor_position: null,
    other_suggest: null,
    mentor_tel: null,
    mentor_email: null,
};

export const useProgressReportState = () => {
    const [progressReportPayload, setProgressReportPayload] = useState<ProgressReportInput>(initial_val);
    function setAdvisementScore(val: string): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, advisement_score: parseInt(val) };
        });
    }

    function setCommuteScore(val: string): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, commute_score: parseInt(val) };
        });
    }

    function setWorkScore(val: string): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, work_score: parseInt(val) };
        });
    }

    function setCurrentRes(val: string): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, current_res: val };
        });
    }

    function setOtherSuggestion(val: string | null): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, other_suggest: val };
        });
    }

    function setMentorEmail(val: string | null): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, mentor_email: val };
        });
    }

    function setMentorTel(val: string | null): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, mentor_tel: val };
        });
    }

    function setMentorName(val: string | null): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, mentor_name: val };
        });
    }

    function setMentorPosition(val: string | null): void {
        setProgressReportPayload((prevState) => {
            return { ...prevState, mentor_position: val };
        });
    }

    function reset() {
        setProgressReportPayload(initial_val);
    }

    return {
        progressReportPayload,
        setProgressReportPayload,
        setAdvisorScore: setAdvisementScore,
        setCommuteScore,
        setCurrentRes,
        setMentorName,
        setMentorPosition,
        setOtherSuggestion,
        setWorkScore,
        setMentorTel,
        setMentorEmail,
        reset,
    };
};
