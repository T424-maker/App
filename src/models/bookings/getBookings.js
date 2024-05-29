import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const getBookings = async ({
  propertyId,
  userId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
}) => {
  try {
    const filters = {};

    if (propertyId) {
      filters.propertyId = {
        equals: propertyId,
      };
    }

    if (userId) {
      filters.userId = {
        equals: userId,
      };
    }

    if (checkinDate) {
      filters.checkinDate = {
        equals: new Date(checkinDate),
      };
    }

    if (checkoutDate) {
      filters.checkoutDate = {
        equals: new Date(checkoutDate),
      };
    }

    if (numberOfGuests) {
      filters.numberOfGuests = {
        equals: parseInt(numberOfGuests),
      };
    }

    if (totalPrice) {
      filters.totalPrice = {
        equals: parseInt(totalPrice),
      };
    }

    if (bookingStatus) {
      filters.bookingStatus = {
        equals: bookingStatus,
      };
    }

    const bookings = await prisma.booking.findMany({
      where: filters,
    });

    if (bookings.length === 0) {
      throw new NotFoundError("No bookings found");
    }

    return bookings;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default getBookings;
