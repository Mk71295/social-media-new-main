import { Types } from "mongoose"

export interface CommentShape {

    _id : Types.ObjectId | string,

    ownerId : Types.ObjectId | string,

    postId : Types.ObjectId | string,

    content : string,

}
