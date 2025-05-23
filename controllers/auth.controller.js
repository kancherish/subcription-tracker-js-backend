import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { name, email, password } = req.body

        const existingUser = await User.find({ email })
          
        if (existingUser.length!==0) {
            const error = new Error("User Already Exists");
            error.statusCode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([{ name, email, password:hashedPassword }], { session })

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: "User Created Sucessfully",
            data: {
                token,
                user: newUser[0]
            }
        })


    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.find({ email })

        if (user.length===0) {
            const error = new Error("User doesn't exist!")
            error.statusCode = 404
            throw error
        }
           
             
        const isPasswordValid = await bcrypt.compare(password, user[0].password)

        if (!isPasswordValid) {
            const error = new Error("Password is not Valid")
            error.statusCode = 401
            throw error
        }


        const token = jwt.sign({ userId: user[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user,
            }
        })

    } catch (error) {
        next(error)
    }
}

