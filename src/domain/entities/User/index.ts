export class User {
  id: number;
  name: string;
  following: number[] | User[];

  constructor(id: number, name: string, following: number[]) {
    this.id = id;
    this.name = name;
    this.following = following;
  }
}
