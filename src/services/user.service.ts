import UserModel, { UserInput, UserDocument } from "../models/user.models";
import jwt from "jsonwebtoken";

class UserService {
  /**
   * This method creates a new user
   * @param userInput the user input
   * @returns the created user
   * @throws an error if something goes wrong
   */
  public async create(userInput: UserInput): Promise<UserDocument> {
    try {
      const users = await UserModel.create(userInput);
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns a user by email
   * @param email the email
   * @returns the user
   * @throws an error if something goes wrong
   */
  public async findByEmail(email: any): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns all users
   * @returns all users
   * @throws an error if something goes wrong
   */
  public async findAll(): Promise<UserDocument[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method updates a user
   * @param id the user id
   * @param userInput the user input
   * @returns the updated user
   * @throws an error if something goes wrong
   */
  public async update(
    id: string,
    userInput: UserInput
  ): Promise<UserDocument | null> {
    try {
      const user: UserDocument | null = await UserModel.findOneAndUpdate(
        { _id: id },
        userInput,
        {
          returnOriginal: false,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns a user by id
   * @param id the user id
   * @returns the user
   * @throws an error if something goes wrong
   */
  public async findById(id: string): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method deletes a user
   * @param id the user id
   * @returns the deleted user
   * @throws an error if something goes wrong
   */
  public async delete(id: string): Promise<UserDocument | null> {
    try {
      return await UserModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method logs in a user
   * @param email the email
   * @param password the password
   * @returns the user
   * @throws an error if something goes wrong
   */
  public generateToken(user: UserDocument): string {
    try {
      return jwt.sign(
        { user_id: user.id, email: user.email },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "20m" }
      ); // This value must be lower
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
