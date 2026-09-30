import postManager from "./post.service.js";
export const addPostHandler = async (incoming, outgoing) => {
    try {
        const { user: account } = incoming;
        const input = incoming.body;
        const outcome = await postManager.addPost(input, account.id);
        return outgoing.status(201).json({
            message: "Post Created",
            data: outcome
        });
    }
    catch (caughtError) {
        console.log("❌ ERROR IN CREATE POST CONTROLLER : ", caughtError);
        return outgoing.status(500).json({
            errorMessage: "Internal Server Error !"
        });
    }
};
export const fetchPostHandler = async (incoming, outgoing) => {
    try {
        const { user: account } = incoming;
        const articleId = incoming.params.id;
        const outcome = await postManager.findPost(articleId, account.id);
        return outgoing.status(200).json({
            message: "One Post Getted",
            data: outcome
        });
    }
    catch (caughtError) {
        console.log("❌ ERROR IN GET ONE POST CONTROLLER : ", caughtError);
        return outgoing.status(500).json({
            errorMessage: "Internal Server Error !"
        });
    }
};
export const fetchPostsHandler = async (incoming, outgoing) => {
    try {
        const { user: account } = incoming;
        const outcome = await postManager.listPosts(account.id);
        return outgoing.status(200).json({
            message: "Many Posts Getted",
            data: outcome
        });
    }
    catch (caughtError) {
        console.log("❌ ERROR IN GET MANY POST CONTROLLER : ", caughtError);
        return outgoing.status(500).json({
            errorMessage: "Internal Server Error !"
        });
    }
};
export const editPostHandler = async (incoming, outgoing) => {
    try {
        const { user: account } = incoming;
        const input = incoming.body;
        const articleId = incoming.params.id;
        const outcome = await postManager.editPost(input, articleId, account.id);
        return outgoing.status(200).json({
            message: "Post Updated",
            data: outcome
        });
    }
    catch (caughtError) {
        console.log("❌ ERROR IN UPDATE POST CONTROLLER : ", caughtError);
        return outgoing.status(500).json({
            errorMessage: "Internal Server Error !"
        });
    }
};
export const removePostHandler = async (incoming, outgoing) => {
    try {
        const { user: account } = incoming;
        const articleId = incoming.params.id;
        const outcome = await postManager.removePost(articleId, account.id);
        return outgoing.status(200).json({
            message: "Post Deleted !",
            data: outcome
        });
    }
    catch (caughtError) {
        console.log("❌ ERROR IN DELETE POST CONTROLLER : ", caughtError);
        return outgoing.status(500).json({
            errorMessage: "Internal Server Error !"
        });
    }
};
