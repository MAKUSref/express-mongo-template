import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "User";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  firstname: { type: String, required: true, minlength: 13 },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default model<User>(DOCUMENT_NAME, userSchema);
