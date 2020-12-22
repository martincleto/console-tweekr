import { User } from './index';
import { userFixture } from '../../../../test/fixtures';

let user: User;

beforeAll(() => {
  user = new User(userFixture.id, userFixture.name);
});

test('should have a id property', () => {
  expect(user.id).toEqual(userFixture.id);
});

test('should have a name property', () => {
  expect(user.name).toEqual(userFixture.name);
});
