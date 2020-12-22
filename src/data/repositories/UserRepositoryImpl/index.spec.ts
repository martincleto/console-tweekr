import { UserRepositoryImpl } from './index';
import * as request from '@data/util';
import { userFixture, usersFixture } from '@fixtures';

jest.mock('../../util/request');

let mockRequest: jest.SpyInstance;
let userRepository: UserRepositoryImpl;

beforeAll(() => {
  mockRequest = jest.spyOn(request, 'doRequest');
  userRepository = new UserRepositoryImpl();
});

test('should get a single user', async () => {
  mockRequest.mockReturnValueOnce([userFixture])
  const user = await userRepository.GetUser([userFixture.id]);

  expect(mockRequest).toHaveBeenCalledWith({
    endpoint: 'users',
    params: `id=${userFixture.id}`
  });
  expect(user).toEqual([userFixture])
});

test('should get multiple users', async () => {
  const requestedUserIds = [
    usersFixture[3].id,
    usersFixture[0].id,
    usersFixture[2].id,
  ];
  const expectedUsers = usersFixture.filter(user => new RegExp(requestedUserIds.join('|')).test(user.id.toString()));
  mockRequest.mockReturnValueOnce(expectedUsers);

  const users = await userRepository.GetUser(requestedUserIds);

  expect(mockRequest).toHaveBeenCalledWith({
    endpoint: 'users',
    params: `id=${requestedUserIds.join('&id=')}`
  });
  expect(users).toEqual(expectedUsers);
});

test('should search users', async () => {
  const queryStr= 'foo';
  mockRequest.mockReturnValueOnce(usersFixture);

  const results = await userRepository.SearchUser(queryStr);

  expect(mockRequest).toHaveBeenCalledWith({
    endpoint: 'users',
    params: `q=${queryStr}`
  });
  expect(results).toEqual(usersFixture);
});
