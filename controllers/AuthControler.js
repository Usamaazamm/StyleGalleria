import Order_model from "../models/Order_model.js";
import user_model from "../models/user_model.js";
import { comparepassword, hashpassword } from "../utilities/passwordutils.js";
import JWT from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        if (!name) {
            return res.send({ message: 'name is required' })
        }
        if (!email) {
            return res.send({ message: 'email is required' })
        }
        if (!password) {
            return res.send({ message: 'password is required' })
        }
        if (!phone) {
            return res.send({ message: 'phone is required' })
        }
        if (!address) {
            return res.send({ message: 'address is required' })
        }
        if (!answer) {
            return res.send({ message: 'answer is required' })
        }
        const existinguser = await user_model.findOne({ email });

        if (existinguser) {
            res.send({
                success: false,
                message: 'already register please login'
            })
        };

        const hashedpassword = await hashpassword(password)

        const user = await new user_model({ name, email, phone, address, answer, password: hashedpassword }).save()
        res.status(201).send({
            success: true,
            message: 'register successfully',
            user,
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in the registeration',
            error
        })

    }

};

export const lognicontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'invalid email or password',
            })
        }
        const user = await user_model.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'invalid email'
            })
        }
        const match = await comparepassword(password, user.password);
        if (!match) {
            return res.status(404).send({
                success: false,
                message: 'invalid password'
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.token, { expiresIn: '7d' });
        return res.status(201).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                answer: user.answer,
                role: user.role,
            },
            token,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })

    }

}

export const forgotpasswordcontroller = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body
        if (!email) {
            res.status(404).send({ message: "email is require" })
        }
        if (!answer) {
            res.status(404).send({ message: "answer is require" })
        }
        if (!newpassword) {
            res.status(404).send({ message: "newpassword is require" })
        }
        const user = await user_model.findOne({ email, answer })
        if (user) {
            const hashed = await hashpassword(newpassword)
            await user_model.findByIdAndUpdate({ _id: user._id, password: hashed })
            res.status(200).send({
                success: true,
                message: 'password reset successfully'
            })
        }
        else {

            res.status(404).send({
                success: false,
                message: 'invalid email or answer'
            })
        }



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'something went wrong in forgot-password',
            error,
        })

    }
}

export const protectedcontroller = (req, res) => {
    return res.status(201).send('protected route');
}
// update profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await user_model.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashpassword(password) : undefined;
        const updatedUser = await user_model.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

//orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await Order_model
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};
export const createOrdersController = (req, res) => {
    try {
        const { cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        if (cart) {
            const order = new Order_model({
                products: cart,
                buyer: req.user._id,
            }).save();
            res.json(order);
        } else {
            res.status(500).send(error);
        }
    } catch (error) {
        console.log(error);
    }
};


//orders admin
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await Order_model
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "-email")


        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//   //order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await Order_model.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).send({
            success: true,
            orders,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};


export default registerController;