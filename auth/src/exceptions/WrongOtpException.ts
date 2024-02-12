export class WrongOtpException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WrongOtpException";
  }
}
