import aj from "../config/arcjet.js"

export const arjectMiddleware = async (req,res,next)=>{
     try {
        const decision = await aj.protect(req,{requested:1})

        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()) return res.status(429).json({error:"Rate Limited exceded"})
            if(decision.reason.isBot()) return res.status(403).json({error:"Bot Detected"})

            return res.status(403).json({error:"Unsual Activity From your IP"})
        }

        next()

     } catch (error) {
        next(error)
     }
}