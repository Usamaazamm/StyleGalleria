import express from 'express';
import registerController,
{
    createOrdersController,
    forgotpasswordcontroller,
    getAllOrdersController,
    getOrdersController,
    lognicontroller,
    orderStatusController,
    protectedcontroller,
    updateProfileController
}
    from '../controllers/AuthControler.js';
import { isadmin, requiresignin } from '../middlewares/authMiddleware.js';

const route = express.Router();

route.post('/register', registerController);
route.post('/login', lognicontroller);
route.post('/forgot-password', forgotpasswordcontroller);
route.get('/protected', isadmin, requiresignin, protectedcontroller);
route.get('/user-auth', requiresignin, (req, res) => {
    res.status(200).send({ ok: true });

})
route.get('/admin-auth', requiresignin, isadmin, (req, res) => {
    res.status(200).send({ ok: true });

})
route.put('/profile', requiresignin, updateProfileController)

route.post("/create-orders", requiresignin, createOrdersController)
route.get("/orders", requiresignin, getOrdersController)
route.get("/all-orders", requiresignin, isadmin, getAllOrdersController)
route.put("/order-status/:orderId", requiresignin, isadmin, orderStatusController)

export default route;