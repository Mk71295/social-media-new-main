import { model, Schema, Types } from "mongoose";
const remarkSchema = new Schema({
    conent: {
        type: String,
        minLength: 2,
        maxLength: 200,
        require: true
    },
    ownerId: {
        type: Types.ObjectId,
        ref: "User",
        require: true
    },
    postId: {
        type: Types.ObjectId,
        ref: "Post",
        require: true
    },
}, {
    strict: true,
    strictQuery: true,
    timestamps: true,
    collection: "comment_data",
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
    versionKey: "version",
});
const remarkModel = model("Comment", remarkSchema);
export default remarkModel;
