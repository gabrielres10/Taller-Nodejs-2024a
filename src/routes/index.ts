import { Express } from "express";
import userController from "../controllers/user.controller";
import eventController from "../controllers/event.controller";
import auth from "../middlewares/auth";
import validateSchema from "../middlewares/validateSchema";
import  userSchema  from "../schemas/user.schema";
import eventSchema from "../schemas/event.schema";

const routes = (app: Express) => {
    //All crud actions over users are reserved for superadmins
    app.get('/users', auth, userController.getUsers);
    app.post('/users', auth, validateSchema(userSchema), userController.create);
    app.put('/users/:id', auth, userController.update );
    app.delete('/users/:id', auth, userController.delete );
    app.get('/users/:id', auth, userController.findById);

    //All authenticated users can access their own profile
    app.get('/users/profile', auth, userController.findById);

    //Everyone can access these routes
    app.get('/events', auth, eventController.getEvents); 
    app.get('/events/:id', auth, eventController.findById);

    //Only organizers can create, update and delete events
    app.post('/events', auth, validateSchema(eventSchema), eventController.create);
    app.put('/events/:id', auth, eventController.update );
    app.delete('/events/:id', auth, eventController.delete );
    
    //Login is a public route
    app.post('/login/', userController.login);
};

export default routes;