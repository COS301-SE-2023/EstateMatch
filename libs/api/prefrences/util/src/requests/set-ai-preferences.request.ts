import { IAIPreference } from "../interfaces";

export interface ISetAIPreferencesRequest {
    user: string;
    labels: string[];
}