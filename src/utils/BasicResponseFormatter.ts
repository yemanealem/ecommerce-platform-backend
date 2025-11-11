interface BaseResponse<T> {
  success: boolean;
  message: string;
  object: T | null;
  errors: string[] | null;
}

export class ResponseFormatter {
  static success<T>(message: string, object: T | null = null): BaseResponse<T> {
    return {
      success: true,
      message,
      object,
      errors: null,
    };
  }
  
  static error(message: string, errors: string[] | null = null): BaseResponse<null> {
    return {
      success: false,
      message,
      object: null,
      errors,
    };
  }
}
