import User from "../models/user.model.js"
import { signUp } from "./auth.controller.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        res.status(200).json({ success: true, data: users });

    } catch (error) {
        next(error)
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password")

        if (!user) {
            const error = new Error('No User Found')
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({ success: true, data: user });

    } catch (error) {
        next(error)
    }
}

export const createUser = async (req, res, next) => {
    try {
        await signUp(req, res, next);
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) {
            return res.status(404).json({ message: "no subscription found" })
        }
        if (req.user._id !== user._id) {
            return res.status(401).json({ message: "you are not owner" })
        }
        delete req.body._id
        const userUpdate = await User.update({ _id: req.params.id }, { $set: { ...req.body } })
        if (userUpdate.acknowledged) {
            return res.status(204).json({success:true})
        }
    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) {
            return res.status(404).json({ message: "no subscription found" })
        }
        if (req.user._id !== user._id) {
            return res.status(401).json({ message: "you are not owner" })
        }
        delete req.body._id
        const userUpdate = await User.deleteOne({ _id: req.params.id })
        if (userUpdate.acknowledged) {
            return res.status(204).json({success:true})
        }
    } catch (error) {
        next(error)
    }
}
