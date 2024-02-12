interface UserAlreadyExistError extends Error {
  statusCode: number;
}

export class UserAlreadyExist extends Error implements UserAlreadyExistError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "UserAlreadyExist";
    this.statusCode = 402;
  }
}
