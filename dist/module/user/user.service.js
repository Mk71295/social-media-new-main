import accountModel from "../../model/user.model.js";
import AppErrors from '../../common/error/error.js';
class UserManager {
    constructor() { }
    async loadProfile(accountId) {
        const account = await accountModel.findById(accountId).select("-password");
        if (!account)
            throw AppErrors.throwUserMissing();
        return account;
    }
    async saveProfile(accountId, input) {
        const account = await accountModel.findByIdAndUpdate(accountId, input, { new: true });
        if (!account)
            throw AppErrors.throwUserMissing();
        return account;
    }
    async removeProfile(accountId) {
        const account = await accountModel.findByIdAndDelete(accountId);
        if (!account)
            throw AppErrors.throwUserMissing();
        return account;
    }
    async listUsers() {
        const account = await accountModel.find();
        return account;
    }
}
export default new UserManager();
