interface PasswordNotFoundExceptionError extends Error {
  statusCode: number;
}

export class PasswordNotFoundException
  extends Error
  implements PasswordNotFoundExceptionError
{
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "PasswordNotFoundException";
    this.statusCode = 401;
  }
}
