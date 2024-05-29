import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const updateHost = async ({
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe,
}) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const host = await prisma.host.findUnique({
      where: {
        id,
      },
    });

    if (!host) {
      throw new NotFoundError("Host", id);
    }

    return prisma.host.update({
      where: {
        id,
      },
      data: {
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

export default updateHost;
