import {changeStatusOfRequestController, sendRequestController, showRequestController} from "./Friend.controller.js"
import express from "express"
import { validateRequest } from "../../common/middleware/schema.middleware.js"
import { requireLogin, requireRole } from "../../common/middleware/auth.middleware.js"
import { RoleType } from "../../common/enum/user-role.enum.js"
const friendRouter = express.Router()
friendRouter.post("/request/send/:id",requireLogin(),requireRole(RoleType.USER, RoleType.ADMIN),sendRequestController)
friendRouter.get("/request/show",requireLogin(),requireRole(RoleType.USER, RoleType.ADMIN),showRequestController)
friendRouter.patch("/request/change-status/:id",requireLogin(),requireRole(RoleType.USER, RoleType.ADMIN),changeStatusOfRequestController)
export default friendRouter