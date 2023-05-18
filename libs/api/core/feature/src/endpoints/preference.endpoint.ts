import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello EstateMatch1...' };
  }
}
// Set preference
export const setPreference = (preference: any) => {
  return {
    url: `/preference`,
    method: 'POST',
    data: preference,
  };
}

// Update preference
export const updatePreference = (preference: any) => {
  return {
    url: `/preference`,
    method: 'POST',
    data: preference,
  };
}