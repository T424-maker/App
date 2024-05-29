import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const deletAmenity = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const deletdAmenity = await prisma.amenity.deletMany({
      where: {
        id,
      },
    });

    if (!deletedAmenity || deletedAmenity.count === 0) {
      throw new NotFoundError("Amenity", id);
    }

    return id;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default deletAmenity;
