import UserRequest from "../models/dto/user";
import User from "../models/entity/user";
import UserRepository from "../repositories/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { handleCloudinary, isValidImage } from "../utils";

export default class UserService {
  static register = async (payload: UserRequest, isImage: string | undefined, imageType: any): Promise<UserRequest | undefined> => {
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
      
      if (isValidImage(imageType)) {
        throw new Error('It\'s not image format!')
      };

      if (!isImage) {
        throw new Error('Image is undefined!')
      }

      const getUsername = await UserRepository.getUserByUsername(username) as User;
      const getUserEmail = await UserRepository.getUserByEmail(email) as User;
  
      if (getUsername ?? getUserEmail) {
        throw new Error(`${getUsername ? 'username' : 'email'} already exist!`);
      }

      const imageUrl = await handleCloudinary(isImage, 'user');

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
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    };
  }

  static getUserById = async (userId: string): Promise<User> => {
    const getUser = await UserRepository.getUserById(userId);
    return getUser as User;
  }

  static login = async (payload: UserRequest): Promise<{token: string, username: string}> => {
    try {
      const { username, password } = payload;

      if (!username || !password) {
        throw new Error(`${!username ? 'username' : 'password'} is required!`);
      }

      const getUser = await UserRepository.getUserByUsername(username);
      
      if (!getUser || !getUser.username) {
        throw new Error('username doesn\'t exist!');
      }

      const passIsCorrect: boolean = await bcrypt.compare(password, getUser.password);

      if (!passIsCorrect) {
        throw new Error('wrong password!');
      };

      if (!process.env.SECRET_KEY) {
        // const response = createDefaultResponse(500, 'fail', 'secret key is not defined in the environment variable!')
        // return response;
        throw new Error('secret key is not defined in the environment variable!');
      };

      const token = jwt.sign({
        user: username,
        role: getUser.role
      }, process.env.SECRET_KEY, {
        expiresIn: '1h'
      });

      return {
        token,
        username
      };
    } catch (e) {
      if (e instanceof Error)
        throw new Error(e.message);
      throw new Error('an unknow error occured during login');
    };
  }

  static deleteUserById = async (userId: string): Promise<void> => {
    try {
      const deleteUser = await UserRepository.deleteUserById(userId);
      return deleteUser;
    } catch (e) {
      if (e instanceof Error)
        throw new Error(e.message);
    }
  }

  static updateUser = async (payload: UserRequest, userId: string, image: string | undefined, imageType: any): Promise<User | undefined> => {
    let userUpdate: UserRequest;
    try {
      if (image) {
        if (!isValidImage(imageType)) {
          throw new Error('It\'s not image format!');
        };

        const newImageUrl = await handleCloudinary(image, 'user');
        userUpdate = await UserService.saveUpdate(payload, userId, newImageUrl.secure_url, newImageUrl.public_id);
      } else {
        userUpdate = await UserService.saveUpdate(payload, userId);
      }
      return userUpdate as User;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };

  static async saveUpdate (options: UserRequest, userId: string, newImageUrl?: string, newImageId?: string): Promise<UserRequest> {
    const { password } = options;
    const salt = await bcrypt.genSalt();
    const newHasPass: string = await bcrypt.hash(password, salt);
    const existingUser = await UserRepository.getUserById(userId);
    const passIsCorrect = await bcrypt.compare(password, existingUser.password)
    const updateUser: UserRequest = {
      username: existingUser.username,
      password: !passIsCorrect ? newHasPass : existingUser.password,
      image_url: newImageUrl || existingUser.image_url,
      image_id: newImageId || existingUser.image_id
    };

    await UserRepository.updateUser(userId, updateUser);
    return updateUser;
  };
}