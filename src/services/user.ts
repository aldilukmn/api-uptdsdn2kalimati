import cloudinary from "../config/cloudinary";
import UserRequest from "../models/dto/user";
import User from "../models/entity/user";
import UserRepository from "../repositories/user";
import bcrypt from 'bcrypt';

export default class UserService {
  static register = async (payload: UserRequest, isImage: string | undefined, imageType: string | undefined): Promise<UserRequest> => {
    const { username, password, email, role }: UserRequest = payload
    try {
      if (!username || !password || !email || !role) {
        throw new Error(`${!username ? 'username' : !password ? 'password' : !email ? 'email' : !role ? 'role' : null} is required!`)
      }

      if (!email.includes('@')) {
        throw new Error('Not email format!');
      }

      if (password.length < 8) {
        throw new Error('Password length should be more than 8 characters!')
      }
      
      if (
        imageType !== 'image/png' &&
        imageType !== 'image/jpg' &&
        imageType !== 'image/jpeg'
      ) {
        throw new Error('It\'s not image format!')
      }

      if (!isImage) {
        throw new Error('Image is undefined!')
      }

      const getUsername = await UserRepository.getUserByUsername(username) as User;
      const getUserEmail = await UserRepository.getUserByEmail(email) as User;
  
      if (getUsername ?? getUserEmail) {
        throw new Error(`${getUsername ? 'username' : 'email'} already exist!`);
      }

      const imageUrl = await cloudinary.uploader.upload(isImage, {
        folder: 'user'
      },
        function (err: any, result: any) {
          if(err) {
            throw new Error('Failed to upload image to cloudinary!')
          }
          return result
        }
    )

    const salt = await bcrypt.genSalt();
    const hasPass: string = await bcrypt.hash(password, salt);

    const newUser: UserRequest = {
      username: username.toLowerCase(),
      password: hasPass,
      email: email.toLowerCase(),
      role: role.toLowerCase(),
      image_url: imageUrl.secure_url,
      image_id: imageUrl.public_id
    }
    await UserRepository.createUser(newUser);
    return newUser;
    } catch (error) {
      throw error;
    }
  }

  static getUserById = async (userId: string): Promise<User> => {
    try {
      const getUser = await UserRepository.getUserById(userId);
      return getUser as User
    } catch (error) {
      throw error;
    }
  }
}