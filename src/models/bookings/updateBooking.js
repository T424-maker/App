import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const updateBooking = async ({
  id,
  propertyId,
  userId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
}) => {
  try {
    if (!id) {
      throw new errorHandler("Booking ID is required");
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: id,
      },
    });

    if (!booking) {
      throw new NotFoundError("Booking", id);
    }

    return await prisma.booking.update({
      where: {
        id: id,
      },
      data: {
        propertyId,
        userId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default updateBooking;
