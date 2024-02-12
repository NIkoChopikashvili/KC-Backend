interface UserNotFoundError extends Error {
  statusCode: number;
}

export class UserNotFound extends Error implements UserNotFoundError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "UserNotFound";
    this.statusCode = 204;
  }
}
