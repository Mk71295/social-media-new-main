import { HydratedDocument, Types } from "mongoose";
import AppErrors from '../../common/error/error.js'
import { PostShape } from "../../common/interface/post.interface.js";
import articleModel from "../../model/post.model.js";
import { PostUpdateInput } from "./post.dto.js";
class PostManager {
    constructor() { }

    async addPost(articleInput: PostShape, accountId: string | Types.ObjectId): Promise<HydratedDocument<PostShape>> {
        const titleMatch = await articleModel.findOne({ title: articleInput.title })
        if (titleMatch) throw AppErrors.throwDuplicateTitle()
        const article = await articleModel.create({
            content: articleInput.content,
            title: articleInput.title,
            react: articleInput.react,
            image: articleInput.image,
            ownerId: accountId
        })
        return article
    }

    async findPost(articleId: string | Types.ObjectId, accountId: string | Types.ObjectId): Promise<HydratedDocument<PostShape>> {
        const article: HydratedDocument<PostShape> | null = await articleModel.findOne({ ownerId: accountId, _id: articleId })
        if (!article) throw AppErrors.throwPostMissing()
        return article
    }

    async listPosts(accountId: string | Types.ObjectId): Promise<HydratedDocument<PostShape>[]> {
        const article: HydratedDocument<PostShape>[] | null = await articleModel.find({ ownerId: accountId })
        if (!article) throw AppErrors.throwPostMissing()
        return article
    }

    async editPost(
        input: PostUpdateInput,
        articleId: string | Types.ObjectId,
        accountId: string | Types.ObjectId
    ): Promise<HydratedDocument<PostShape>> {
        const article = await articleModel.findOneAndUpdate(
            { _id: articleId, ownerId: accountId },
            { $set: input },
            { new: true, runValidators: true }
        );
        if (!article) throw AppErrors.throwPostMissing();
        return article;
    }

    async removePost(articleId: string | Types.ObjectId, accountId: string | Types.ObjectId): Promise<HydratedDocument<PostShape>> {
        const article: HydratedDocument<PostShape> | null = await articleModel.findOneAndDelete({ ownerId: accountId, _id: articleId })
        if (!article) throw AppErrors.throwPostMissing()
        return article
    }
}
export default new PostManager()
