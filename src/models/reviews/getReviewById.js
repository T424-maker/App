import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const getReviewById = async (id) => {
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

    return review;
  } catch (error) {
    throw error;
  }
};

export default getReviewById;
