import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const getPropertyById = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundError("Property", id);
    }

    return property;
  } catch (error) {
    throw error;
  }
};

export default getPropertyById;
