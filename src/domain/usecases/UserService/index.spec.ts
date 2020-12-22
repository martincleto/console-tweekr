import { UserServiceImpl } from './index';
import { UserRepositoryImpl } from '@data/repositories/UserRepositoryImpl';

let userRepository;
let userService: UserServiceImpl;

beforeAll(() => {
  userRepository = new UserRepositoryImpl();
  userService = new UserServiceImpl(userRepository);
});

test('should have a use case GetUser ', () => {
  expect(userService.GetUser).toEqual(expect.any(Function));
});

test('should have a use case SearchUser ', () => {
  expect(userService.SearchUser).toEqual(expect.any(Function));
});
