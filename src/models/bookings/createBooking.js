import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const createBooking = async (
  propertyId,
  userId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  try {
    const fields = {
      propertyId,
      userId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    };

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

    return prisma.booking.create({
      data: {
        id: uuid(),
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

export default createBooking;
