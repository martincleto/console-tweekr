export class Post {
  id: number;
  content: string;
  authorId: number;
  timestamp: string;

  constructor(id: number, content: string, authorId: number, timestamp: string) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.timestamp = timestamp;
  }
}
