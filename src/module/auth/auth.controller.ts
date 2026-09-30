import authManager from "./auth.service.js"
import { Request, Response } from "express";

export const registerHandler = async (incoming: Request, outgoing: Response) => {
    try {
        const input = incoming.body

        const outcome = await authManager.register(input);
        return outgoing.status(201).json({
            message: "User Account Created",
            userData: outcome
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN SIGN UP CONTROLLER:", caughtError);
        outgoing.status(500).json({
            message: "Internal Server Error !",
        })
    }
};

export const signinHandler = async (incoming: Request, outgoing: Response) => {
    try {
        const input = incoming.body

        const outcome = await authManager.signin(input);
        return outgoing.status(200).json({
            message: "Login Sccuessfully",
            userData: outcome
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN LOGIN CONTROLLER:", caughtError);
        outgoing.status(500).json({
            message: "Internal Server Error !",
        })
    }
};

export const forgotPasswordHandler = async (incoming: Request, outgoing: Response) => {
    try {
        const input = incoming.body.email

        const outcome = await authManager.requestPasswordReset(input);
        return outgoing.status(200).json({
            message: "Now you recieve Otp on your email",
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN FORGET PASSWORD CONTROLLER:", caughtError);
        outgoing.status(500).json({
            message: "Internal Server Error !",
        })
    }
};

export const passwordResetHandler = async (incoming: Request, outgoing: Response) => {
    try {
        const input = incoming.body

        const outcome = await authManager.applyPasswordReset(input);
        return outgoing.status(200).json({
            message: "Password Updated !",
            data : outcome
        })
    } catch (caughtError) {
        console.log("❌ ERROR IN RESET PASSWORD CONTROLLER:", caughtError);
        outgoing.status(500).json({
            message: "Internal Server Error !",
        })
    }
};
