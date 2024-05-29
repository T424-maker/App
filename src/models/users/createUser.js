import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import getUserByUsername from "./getUserByUsername.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  try {
    const fields = {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    };
    const missingFields = Object.keys(fields).filter((key) => !fields[key]);

    if (missingFields.length > 0) {
      throw new errorHandler(
        `The following fields are required: ${missingFields.join(", ")}`
      );
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return {
        message: `User with username ${username} already exists!`,
      };
    }

    return prisma.user.create({
      data: {
        id: uuid(),
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default createUser;
