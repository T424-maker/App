import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const deleteAmenity = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const deletedAmenity = await prisma.amenity.deleteMany({
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

export default deleteAmenity;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="91f3fc50-9c60-5c6b-ba68-516df17d4c8b")}catch(e){}}();
//# debugId=91f3fc50-9c60-5c6b-ba68-516df17d4c8b

