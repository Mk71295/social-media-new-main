import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { RoleType } from "../enum/user-role.enum.js";

export interface TokenSignInput{
    payload:string| object | Buffer,
    secretKey:string,
    options:jwt.SignOptions
}

export interface TokenClaims  extends jwt.JwtPayload{
    _id:Types.ObjectId,
    role:RoleType
}

export interface TokenPair {
    accessToken : string,
    refreshToken : string
}
