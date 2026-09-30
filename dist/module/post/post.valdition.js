import z from "zod";
import { ReactionType } from "../../common/enum/react.enum.js";
const missingValue = "No data provided!";
export const newPostRules = {
    body: z.object({
        title: z.string().trim().min(1).max(30),
        content: z.string().trim().min(2).max(200),
        image: z.string().default(missingValue),
        react: z.nativeEnum(ReactionType),
    }),
};
export const singlePostRules = {
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid postId"),
    }),
};
export const editPostRules = {
    body: z
        .object({
        title: z.string().trim().min(1).max(30).optional(),
        content: z.string().trim().min(2).max(200).optional(),
        image: z.string().optional(),
        react: z.nativeEnum(ReactionType).optional(),
    }).partial()
};
