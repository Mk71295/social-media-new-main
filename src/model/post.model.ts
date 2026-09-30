import { model, Schema, Types } from "mongoose";
import { ReactionType } from "../common/enum/react.enum.js";
import { PostShape } from "../common/interface/post.interface.js";

const missingValue = "No data provided!";

const articleSchema = new Schema(
  {

    title : {
        type : String,
        minLength:1,
        maxLength:30,
        require:true,
        unique:true
    },

    conent : {
        type : String,
        minLength:2,
        maxLength:200,
        require:true
    },

    image : {
        type : String,
        default:missingValue
    },

    react: {
        type : String,
        enum : Object.values(ReactionType)
    },

    ownerId : {
        type : Types.ObjectId,
        ref:"User",
        require:true
    }

  },
  {
    strict: true,
    strictQuery: true,
    timestamps: true,
    collection: "post_data",
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
    versionKey: "version",
  }
);

const articleModel = model<PostShape>("Post", articleSchema);

export default articleModel;
