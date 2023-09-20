import { ISetUserLanguagePrefRequest } from "../requests";

export class SetUserLanguagePrefCommand {
    constructor(public request: ISetUserLanguagePrefRequest) {}
}