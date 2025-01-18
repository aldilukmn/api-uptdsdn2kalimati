import UserRequest from "../models/dto/user"
import type { Request, Response } from "express";
import UserService from "../services/user";
import DefaultResponse from "../models/dto/response";
import UserModel from "../models/schema/user";

export default class User {
  static listUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = await UserModel.find();
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'user successfully retrieved.'
        },
        result: userData
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'error',
          message: error
        }
      };
      res.status(400).json(response);
    }
  }
  static register = async (req: Request, res: Response): Promise<void> => {
    const payload: UserRequest = req.body;
    const isImage: string | undefined = req.file?.path;
    const imageType: string | undefined = req.file?.mimetype;
    try {
      const newUser = await UserService.register(payload, isImage, imageType);
      const response: DefaultResponse = {
        status: {
          code: 201,
          response: 'success',
          message: 'User successfully created.'
        },
        result: newUser
      }
      res.status(201).json(response);
    } catch (error) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      };
      res.status(400).json(response);
    }
  }

  static getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id;
    try {
      const getUser = await UserService.getUserById(userId);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'user has found.'
        },
        result: getUser
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 404,
          response: 'fail',
          message: `${error}`
        }
      };
      res.status(404).json(response);
    }
  }
}