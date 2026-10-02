import { Types } from "mongoose"
import { statusOfRequestEnnum } from "../enum/status-of-request.enum.js"
export interface IFriend {
    // FRIEND ID
    _id : Types.ObjectId | string
    // REQUESTER 
    requesterId : Types.ObjectId | string,
    // RECIEVER
    recieverId : Types.ObjectId | string,
    // STATUS OF REQUEST
    statusOfRequest : statusOfRequestEnnum
}