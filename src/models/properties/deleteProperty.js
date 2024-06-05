import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const deleteProperty = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const deleteProperty = await prisma.property.deleteMany({
      where: {
        id: id,
      },
    });

    if (!deleteProperty || deleteProperty.count === 0) {
      throw new NotFoundError("Property", id);
    }

    return id;
  } catch (error) {
    throw error;
  }
};

export default deleteProperty;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3ac9707b-7cd3-56b3-91ee-824c92ba0784")}catch(e){}}();
//
