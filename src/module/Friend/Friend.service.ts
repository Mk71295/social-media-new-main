import { HydratedDocument, Types } from "mongoose";
import AppErrors from '../../common/error/error.js'
import { IFriend } from "../../common/interface/friend.interface.js";
import friendModel from "../../model/friend.interface.js";
import userModel from "../../model/user.model.js";
import { statusOfRequestEnnum } from "../../common/enum/status-of-request.enum.js";
class FriendService {
    constructor() { }
    // SEND REQUEST 
    async sendRequest(requesterId: string | Types.ObjectId, recieverId: string | Types.ObjectId): Promise<HydratedDocument<IFriend>> {
        const findFriend = await userModel.findById(recieverId)
        if(!findFriend) throw AppErrors. throwUserMissing()
        const friend = await friendModel.create({
        requesterId:requesterId,
        recieverId:recieverId 
        })
        return friend
    }
    // SHOW REQUEST 
    async showRequest(userId: string | Types.ObjectId): Promise<HydratedDocument<IFriend>[]> {
        const friends = await friendModel.find({ recieverId: userId });
        return friends;
    }
    // CHANGE STATUS OF REQUEST 
    async changeStatusOfRequest(friendId: string | Types.ObjectId, status: string): Promise<HydratedDocument<IFriend>> {
        const friend = await friendModel.findById(friendId);
        if (!friend) throw AppErrors. throwUserMissing();
        friend.statusOfRequest = status as statusOfRequestEnnum;
        await friend.save();
        return friend;
    }
}
export default new FriendService()