import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { config } from '@/config'
import jwt from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'

const DOCUMENT_NAME = 'User'

export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserShemaType {
  firstname: string
  lastname: string
  email: string
  password: string
  roles: ROLE[]
  refreshToken: string[]
}

const userSchema = new Schema<UserShemaType>({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    type: [String],
    enum: Object.values(ROLE),
    required: true,
    default: [ROLE.USER],
  },
  refreshToken: [String],
})

userSchema.methods.generateAuthToken = function () {
  const privateKey = fs.readFileSync(
    path.join(__dirname, '../../../private.key')
  )
  const accesstoken = jwt.sign({ _id: this._id }, privateKey, {
    expiresIn: '10s',
    algorithm: 'RS256',
  })
  const refreshtoken = jwt.sign({ _id: this._id }, privateKey, {
    expiresIn: '1d',
    algorithm: 'RS256',
  })

  const tokens = { accesstoken: accesstoken, refreshtoken: refreshtoken }
  return tokens
}
export default model<UserShemaType>(DOCUMENT_NAME, userSchema)
