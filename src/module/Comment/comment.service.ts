import { HydratedDocument, Types } from "mongoose";
import ErrorMessage from '../../common/error/error.js'
import { IUpdateCommentDto } from "./comment.dto.js";
import { CommentShape } from "../../common/interface/comment.interface.js";
import commentModel from "../../model/comment.model.js";
class CommentService {
    constructor() { }
    // CREATE COMMENT 
    async createComment(commentData: CommentShape, userId: string | Types.ObjectId, postId: string | Types.ObjectId): Promise<HydratedDocument<CommentShape>> {
        const comment = await commentModel.create({
            content: commentData.content,
            ownerId: userId,
            postId: postId
        })
        return comment
    }
    // GET ONE COMMENT 
    async getOneComment(comemntId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<HydratedDocument<CommentShape>> {
        const comment: HydratedDocument<CommentShape> | null = await commentModel.findOne({ ownerId: userId, _id: comemntId })
        if (!comment) throw ErrorMessage.commentNotFoundError()
        return comment
    }
    // GET MANY COMMENT 
    async getManyComment(userId: string | Types.ObjectId): Promise<HydratedDocument<CommentShape>[]> {
        const comment: HydratedDocument<CommentShape>[] | null = await commentModel.find({ ownerId: userId })
        if (!comment) throw ErrorMessage.commentNotFoundError()
        return comment
    }
    // UPDATE COMMENT 
    async updateComment(
        data: IUpdateCommentDto,
        commentId: string | Types.ObjectId,
        userId: string | Types.ObjectId
    ): Promise<HydratedDocument<CommentShape>> {
        const comment = await commentModel.findOneAndUpdate(
            { _id: commentId, ownerId: userId },
            { $set: data },
            { new: true, runValidators: true }
        );
        if (!comment) throw ErrorMessage.commentNotFoundError();
        return comment;
    }
    // DELETE COMMENT 
    async deleteComment(commentId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<HydratedDocument<CommentShape>> {
        const comment: HydratedDocument<CommentShape> | null = await commentModel.findOneAndDelete({ ownerId: userId, _id: commentId })
        if (!comment) throw ErrorMessage.commentNotFoundError()
        return comment
    }
}
export default new CommentService()