import jwt from "jsonwebtoken";
import { TokenKind } from "../enum/token-type.enum.js";
import { RoleType } from "../enum/user-role.enum.js";
import { TokenSignInput, TokenClaims } from "../interface/token.interface.js";

export const signToken = ({
    payload: tokenPayload,
    secretKey: signingSecret,
    options: signOptions = {
        expiresIn: "1h",
        notBefore: 0,
        audience: [],
        issuer: "social-media-demo",
    },
}:TokenSignInput) => {
    return jwt.sign(tokenPayload, signingSecret, signOptions);
};

export const checkToken = (bearer:string, signingSecret:string):TokenClaims  => {
    return jwt.verify(bearer, signingSecret) as TokenClaims;
};

export const readToken = (bearer:string) => {
    return jwt.decode(bearer);
};

export const secretsForRole = (roleValue:RoleType) => {
    switch (roleValue) {
        case RoleType.USER:
            return {
                [TokenKind.ACCESS]: process.env.USER_ACCESS_SECRET,
                [TokenKind.REFRESH]: process.env.USER_REFRESH_SECRET,
            };

        case RoleType.ADMIN:
            return {
                [TokenKind.ACCESS]: process.env.ADMIN_ACCESS_SECRET,
                [TokenKind.REFRESH]: process.env.ADMIN_REFRESH_SECRET,
            };

        default:
            throw new Error("Invalid role");
    }
};
