export interface QuantRankingResponse {
    sector: string;
    industry: string;
    rankings: {
        overall: {
            rank: number;
            total: number;
        };
        sector: {
            rank: number;
            total: number;
        };
        industry_specific: {
            rank: number;
            total: number;
        };
    }
}
