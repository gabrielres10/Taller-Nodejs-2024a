import { Express } from "express";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth";
import validateSchema from "../middlewares/validateSchema";
import  userSchema  from "../schemas/user.schema";

const routes = (app: Express) => {
    //All crud actions over users are reserved for superadmins
    app.get('/users', auth, userController.getUsers);
    app.post('/users', auth, validateSchema(userSchema), userController.create);
    app.put('/users/:id', auth, userController.update );
    app.delete('/users/:id', auth, userController.delete );
    app.get('/users/:id', auth, userController.findById);

    //All users can access their own profile
    app.get('/users/profile', auth, userController.findById);

    //Login is a public route
    app.post('/login/', userController.login);
};

export default routes;