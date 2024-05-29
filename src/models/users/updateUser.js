import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const updateUser = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundError("User", id);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
      },
    });

    if (!updatedUser) {
      throw new NotFoundError("User", id);
    }

    return {
      message: `User with id ${id} has been updated successfully!`,
    };
  } catch (error) {
    throw error;
  }
};

export default updateUser;
