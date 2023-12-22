import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,

        required: true
    },
    lastName: {
        type: String,

        required: true
    },
    email: {
        type: String,
        unique: true,


    },
    mob: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    

})
const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User