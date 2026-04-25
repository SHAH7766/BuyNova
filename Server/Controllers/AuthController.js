import User from "../Models/User.js"
import jwt from "jsonwebtoken"
import { RegisterEmail, LoginEmail } from "../Utils/Nodemailer.js"
import { HashingPassword, ComparePassword } from "../Auth/Hash.js"
export const RegisterUser = async (req, res) => {
    let role;
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email})
        if(existingUser)
            return res.status(400).json({ message: "Email already exists" })
        const countUser = await User.countDocuments();
        if(countUser===0)
             role = 'admin'
        else
             role = 'user'
        const hashedpassword = await HashingPassword(password)
        let newUser = await User.create({ username, email, password: hashedpassword, role })
        if (newUser) {
            await RegisterEmail(email, username)
            return res.status(200).json({ message: "User Registered Successfully" })
        }
        else
            return res.status(400).json({ message: "Failed to register user" })
    }
    catch (error) {
        console.log(error);
    }
    return res.status(400).json({ message: "Failed to register user" })
}
export const LoginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            const IsMatched = await ComparePassword(password, user.password)
            if (IsMatched) {
                await LoginEmail(email, user.username)
                const token = await jwt.sign({id:user._id,role:user.role,email:user.email},process.env.SECRET_KEY,{expiresIn:"1h"})
                return res.status(200).json({ message: "Login Successfull", token,role:user.role })
            } else {
                return res.status(400).json({ message: "Invalid Credentials" })
            }
        }
        else
            return res.status(400).json({ message: "User not found" })
    } catch (error) {
        console.log(error);
    }
}
export const Getallusers = async (req, res) => {
    try {
        let result = await User.find()
        if (result.length > 0)
            return res.status(200).json(result)
        else
            return res.status(404).json({ message: "No users found" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}
export const GetUserById = async (req, res) => {
    try {
        let result = await User.findById(req.params.id)
        if (result)
            return res.status(200).json(result)
        else
            return res.status(404).json({ message: "User not found" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })

    }
}
export const DeleteUserById = async (req, res) => {
    try {
        let result = await User.findByIdAndDelete(req.params.id)
        if (result)
            return res.status(200).json({ message: "User deleted successfully" })
        else
            return res.status(404).json({ message: "User not found" })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const DeleteAllUsers = async (req, res) => {
    try {
        let result = await User.deleteMany()
        if (result.deletedCount > 0)
            return res.status(200).json({ message: "All users deleted successfully" })
        else
            return res.status(404).json({ message: "No users found to delete" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}