import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const getBookingById = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: id,
      },
    });

    if (!booking) {
      throw new NotFoundError("Booking", id);
    }

    return booking;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default getBookingById;
