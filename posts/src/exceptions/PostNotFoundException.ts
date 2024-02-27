interface PostNotFoundError extends Error {
  statusCode: number;
}

export class PostNotFound extends Error implements PostNotFoundError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "PostNotFound";
    this.statusCode = 204;
  }
}
