import { HydratedDocument, Types } from "mongoose";
import { UserShape } from "../../common/interface/user.interface.js";
import accountModel from "../../model/user.model.js";
import AppErrors from '../../common/error/error.js'

class UserManager {
    constructor() { }

    async loadProfile(accountId: string | Types.ObjectId): Promise<HydratedDocument<UserShape>> {
        const account = await accountModel.findById(accountId).select("-password");
        if (!account) throw AppErrors.throwUserMissing();
        return account;
    }

    async saveProfile(accountId: string | Types.ObjectId , input:UserShape){
        const account = await accountModel.findByIdAndUpdate(accountId,input,{new:true})
        if (!account) throw AppErrors.throwUserMissing();
        return account
    }

    async removeProfile(accountId: string | Types.ObjectId): Promise<HydratedDocument<UserShape>> {
        const account = await accountModel.findByIdAndDelete(accountId);
        if (!account) throw AppErrors.throwUserMissing();
        return account;
    }

    async listUsers(): Promise<HydratedDocument<UserShape>[]> {
        const account = await accountModel.find();
        return account;
    }
}
export default new UserManager()
