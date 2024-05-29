import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient();

const createReview = async (propertyId, userId, rating, comment) => {
  try {
    const fields = { propertyId, userId, rating, comment };
    const missingFields = Object.keys(fields).filter((key) => !fields[key]);

    if (missingFields.length > 0) {
      throw new errorHandler(
        `The following fields are required: ${missingFields.join(", ")}`
      );
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      throw new NotFoundError("Property", propertyId);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundError("User", userId);
    }

    const review = await prisma.review.create({
      data: {
        id: uuid(),
        propertyId,
        userId,
        rating,
        comment,
      },
    });

    return review;
  } catch (error) {
    throw error;
  }
};

export default createReview;
