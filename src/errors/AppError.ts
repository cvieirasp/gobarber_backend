class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCore = 400) {
    this.message = message;
    this.statusCode = statusCore;
  }
}

export default AppError;
