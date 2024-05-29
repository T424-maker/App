import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const updateReview = async (id, rating, comment) => {
  try {
    if (!id) {
      throw new BadRequestError("Review ID is required");
    }

    // Additional validation for rating and comment
    if (rating === undefined || comment === undefined) {
      throw new errorHandler("Rating and comment are required");
    }

    const review = await prisma.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundError("Review", id);
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: { rating, comment },
    });

    // Return either true to indicate successful update or the updated review object
    return updatedReview;
  } catch (error) {
    throw error;
  }
};

export default updateReview;
