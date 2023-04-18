export interface ICompanyAssessment {
    id: string;

    improvement: string;

    score: number;

    strength: string;

    assessment_obj: object;
}

export interface IAdvisorAssessment {
    id: string;

    assessment_obj: object;

    score: number;
}
