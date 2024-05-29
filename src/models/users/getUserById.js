import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundError("User", id);
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export default getUserById;
