import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const createAmenity = async (name) => {
  try {
    if (!name) {
      throw new errorHandler("name is required");
    }

    return prisma.amenity.create({
      data: {
        id: uuid(),
        name,
      },
    });
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default createAmenity;
