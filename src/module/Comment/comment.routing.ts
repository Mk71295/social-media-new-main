import {createCommentController,deleteCommentController,getManyCommentController,getOneCommentController,updateCommentController} from "./comment.controller.js"
import express from "express"
import { validateRequest } from "../../common/middleware/schema.middleware.js"
import { requireLogin, requireRole} from "../../common/middleware/auth.middleware.js"
import { createCommentSchema,getOneCommentSchema,updateCommentSchema } from "./Comment.validation.js"
import { RoleType } from "../../common/enum/user-role.enum.js"
const postRouter = express.Router()
postRouter.post("/add/:id", validateRequest(createCommentSchema), requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), createCommentController)
postRouter.get("/get/one/:id", validateRequest(getOneCommentSchema), requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), getOneCommentController)
postRouter.get("/get/many", requireRole(RoleType.USER, RoleType.ADMIN), getManyCommentController)
postRouter.put("/update/:id", validateRequest(updateCommentSchema),requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), updateCommentController)
postRouter.delete("/delete/:id",validateRequest(getOneCommentSchema),requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), deleteCommentController)
export default postRouter