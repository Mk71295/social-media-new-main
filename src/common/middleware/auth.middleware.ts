import { NextFunction, Request, Response } from "express"
import { readToken, checkToken } from "../token/token.js"
import accountModel from "../../model/user.model.js"
import { TokenClaims } from "../interface/token.interface.js";
import { AuthedRequest } from "../interface/user-request.interface.js";
import { RoleType } from "../enum/user-role.enum.js";

export const requireLogin = () => {
    return async (
        incoming: Request,
        outgoing: Response,
        forward: NextFunction
    ): Promise<void> => {
        try {
            const authHeader = incoming.headers.authorization;

            if (!authHeader) {
                outgoing.status(401).json({
                    message: "Authorization header is required."
                });
                return;
            }

            if (!authHeader.startsWith("Bearer ")) {
                outgoing.status(401).json({
                    message: "Invalid token format."
                });
                return;
            }

            const bearer = authHeader.split(" ")[1];

            if (!bearer) {
                outgoing.status(401).json({
                    message: "Token is required."
                });
                return;
            }
            const claims: TokenClaims = checkToken(
                bearer,
                process.env.USER_ACCESS_SECRET as string
            );

            const account = await accountModel.findById(claims._id);

            if (!account) {
                outgoing.status(401).json({
                    message: "User not found."
                });
                return;
            }

            (incoming as AuthedRequest).user = account;

            forward();

        } catch (caughtError) {
            console.log(caughtError);
            outgoing.status(500).json({
                message: "Internal Server Error"
            });
        }
    };
};

export const requireRole = (...allowedRoles: RoleType[]) => {
    return (incoming: Request, outgoing: Response, forward: NextFunction): void => {
        if (!(incoming as AuthedRequest).user) {
            outgoing.status(401).json({
                message: "Unauthorized access"
            });
            return;
        }

        if (!allowedRoles.includes((incoming as AuthedRequest).user.role)) {
            outgoing.status(403).json({
                message: "You are not allowed to access this resource."
            });
            return;
        }

        forward();
    };
};
