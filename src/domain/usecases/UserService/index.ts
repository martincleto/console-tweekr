import { User } from '@entities/User';
import { UserRepository } from '@repositories/UserRepository';

export interface UserService {
  GetUser(ids: number[]): Promise<User[]>;
  SearchUser(query: string): Promise<User[]>;
}

export class UserServiceImpl implements UserService {
  userRepo: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepo = repository;
  }

  async GetUser(ids: number[]): Promise<User[]> {
    return this.userRepo.GetUser(ids);
  }

  async SearchUser(query: string): Promise<User[]> {
    return this.userRepo.SearchUser(query);
  }
}
