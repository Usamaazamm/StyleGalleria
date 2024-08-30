import JWT from "jsonwebtoken";
import user_model from "../models/user_model.js";
export const requiresignin = async (req, res, next) => {
    try {
        const decode = await JWT.verify(req.headers.authorization, process.env.token);

        req.user = decode;
        next();

    }
    catch (error) {
        console.log(error);
    }
}

export const isadmin = async (req, res, next) => {
    try {
        const user = await user_model.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(404).send({
                success: false,
                message: 'unauthorized admin access'
            })
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error)
        res.status(404).send({
            success: false,
            message: 'error in admin middleware'
        })

    }
}

