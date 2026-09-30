import { Types } from "mongoose"
import { GenderType } from "../enum/gender.enum.js"
import { ProviderType } from "../enum/provider.enum.js"
import { AccountStatusType } from "../enum/status-account.enum.js"
import { RoleType } from "../enum/user-role.enum.js"

export interface UserShape {

    _id : Types.ObjectId | string

    firstName: string,

    lastName: string,

    email: string,

    password: string,

    address: string,

    gender: GenderType,

    phoneNumber: string,

    age: number,

    confirmEmail?: boolean,

    profileImage?: string,

    role: RoleType,

    provider: ProviderType,

    changeCredintals: Date,

    statusAccount: AccountStatusType
}
