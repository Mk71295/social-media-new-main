import { Request } from "express";
import { UserShape } from "./user.interface.js";
import { HydratedDocument } from "mongoose";

export interface AuthedRequest extends Request{
    user:HydratedDocument<UserShape>
}
