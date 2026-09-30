import { AuthedRequest } from "../../common/interface/user-request.interface.js";
import postManager from "./post.service.js"
import { Request, Response } from "express";

export const addPostHandler = async (incoming:Request, outgoing:Response) => {
    try {
        const { user: account } = incoming as AuthedRequest;
        const input = incoming.body
       const outcome = await postManager.addPost(input,account.id);
        return outgoing.status(201).json({
            message : "Post Created",
            data : outcome
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN CREATE POST CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}

export const fetchPostHandler = async (incoming:Request, outgoing:Response) => {
    try {
        const { user: account } = incoming as AuthedRequest;
        const articleId = incoming.params.id as string
       const outcome = await postManager.findPost(articleId,account.id);
        return outgoing.status(200).json({
            message : "One Post Getted",
            data : outcome
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN GET ONE POST CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}

export const fetchPostsHandler = async (incoming:Request, outgoing:Response) => {
    try {
        const { user: account } = incoming as AuthedRequest;
       const outcome = await postManager.listPosts(account.id);
        return outgoing.status(200).json({
            message : "Many Posts Getted",
            data : outcome
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN GET MANY POST CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}

export const editPostHandler = async (incoming:Request, outgoing:Response) => {
    try {
        const { user: account } = incoming as AuthedRequest;
        const input = incoming.body;
        const articleId = incoming.params.id as string
       const outcome = await postManager.editPost(input,articleId,account.id);
        return outgoing.status(200).json({
            message : "Post Updated",
            data : outcome
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN UPDATE POST CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}

export const removePostHandler = async (incoming:Request, outgoing:Response) => {
    try {
        const { user: account } = incoming as AuthedRequest;
        const articleId = incoming.params.id as string
       const outcome = await postManager.removePost(articleId,account.id);
        return outgoing.status(200).json({
            message : "Post Deleted !",
            data : outcome
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN DELETE POST CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}
