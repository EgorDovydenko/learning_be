type ErrorCodeType = "validation" | "unauthorized" | "not_found" | "conflict";

export class AppError extends Error {
  readonly code: ErrorCodeType;
  readonly status: number;

  constructor(code: ErrorCodeType, message: string) {
    super(message);
    this.code = code;
    this.status = {
      validation: 400,
      unauthorized: 401,
      not_found: 404,
      conflict: 409,
    }[code];
  }
}
