import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const existingUser = await userModel.findOne({ email: email })

        if (existingUser) {
            res.json({ success: false, message: "User already exits" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.json({ success: false, message: "Invalid email" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.json({ success: false, message: "Incredential" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })

        return res.json({ success: true, message: "Logged Out" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}