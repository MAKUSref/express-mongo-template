import { HTTP_STAUS_CODE } from "./http";

class AppError extends Error {
  constructor(public message: string, public statusCode = HTTP_STAUS_CODE.INTERNAL_SERVER_ERROR) {
    super(message);
  }
}

export default AppError;