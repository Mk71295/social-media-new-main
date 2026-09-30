import { z } from "zod";
import { GenderType } from "../../common/enum/gender.enum.js";
import { RoleType } from "../../common/enum/user-role.enum.js";
import { ProviderType } from "../../common/enum/provider.enum.js";
import { AccountStatusType } from "../../common/enum/status-account.enum.js";

export const registerRules = {
    body: z.object({
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
        email: z.string().email().max(100),
        password: z.string().max(6),
        address: z.string(),
        gender: z.nativeEnum(GenderType),
        phoneNumber: z.string().length(11),
        age: z.number().min(18).max(120),
        confirmEmail: z.boolean().optional(),
        profileImage: z.string().optional(),
        role: z.nativeEnum(RoleType),
        provider: z.nativeEnum(ProviderType),
        changeCredintals: z.coerce.date(),
        statusAccount: z.nativeEnum(AccountStatusType),
    })
};

export const signinRules = {
    body: z.object({
        email: z.string().email().max(100),
        password: z.string().max(6),
    })
};

export const forgotPasswordRules = {
    body: z.object({
        email: z.string().email().max(100),
    })
};

export const passwordResetRules = {
    body: z.object({
        email: z.string().email().max(100),
        password: z.string().max(6),
        confirmPassword: z.string().max(6),
        otp: z.string().max(4),
    }).refine((input) => input.password === input.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }),
};
