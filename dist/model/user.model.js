import { model, Schema } from "mongoose";
import { RoleType } from "../common/enum/user-role.enum.js";
import { ProviderType } from "../common/enum/provider.enum.js";
import { AccountStatusType } from "../common/enum/status-account.enum.js";
import { GenderType } from "../common/enum/gender.enum.js";
const missingValue = "No data provided!";
const accountSchema = new Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        maxlength: 100,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        maxlength: 6,
        trim: true,
        required: true,
        get() {
            return "******";
        },
    },
    address: {
        type: String,
        trim: true,
        default: missingValue,
    },
    gender: {
        type: String,
        enum: Object.values(GenderType),
    },
    phoneNumber: {
        type: String,
        minlength: 11,
        maxlength: 11,
        default: missingValue,
    },
    age: {
        type: Number,
        min: 18,
        max: 120,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        type: String,
        default: missingValue,
    },
    role: {
        type: String,
        enum: Object.values(RoleType),
        default: RoleType.USER
    },
    provider: {
        type: String,
        enum: Object.values(ProviderType),
        default: ProviderType.OWN
    },
    changeCredintals: Date,
    statusAccount: {
        type: String,
        enum: Object.values(AccountStatusType),
        default: AccountStatusType.ACTIVE
    }
}, {
    strict: true,
    strictQuery: true,
    timestamps: true,
    collection: "user_data",
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
    versionKey: "version",
});
accountSchema.virtual("username").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
const accountModel = model("User", accountSchema);
export default accountModel;
