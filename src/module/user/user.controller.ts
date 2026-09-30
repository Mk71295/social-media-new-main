import { AuthedRequest } from "../../common/interface/user-request.interface.js";
import userManager from "./user.service.js"
import { Request, Response } from "express";

export const fetchProfileHandler = async (incoming:Request, outgoing:Response) => {
    try {
        const { user: account } = incoming as AuthedRequest;
       const accountData = await userManager.loadProfile(account.id);
        return outgoing.status(200).json({
            data : accountData
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN GET PROFILE CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}

export const editProfileHandler = async (incoming:Request, outgoing:Response) => {
    try {
        const { user: account } = incoming as AuthedRequest;
        const input = incoming.body
       const accountData = await userManager.saveProfile(account.id,input);
        return outgoing.status(200).json({
            message:"User Profile Updated !",
            data : accountData
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN UPDATED PROFILE CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}

export const removeProfileHandler = async (incoming:Request, outgoing:Response) => {
    try {
        const { user: account } = incoming as AuthedRequest;
       const accountData = await userManager.removeProfile(account.id);
        return outgoing.status(200).json({
            messsage:`Account of ${accountData.firstName} is deleted `,
            data : accountData
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN DELETE PROFILE CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}

export const fetchUsersHandler = async (incoming:Request, outgoing:Response) => {
    try {
       const accountData = await userManager.listUsers();
        return outgoing.status(200).json({
            data : accountData
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN GET ALL USERS CONTROLLER : ", caughtError)
        return outgoing.status(500).json({
            errorMessage:"Internal Server Error !"
        })
    }
}
