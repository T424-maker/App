import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const deleteBooking = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const booking = await prisma.booking.deleteMany({
      where: {
        id: id,
      },
    });

    if (!booking || booking.count === 0) {
      throw new NotFoundError("Booking", id);
    }

    return id;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default deleteBooking;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0ce8f1a4-7646-5298-a67d-fdfbae2ef267")}catch(e){}}();
//# debugId=0ce8f1a4-7646-5298-a67d-fdfbae2ef267
