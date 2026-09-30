import AppErrors from '../../common/error/error.js';
import articleModel from "../../model/post.model.js";
class PostManager {
    constructor() { }
    async addPost(articleInput, accountId) {
        const titleMatch = await articleModel.findOne({ title: articleInput.title });
        if (titleMatch)
            throw AppErrors.throwDuplicateTitle();
        const article = await articleModel.create({
            content: articleInput.content,
            title: articleInput.title,
            react: articleInput.react,
            image: articleInput.image,
            ownerId: accountId
        });
        return article;
    }
    async findPost(articleId, accountId) {
        const article = await articleModel.findOne({ ownerId: accountId, _id: articleId });
        if (!article)
            throw AppErrors.throwPostMissing();
        return article;
    }
    async listPosts(accountId) {
        const article = await articleModel.find({ ownerId: accountId });
        if (!article)
            throw AppErrors.throwPostMissing();
        return article;
    }
    async editPost(input, articleId, accountId) {
        const article = await articleModel.findOneAndUpdate({ _id: articleId, ownerId: accountId }, { $set: input }, { new: true, runValidators: true });
        if (!article)
            throw AppErrors.throwPostMissing();
        return article;
    }
    async removePost(articleId, accountId) {
        const article = await articleModel.findOneAndDelete({ ownerId: accountId, _id: articleId });
        if (!article)
            throw AppErrors.throwPostMissing();
        return article;
    }
}
export default new PostManager();
