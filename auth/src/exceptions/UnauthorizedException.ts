interface UnauthorizedExceptionError extends Error {
  statusCode: number;
}

export class UnauthorizedException
  extends Error
  implements UnauthorizedExceptionError
{
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedException";
    this.statusCode = 401;
  }
}
