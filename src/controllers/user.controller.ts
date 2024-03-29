import { Request, Response } from "express";
import userService from "../services/user.service";
import { UserDocument, UserInput } from "../models/user.models";
import bcrypt from "bcrypt";

class userController {
  /**
   * this method creates a new user
   * @param req the request object
   * @param res the response object
   * @returns the created user
   */
  public async create(req: Request, res: Response) {
    try {
      const userExists: UserDocument | null = await userService.findByEmail(
        req.body.email
      );

      req.body.password = await bcrypt.hash(req.body.password, 10);

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user: UserDocument = await userService.create(
        req.body as UserInput
      );

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method returns all users
   * @param req the request object
   * @param res the response object
   * @returns all users
   */
  public async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.findAll(); //Tiene que esperar que esto termine para continuar
      res.json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method returns a user by id
   * @param req the request object
   * @param res the response object
   * @returns a user
   */
  public async findById(req: Request, res: Response) {
    try {
      const user: UserDocument | null = await userService.findById(
        req.params.id
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method updates a user
   * @param req the request object
   * @param res the response object
   *  @returns the updated user
   */
  public async update(req: Request, res: Response) {
    try {
      const userExists: UserDocument | null = await userService.findById(
        req.params.id
      );

      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateUser: UserDocument | null = await userService.update(
        req.params.id,
        req.body
      );

      return res.status(200).json(updateUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method deletes a user
   * @param req the request object
   * @param res the response object
   * @returns the deleted user
   */
  public async delete(req: Request, res: Response) {
    try {
      const userExists: UserDocument | null = await userService.findById(
        req.params.id
      );

      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      const user: UserDocument | null = await userService.delete(req.params.id);

      return res.status(200).json(`User has been deleted ${user}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method logs in a user
   * @param req the request object
   * @param res the response object
   * @returns the user logged in
   */
  public async login(req: Request, res: Response) {
    try {
      const userExists: UserDocument | null = await userService.findByEmail(
        req.body.email
      );

      if (!userExists) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const isMatch: boolean = await bcrypt.compare(
        req.body.password,
        userExists.password
      );

      if (!isMatch) {
        return res.status(401).json({ message: "Not authorized" });
      }

      return res.status(200).json(userService.generateToken(userExists));
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new userController();
