export class WrongLoginInfoException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WrongLoginInfoException";
  }
}
