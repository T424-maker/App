import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import errorHandler from "../../errors/errorHandler.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const deletHost = async (id) => {
  try {
    if (!id) {
      throw new errorHandler("id is required");
    }

    const deletHost = await prisma.host.deletMany({
      where: {
        id,
      },
    });

    if (!deletHost || deletHost.count === 0) {
      throw new NotFoundError("Host", id);
    }

    return id;
  } catch (error) {
    throw error; // Re-gooi de fout omhoog voor verdere afhandeling
  }
};

export default deletHost;
