import { Schema, model } from "mongoose";
export var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["MANAGER"] = "MANAGER";
    UserRole["EMPLOYEE"] = "EMPLOYEE";
})(UserRole || (UserRole = {}));
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.EMPLOYEE,
    },
});
export default model("User", userSchema);
