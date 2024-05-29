import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import errorHandler from "../../errors/errorHandler.js";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  amenities,
  hostId
) => {
  try {
    if (
      !title ||
      !description ||
      !location ||
      !pricePerNight ||
      !bedroomCount ||
      !bathRoomCount ||
      !maxGuestCount ||
      !rating ||
      !hostId
    ) {
      throw new errorHandler("All fields are required");
    }

    // Additional validation for numeric fields
    if (
      isNaN(pricePerNight) ||
      isNaN(bedroomCount) ||
      isNaN(bathRoomCount) ||
      isNaN(maxGuestCount) ||
      isNaN(rating)
    ) {
      throw new errorHandler("Numeric fields must have valid values");
    }

    const host = await prisma.host.findUnique({
      where: { id: hostId },
    });
    if (!host) {
      throw new NotFoundError("Host", hostId);
    }

    return await prisma.property.create({
      data: {
        id: uuid(),
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        amenities: { connect: amenities?.map((id) => ({ id })) }, // Optional chaining
        hostId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default createProperty;
