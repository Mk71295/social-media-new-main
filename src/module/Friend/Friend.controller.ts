import { AuthedRequest } from "../../common/interface/user-request.interface.js";
import friendService from "./Friend.service.js"
import { Request, Response } from "express";
// SEND REQUEST
export const sendRequestController = async (request: Request, response: Response) => {
    try {
        const { user } = request as AuthedRequest;
        const userId = request.params.id as string;

        const result = await friendService.sendRequest(user.id, userId);

        const friendName = await result.populate({
            path: "recieverId",
            select: "firstName"
        });

        const receiver = friendName.recieverId as unknown as {
            firstName: string;
        };

        return response.status(201).json({
            message: `Request Sent to ${receiver.firstName} Successfully!`,
        });

    } catch (error) {
        console.log("❌ ERROR IN SEND REQUEST CONTROLLER : ", error);

        return response.status(500).json({
            errorMessage: "Internal Server Error!"
        });
    }
};
// SHOW REQUEST
export const showRequestController = async (request: Request, response: Response) => {
    try {
        const { user } = request as AuthedRequest;
        const result = await friendService.showRequest(user.id);

        return response.status(201).json({
            message: `Getted All Requests Successfully!`,
            data: result
        });

    } catch (error) {
        console.log("❌ ERROR IN SHOW REQUEST CONTROLLER : ", error);

        return response.status(500).json({
            errorMessage: "Internal Server Error!"
        });
    }
};
// CHANGE STATUS OF REQUEST
export const changeStatusOfRequestController = async (request: Request, response: Response) => {
    try {
        const { user } = request as AuthedRequest;
        const friendId = request.params.id as string;
        const { status } = request.body;
        const result = await friendService.changeStatusOfRequest(friendId, status);

        return response.status(201).json({
            message: `Status Updated Successfully!`,
            data: result
        });

    } catch (error) {
        console.log("❌ ERROR IN CHANGE STATUS OF REQUEST CONTROLLER : ", error);

        return response.status(500).json({
            errorMessage: "Internal Server Error!"
        });
    }
};