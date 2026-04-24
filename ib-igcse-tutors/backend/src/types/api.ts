export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiErrorPayload = {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
};
