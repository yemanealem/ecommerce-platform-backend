export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors: any[] | null;

  constructor(statusCode: number, message: string, errors: any[] | null = null, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors ?? null; // ensure null if not provided
    Error.captureStackTrace(this, this.constructor);
  }
}
