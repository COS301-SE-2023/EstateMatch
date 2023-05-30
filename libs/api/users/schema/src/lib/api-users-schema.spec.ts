import { apiUsersSchema } from './api-users-schema';

describe('apiUsersSchema', () => {
  it('should work', () => {
    expect(apiUsersSchema()).toEqual('api-users-schema');
  });
});
