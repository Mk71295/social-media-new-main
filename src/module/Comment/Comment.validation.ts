import z from "zod";
import { ReactionType } from "../../common/enum/react.enum.js";
const noData = "No data provided!";
// CREATE COMMENT SCHEMA
export const createCommentSchema = {
    body: z.object({
        content: z.string().trim().min(2).max(200),
    }),
};
// GET ONE COMMENT SCHEMA 
export const getOneCommentSchema = {
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid postId"),
    }),
};
// UPDATE COMMENT SCHEMA
export const updateCommentSchema = {
    // params: z.object({
    //     id: getOnePostSchema.params,
    // }),
    body: z
        .object({
            content: z.string().trim().min(2).max(200).optional(),
        }).partial()
};