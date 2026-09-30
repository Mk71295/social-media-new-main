import { model, Schema, Types } from "mongoose";
import { ReactionType } from "../common/enum/react.enum.js";
import { PostShape } from "../common/interface/post.interface.js";
import { CommentShape } from "../common/interface/comment.interface.js";

const remarkSchema = new Schema(
  {

    conent : {
        type : String,
        minLength:2,
        maxLength:200,
        require:true
    },

    ownerId : {
        type : Types.ObjectId,
        ref:"User",
        require:true
    },

    postId : {
        type : Types.ObjectId,
        ref:"Post",
        require:true
    },

  },
  {
    strict: true,
    strictQuery: true,
    timestamps: true,
    collection: "comment_data",
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
    versionKey: "version",
  }
);

const remarkModel = model<CommentShape>("Comment", remarkSchema);

export default remarkModel;
