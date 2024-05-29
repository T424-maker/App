import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const getAmenity = async (name) => {
  try {
    if (name) {
      const amenity = await prisma.amenity.findFirst({
        where: {
          name: name,
        },
      });
      if (!amenity) {
        throw new NotFoundError(`Amenity with name "${name}" not found`);
      }
      return amenity;
    } else {
      const amenities = await prisma.amenity.findMany();
      if (amenities.length === 0) {
        throw new NotFoundError("No amenities found");
      }
      return amenities;
    }
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default getAmenity;
