import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import getAmenity from "../amenities/getAmenities.js";

const prisma = new PrismaClient();

const getProperties = async (
  title,
  pricePerNight,
  bedroomCount,
  maxGuestCount,
  rating,
  amenities
) => {
  const filters = {};

  if (title) {
    filters.title = {
      contains: title,
    };
  }

  if (bedroomCount) {
    filters.bedroomCount = {
      gte: parseFloat(bedroomCount),
    };
  }

  if (maxGuestCount) {
    filters.maxGuestCount = {
      equals: parseFloat(maxGuestCount),
    };
  }

  if (rating) {
    filters.rating = {
      gte: parseFloat(rating),
    };
  }

  if (pricePerNight) {
    filters.pricePerNight = {
      equals: parseFloat(pricePerNight),
    };
  }

  if (amenities) {
    const amenity = await getAmenity(amenities);
    if (amenity) {
      filters.amenities = {
        some: {
          id: amenity.id,
        },
      };
    } else {
      throw new NotFoundError(`Amenity '${amenities}' not found`);
    }
  }

  const properties = await prisma.property.findMany({
    where: filters,
  });

  if (properties.length === 0) {
    throw new NotFoundError("Properties not found");
  }

  return properties;
};

export default getProperties;
