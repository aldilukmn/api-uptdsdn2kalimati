import mongoose from "mongoose";
import User from "../models/entity/user";
import UserModel from "../models/schema/user";
import UserRequest from "../models/dto/user";
import cloudinary from "../config/cloudinary";

export default class UserRepository {
  // Get User By Username
  static async getUserByUsername(userName: string): Promise<User | null> {
    const userData = await UserModel.findOne({
      username: userName
    }).exec();

    return userData;
  }

  // Get User By Email
  static async getUserByEmail(email: string): Promise<User | null> {
    const userData = await UserModel.findOne({
      email
    }).exec();

    return userData;
  }

  // Create User
  static async createUser(user: UserRequest): Promise<User> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  // Get User By Id
  static async getUserById (userId: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error(`Invalid ID format: ${userId}`);
    };
    const userData = await UserModel.findById(userId);

    if (!userData) {
      throw new Error(`User with id ${userId} not found!`)
    };

    return userData;
  }
}