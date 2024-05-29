import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const deletProperty = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const deletProperty = await prisma.property.deletMany({
      where: {
        id: id,
      },
    });

    if (!deletProperty || deletProperty.count === 0) {
      throw new NotFoundError("Property", id);
    }

    return id;
  } catch (error) {
    throw error;
  }
};

export default deletProperty;
