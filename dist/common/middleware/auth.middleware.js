import { checkToken } from "../token/token.js";
import accountModel from "../../model/user.model.js";
export const requireLogin = () => {
    return async (incoming, outgoing, forward) => {
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
            const claims = checkToken(bearer, process.env.USER_ACCESS_SECRET);
            const account = await accountModel.findById(claims._id);
            if (!account) {
                outgoing.status(401).json({
                    message: "User not found."
                });
                return;
            }
            incoming.user = account;
            forward();
        }
        catch (caughtError) {
            console.log(caughtError);
            outgoing.status(500).json({
                message: "Internal Server Error"
            });
        }
    };
};
export const requireRole = (...allowedRoles) => {
    return (incoming, outgoing, forward) => {
        if (!incoming.user) {
            outgoing.status(401).json({
                message: "Unauthorized access"
            });
            return;
        }
        if (!allowedRoles.includes(incoming.user.role)) {
            outgoing.status(403).json({
                message: "You are not allowed to access this resource."
            });
            return;
        }
        forward();
    };
};
