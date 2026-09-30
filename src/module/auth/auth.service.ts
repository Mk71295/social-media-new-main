import { HydratedDocument } from "mongoose";
import { UserShape } from "../../common/interface/user.interface.js";
import accountModel from "../../model/user.model.js";
import AppErrors from '../../common/error/error.js'
import { LoginInput, ResetPasswordInput } from "./auth.dto.js";
import { TokenPair } from "../../common/interface/token.interface.js";
import { signToken } from "../../common/token/token.js";
import { otpKeyFor, cacheSet,cacheGet } from "../../common/utils/redis-functions.js";
import { makeOtp } from "../../common/utils/generate-otp.js";
import { deliverMail } from "../../common/utils/mail.js";

class AuthManager {
    constructor() { }

    async register(input: UserShape): Promise<UserShape> {
        const emailOwner: HydratedDocument<UserShape> | null = await accountModel.findOne({ email: input.email })
        if (emailOwner) throw AppErrors.throwEmailTaken()
        const account: HydratedDocument<UserShape> = await accountModel.create(input)
        return account
    }

    async signin(input: LoginInput): Promise<TokenPair> {
        const account = await accountModel.findOne({ email: input.email, password: input.password })
        if (!account) throw AppErrors.throwBadCredentials()
        const jwtAccess = signToken({
            payload: {
                _id: account?._id,
                role: account?.role
            },
            secretKey: process.env.USER_ACCESS_SECRET as string,
            options: {
                expiresIn: "2h",
            }
        })
        const jwtRefresh = signToken({
            payload: {
                _id: account?._id,
                role: account?.role
            },
            secretKey: process.env.USER_REFRESH_SECERT as string,
            options: {
                expiresIn: "7d",
            }
        })
        return { accessToken: jwtAccess, refreshToken: jwtRefresh }
    }

    async requestPasswordReset(emailAddress: string) {
        const emailOwner: HydratedDocument<UserShape> | null = await accountModel.findOne({ email: emailAddress })
        if (!emailOwner) throw AppErrors.throwEmailMissing()
        const otpCode = makeOtp()
        const storedOtp = await cacheSet(otpKeyFor(emailAddress), otpCode, 4 * 60)

        const mailResult = await deliverMail({
            toValue: emailAddress,
            subjectValue: "Reset Password",
            htmlValue: `<h1>Hello to social media app👋</h1><br><h2>OTP : ${otpCode}</h2>`
        })
    }

    async applyPasswordReset(input: ResetPasswordInput): Promise<HydratedDocument<UserShape>|null> {
        const emailOwner: HydratedDocument<UserShape> | null = await accountModel.findOne({ email: input.email })
        if (!emailOwner) throw AppErrors.throwEmailMissing()
        const savedOtp = await cacheGet(otpKeyFor(input.email))
        if (String(savedOtp) !== String(input.otp)) AppErrors.throwBadOtp()
        const updatedAccount:HydratedDocument<UserShape>|null = await accountModel.findOneAndUpdate({ email: input.email }, { password: input.password }, { new: true })
        return updatedAccount
    }
}
export default new AuthManager()
