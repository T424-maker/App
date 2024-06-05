import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const deleteUser = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const deletedUser = await prisma.user.deleteMany({
      where: {
        id: id,
      },
    });

    if (!deleteUser || deleteUser.count === 0) {
      throw new NotFoundError("user", id);
    }

    return id;
  } catch (error) {
    throw error;
  }
};

export default deleteUser;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b8540ee1-bc1b-54ed-91be-77f5256f45c2")}catch(e){}}();
//# debugId=b8540ee1-bc1b-54ed-91be-77f5256f45c2

