import Subscription from "../models/subscription.model"

export const createSubscription = async (req,res,next)=>{
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id
        })
        if (subscription) {
            res.status(201).json({message:"Created a Subscription"})
        }
    } catch (error) {
        next(error)
    }
}

export const getUserSubscription = async (req,res,next)=>{
    try {
        if (!req.user._id===req.params.id) {
            const error = new Error("You are not the owner")
            error.statusCode = 401
            throw error
        }

        const subscription = await Subscription.find({user:req.params.id})

        res.status(200).json({success:true,data:subscription})

    } catch (error) {
        next(error)
    }
}

export const getUserAllSubscriptions = async (req,res,next)=>{
    try {
        if (!req.user._id===req.params.id) {
            const error = new Error("You are not the owner")
            error.statusCode = 401
            throw error
        }
        const subscriptions = await Subscription.find({'user._id':req.id})
        if (subscriptions.length<0) {
            return res.status(404).json({message:"No subscription found"})
        }
        return res.status(200).json({success:true,data:subscriptions})
    } catch (error) {
        next(error)
    }
}

export const deleteSubscription = async (req,res,next)=>{
    try {
        const subcription = await Subscription.findOne({_id:req.parms.id})

        if (req.user._id===subcription.user._id) {
            return res.status(403).json({message:"you are not aloowed to delete"})
        }

        if (subcription.acknowleged) {
            return res.status(204).send()
        }else{
            return res.status(404).json({message:"no subcription found"})
        }
    } catch (error) {
        next(error)
    }
}