import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const getReviewsByProperty = async (properId) => {
  try {
    if (!properId) {
      throw new errorHandler("property id is required");
    }

    const reviews = await prisma.review.findMany({
      where: {
        propertyId: properId,
      },
    });

    if (!reviews || reviews.length === 0) {
      throw new NotFoundError("Review", properId);
    }

    return reviews;
  } catch (error) {
    throw error;
  }
};

export default getReviewsByProperty;
