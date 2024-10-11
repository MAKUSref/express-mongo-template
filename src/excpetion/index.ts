import { HTTP_STATUS_CODE } from "./http";

class AppError extends Error {
  constructor(public message: string, public statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    super(message);
  }
}

export default AppError;