export interface ITranslateRequest {
    title: string | null;
    amenities: string[] | null;
    description: string[] | null;
    aiLabel: string[] | null;
    targetLanguage: string;
}