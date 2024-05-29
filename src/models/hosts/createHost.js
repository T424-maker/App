import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  try {
    const fields = {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    };

    const missingFields = Object.keys(fields).filter((key) => !fields[key]);

    if (missingFields.length > 0) {
      throw new errorHandler(
        `The following fields are required: ${missingFields.join(", ")}`
      );
    }

    return prisma.host.create({
      data: {
        id: uuid(),
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      },
    });
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default createHost;
