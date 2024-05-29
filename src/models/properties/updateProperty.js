import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const updateProperty = async ({
  id,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  bookings,
  reviews,
  amenities,
  hostId,
}) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const property = await prisma.property.findUnique({
      where: {
        id: id,
      },
    });

    if (!property) {
      throw new NotFoundError(`property`, id);
    }

    const updatedProperty = await prisma.property.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        bookings,
        reviews,
        amenities,
        hostId,
      },
    });

    if (!updatedProperty) {
      throw new NotFoundError(`property`, id);
    }

    return updatedProperty;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default updateProperty;
