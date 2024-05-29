import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";


const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const getHostById = async (id) => {
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

    return host;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default getHostById;
