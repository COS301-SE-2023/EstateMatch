import { ILikePropertyRequest } from '../requests';

export class LikePropertyCommand {
  constructor(public readonly request: ILikePropertyRequest) {}
}