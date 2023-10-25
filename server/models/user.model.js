import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default:
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        },
    },
    { timestamps: true }
);

const User = model("User", userSchema);

export default User;
