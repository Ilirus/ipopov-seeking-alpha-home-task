export type FactorGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F'

export interface FactorGradesNowResponse {
    [name: string]: {
        current: FactorGrade;
    }
}

export interface FactorGrades6mResponse {
    data: [
        name: string,
        grade: FactorGrade
    ][];
}

export interface FactorGrades3mResponse {
    [name: string]: FactorGrade;
}

export interface FactorGrades {
    [name: string]: {
        current: FactorGrade;
        grade6m: FactorGrade;
        grade3m: FactorGrade;
    };
}
