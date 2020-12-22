import { User } from "@entities/User";

export interface UserRepository {
  GetUser(ids: number[]): Promise<User[]>;
  SearchUser(query: string): Promise<User[]>;
}
