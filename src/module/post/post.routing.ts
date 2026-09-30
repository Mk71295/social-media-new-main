import { addPostHandler, fetchPostHandler ,fetchPostsHandler,editPostHandler,removePostHandler} from "./post.controller.js"
import express from "express"
import { validateRequest } from "../../common/middleware/schema.middleware.js"
import { requireLogin, requireRole } from "../../common/middleware/auth.middleware.js"
import { newPostRules, singlePostRules, editPostRules } from "./post.valdition.js"
import { RoleType } from "../../common/enum/user-role.enum.js"
const postRoutes = express.Router()
postRoutes.post("/add", validateRequest(newPostRules), requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), addPostHandler)
postRoutes.get("/get/one/:id", validateRequest(singlePostRules), requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), fetchPostHandler)
postRoutes.get("/get/many", requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), fetchPostsHandler)
postRoutes.put("/update/:id", validateRequest(editPostRules),requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), editPostHandler)
postRoutes.delete("/delete/:id",validateRequest(singlePostRules),requireLogin(), requireRole(RoleType.USER, RoleType.ADMIN), removePostHandler)
export default postRoutes
