import { AuthedRequest } from "../../common/interface/user-request.interface.js";
import commentService from "./comment.service.js"
import { Request, Response } from "express";
// CREATE COMMENT
export const createCommentController = async (request:Request, response:Response) => {
    try {
        const { user } = request as AuthedRequest;
        const data = request.body;
        const postId = request.params.id as string
       const result = await commentService.createComment(data,user.id,postId);
        return response.status(201).json({
            message : "Comment Created",
            data : result
        })
    } catch (error) {
        console.log("❌ ERROR IN CREATE COMMENT CONTROLLER : ", error)
        return response.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}
// GET ONE COMMENT
export const getOneCommentController = async (request:Request, response:Response) => {
    try {
        const { user } = request as AuthedRequest;
        const commentId = request.params.id as string
       const result = await commentService.getOneComment(commentId,user.id);
        return response.status(200).json({
            message : "One Comment Getted",
            data : result
        })
    } catch (error) {
        console.log("❌ ERROR IN GET ONE COMMENT CONTROLLER : ", error)
        return response.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}
// GET MANY COMMENT
export const getManyCommentController = async (request:Request, response:Response) => {
    try {
        const { user } = request as AuthedRequest;
       const result = await commentService.getManyComment(user.id);
        return response.status(200).json({
            message : "Many Comments Getted",
            data : result
        })
    } catch (error) {
        console.log("❌ ERROR IN GET MANY COMMENT CONTROLLER : ", error)
        return response.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}
// UPDATE COMMENT 
export const updateCommentController = async (request:Request, response:Response) => {
    try {
        const { user } = request as AuthedRequest;
        const data = request.body;
        const commentId = request.params.id as string
       const result = await commentService.updateComment(data,commentId,user.id);
        return response.status(200).json({
            message : "Comment Updated",
            data : result
        })
    } catch (error) {
        console.log("❌ ERROR IN UPDATE COMMENT CONTROLLER : ", error)
        return response.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}
// DELETE COMMENT 
export const deleteCommentController = async (request:Request, response:Response) => {
    try {
        const { user } = request as AuthedRequest;
        const commentId = request.params.id as string
       const result = await commentService.deleteComment(commentId,user.id);
        return response.status(200).json({
            message : "Comment Deleted !",
            data : result
        })
    } catch (error) {
        console.log("❌ ERROR IN DELETE COMMENT CONTROLLER : ", error)
        return response.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}