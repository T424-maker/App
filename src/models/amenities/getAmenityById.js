import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const getAmenity = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new errorHandler("id is required");
  }

  const amenity = await prisma.amenity.findUnique({
    where: {
      id: id,
    },
  });

  if (!amenity) {
    throw new NotFoundError("amenity", id);
  }

  return amenity;
};

export default getAmenity;
