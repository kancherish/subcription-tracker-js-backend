import Subscription from "../models/subscription.model.js"
import { ObjectId } from "mongodb"


export const getAllSubscription = async (req, res, next) => {
    try {
        const subcriptions = await Subscription.find()
        if (subcriptions.length === 0) {
            return res.status(404).json("no subcriptions found")
        }
        res.status(200).json({ success: true, data: subcriptions })
    } catch (error) {
        next(error)
    }
}

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })
        if (subscription) {
            res.status(201).json({ message: "Created a Subscription" })
        }
    } catch (error) {
        next(error)
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        if (!req.user._id === req.params.id) {
            const error = new Error("You are not the owner")
            error.statusCode = 401
            throw error
        }

        const subscriptions = await Subscription.find({ user: new ObjectId(req.params.id) })
        if (subscriptions.length < 0) {
            return res.status(404).json({ message: "No subscription found" })
        }

        res.status(200).json({ success: true, data: subscriptions })

    } catch (error) {
        next(error)
    }
}

export const cancelASubscription = async (req, res, next) => {
    try {
        const subcription = await Subscription.findOne({ _id: req.params.id });
        if (!subcription) {
            return res.status(404).json({ message: "no subscription found" })

        }
        if (!req.user._id.equals(subcription.user._id)) {
            return res.status(401).json({ message: "you are not owner" })
        }
        if (subcription.status === "cancelled") {
            return res.status(403).json({ message: "subscription already cancelled" })
        }
        const subcriptionCancel = await Subscription.updateOne({ _id: req.params.id }, { $set: { status: "cancelled" } })
        if (subcriptionCancel.acknowledged) {
            return res.status(204).json({ message: "subscription cancelled succesfully" })
        }
        return res.status(400).json({ message: "failed" })
    } catch (error) {
        next(error)
    }
}

export const updateAsubscription = async (req, res, next) => {
    try {
        const subcription = await Subscription.findOne({ _id: req.params.id })

        if (!subcription) {
            return res.status(404).json({ message: "no subscription found" })
        }
        console.log(subcription.user)
        if (!req.user._id.equals(subcription.user)) {
            return res.status(401).json({ message: "you are not owner" })
        }
        delete req.body._id
        const subcriptionUpdate = await Subscription.updateOne({ _id: req.params.id }, { $set: { ...req.body } })

        if (subcriptionUpdate.acknowledged) {
            return res.status(204).json({ message: "subscription updated succesfully" })
        }
        return res.status(400).json({ message: "failed" })
    } catch (error) {
        next(error)
    }
}


export const deleteSubscription = async (req, res, next) => {
    try {
        const subcription = await Subscription.findOne({ _id: req.params.id })

        if (!subcription) {
            return res.status(404).json({ message: "no subscription found" })
        }
        if (!req.user._id.equals(subcription.user)) {
            return res.status(403).json({ message: "you are not alowed to delete" })
        }
        const subscriptionDeleted = await Subscription.deleteOne({ _id: req.params.id })
        if (subscriptionDeleted.acknowledged) {
            return res.status(204).send({ message: "subscription deleted succesfully" })
        } else {
            return res.status(404).json({ message: "no subcription found" })
        }
    } catch (error) {
        next(error)
    }
}