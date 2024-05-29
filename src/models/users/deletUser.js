import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const deletUser = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const deletUser = await prisma.user.deletMany({
      where: {
        id: id,
      },
    });

    if (!deletUser || deletUser.count === 0) {
      throw new NotFoundError("user", id);
    }

    return id;
  } catch (error) {
    throw error;
  }
};

export default deletUser;
