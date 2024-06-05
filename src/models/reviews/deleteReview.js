import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const deleteReview = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundError("Review", id);
    }

    const deleteReview = await prisma.review.deleteMany({
      where: { id },
    });

    return id;
  } catch (error) {
    throw error;
  }
};

export default deleteReview;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6aa16e5a-fed6-53dc-9886-27941cf245c0")}catch(e){}}();
//# debugId=6aa16e5a-fed6-53dc-9886-27941cf245c0


