import { ReactionType } from "../../common/enum/react.enum.js";

export interface PostUpdateInput {
    title: string,
    content: string,
    image: string,
    react: ReactionType
}
