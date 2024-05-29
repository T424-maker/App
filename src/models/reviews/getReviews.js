import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();

const getReviews = async () => {
  try {
    const reviews = await prisma.review.findMany();

    if (!reviews || reviews.length === 0) {
      throw new NotFoundError("Reviews not found");
    }

    return reviews;
  } catch (error) {
    throw error;
  }
};

export default getReviews;
