import { Types } from "mongoose"
import { ReactionType } from "../enum/react.enum.js"
export interface PostShape {

    _id : Types.ObjectId | string

    ownerId : Types.ObjectId | string

    title : string ,

    content : string,

    image: string,

    react : ReactionType
}
