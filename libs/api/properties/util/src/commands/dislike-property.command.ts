import { IDislikePropertyRequest } from '../requests';

export class DislikePropertyCommand {
  constructor(public readonly request: IDislikePropertyRequest) {}
}