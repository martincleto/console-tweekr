import { User } from '@entities/User';
import { UserRepository } from '@repositories/UserRepository';
import { doRequest } from '@data/util';

class UserDTO {
  id = 0;
  name = '';
  following = [];
}

export class UserRepositoryImpl implements UserRepository {
  async GetUser(ids: number[]): Promise<User[]> {
    const data = await doRequest({
      endpoint: 'users',
      params: `id=${ids.join('&id=')}`,
    })
    
    return data.map((user: UserDTO) => new User(user.id, user.name, user.following));
  }

  async SearchUser(query: string): Promise<User[]> {
    const data = await doRequest({
      endpoint: 'users',
      params: `q=${query}`,
    })
    
    return data.map((user: UserDTO) => new User(user.id, user.name, user.following));
  }
}
