export class OtpExpiredException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OtpExpiredException";
  }
}
